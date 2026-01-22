# Performance Optimization Guide

Best practices for writing efficient Hytale plugins that don't slow down your server.

## Event Handler Optimization

### Problem: High-Frequency Events

Events like `PlayerMoveEvent` fire hundreds of times per second. Unoptimized handlers can kill server performance.

#### [BAD] Processing Every Event

```java
@EventHandler
public void onPlayerMove(PlayerMoveEvent event) {
    // This runs 100+ times per second per player!
    Player player = event.getPlayer();
    Zone zone = findZone(player.getLocation()); // Expensive lookup!
    
    if (zone != null) {
        player.sendMessage("You are in: " + zone.getName()); // Spams chat!
    }
}
```

**Problems**:
- Expensive zone lookup every movement
- Spams player with messages
- Runs even for tiny head movements

#### [GOOD] Smart Processing

```java
// Cache player zones to avoid repeated lookups
private final Map<UUID, Zone> playerZones = new HashMap<>();
private final Map<UUID, Location> lastBlockLocation = new HashMap<>();

@EventHandler
public void onPlayerMove(PlayerMoveEvent event) {
    Player player = event.getPlayer();
    Location to = event.getTo();
    UUID uuid = player.getUUID();
    
    // Only process if player moved to a new block
    Location lastBlock = lastBlockLocation.get(uuid);
    if (lastBlock != null && sameBlock(lastBlock, to)) {
        return; // Still in same block - ignore
    }
    
    lastBlockLocation.put(uuid, to.clone());
    
    // Check for zone changes
    Zone currentZone = playerZones.get(uuid);
    Zone newZone = findZone(to); // Only lookup when changing blocks
    
    // Only notify on zone change
    if (currentZone != newZone) {
        playerZones.put(uuid, newZone);
        
        if (newZone != null) {
            player.sendMessage("Entering: " + newZone.getName());
        } else if (currentZone != null) {
            player.sendMessage("Leaving: " + currentZone.getName());
        }
    }
}

private boolean sameBlock(Location a, Location b) {
    return a.getBlockX() == b.getBlockX() &&
           a.getBlockY() == b.getBlockY() &&
           a.getBlockZ() == b.getBlockZ();
}
```

**Benefits**:
- 99% reduction in processing (only on block change)
- No chat spam (only on zone change)
- Caches zone data for fast access

### Async Processing for Heavy Operations

#### [BAD] Blocking Main Thread

```java
@EventHandler
public void onPlayerChat(PlayerChatEvent event) {
    Player player = event.getPlayer();
    
    // BLOCKS THE ENTIRE SERVER while waiting for database!
    PlayerData data = database.query("SELECT * FROM players WHERE uuid=?", 
                                     player.getUUID());
    
    if (data.isMuted()) {
        event.setCancelled(true);
    }
}
```

#### [GOOD] Async Database Access

```java
// Cache player data to avoid repeated database queries
private final Map<UUID, PlayerData> dataCache = new HashMap<>();

@EventHandler(priority = EventPriority.LOWEST) // Run early to allow cancellation
public void onPlayerChat(PlayerChatEvent event) {
    Player player = event.getPlayer();
    UUID uuid = player.getUUID();
    
    // Check cache first
    PlayerData data = dataCache.get(uuid);
    
    if (data != null) {
        // Fast path - use cached data
        if (data.isMuted()) {
            event.setCancelled(true);
            player.sendMessage("You are muted!");
        }
    } else {
        // Data not cached - load asynchronously
        scheduler.runAsync(() -> {
            // Database query runs on separate thread
            PlayerData loadedData = database.query(
                "SELECT * FROM players WHERE uuid=?", uuid
            );
            
            // Cache the result
            dataCache.put(uuid, loadedData);
        });
        
        // First message goes through - subsequent messages use cache
    }
}

// Clear cache when player quits to free memory
@EventHandler
public void onPlayerQuit(PlayerQuitEvent event) {
    dataCache.remove(event.getPlayer().getUUID());
}
```

## Chunk Processing Optimization

### Batch Block Updates

#### [BAD] Individual Block Updates

```java
// Each setBlock causes chunk recalculation!
for (int x = 0; x < 100; x++) {
    for (int y = 0; y < 100; y++) {
        for (int z = 0; z < 100; z++) {
            Location loc = new Location(world, x, y, z);
            world.setBlock(loc, BlockType.STONE); // 1,000,000 updates!
        }
    }
}
// Server freezes for seconds or minutes!
```

#### [GOOD] Batched Updates

```java
// Start batch operation - groups all updates
world.startBatchUpdate();

try {
    for (int x = 0; x < 100; x++) {
        for (int y = 0; y < 100; y++) {
            for (int z = 0; z < 100; z++) {
                Location loc = new Location(world, x, y, z);
                world.setBlock(loc, BlockType.STONE);
            }
        }
    }
} finally {
    // Always complete batch, even if error occurs
    world.completeBatchUpdate(); // Single recalculation!
}
```

### Spread Work Over Multiple Ticks

```java
// Process large areas gradually to avoid lag spikes
public void fillLargeArea(World world, Location start, BlockType type, int size) {
    // Calculate total blocks
    int totalBlocks = size * size * size;
    int blocksPerTick = 1000; // Adjust based on performance
    
    List<Location> locations = new ArrayList<>();
    for (int x = 0; x < size; x++) {
        for (int y = 0; y < size; y++) {
            for (int z = 0; z < size; z++) {
                locations.add(new Location(world, 
                    start.getX() + x,
                    start.getY() + y,
                    start.getZ() + z
                ));
            }
        }
    }
    
    // Process in chunks over multiple ticks
    AtomicInteger index = new AtomicInteger(0);
    
    scheduler.runRepeating(() -> {
        int start = index.get();
        int end = Math.min(start + blocksPerTick, locations.size());
        
        // Process this batch
        for (int i = start; i < end; i++) {
            world.setBlock(locations.get(i), type);
        }
        
        index.set(end);
        
        // Check if done
        if (end >= locations.size()) {
            return true; // Stop task
        }
        return false; // Continue
    }, 1); // Run every tick
}
```

## Memory Management

### Prevent Memory Leaks

#### [BAD] Never Clearing Maps

```java
private final Map<UUID, SomeData> playerData = new HashMap<>();

@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    playerData.put(event.getPlayer().getUUID(), new SomeData());
    // Data stays in memory forever, even after player quits!
}
```

#### [GOOD] Proper Cleanup

```java
private final Map<UUID, SomeData> playerData = new HashMap<>();

@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    playerData.put(event.getPlayer().getUUID(), new SomeData());
}

@EventHandler
public void onPlayerQuit(PlayerQuitEvent event) {
    // Clean up when player leaves
    UUID uuid = event.getPlayer().getUUID();
    
    // Save if needed
    SomeData data = playerData.get(uuid);
    if (data != null) {
        saveData(uuid, data);
    }
    
    // Remove from memory
    playerData.remove(uuid);
}
```

### Use Weak References for Caches

```java
// Cache will be automatically cleared by garbage collector if memory is low
private final Map<UUID, WeakReference<PlayerData>> cache = new HashMap<>();

public PlayerData getData(UUID uuid) {
    WeakReference<PlayerData> ref = cache.get(uuid);
    
    if (ref != null) {
        PlayerData data = ref.get();
        if (data != null) {
            return data; // Cache hit
        }
    }
    
    // Cache miss - load data
    PlayerData data = loadFromDatabase(uuid);
    cache.put(uuid, new WeakReference<>(data));
    return data;
}
```

## Scheduler Best Practices

### Repeating Tasks

```java
// [BAD] Creating new task every time
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    scheduler.runRepeating(() -> {
        // Task runs FOREVER, even after player quits!
        updatePlayerStats(event.getPlayer());
    }, 20); // Every second
}

// [GOOD] Track and cancel tasks
private final Map<UUID, ScheduledTask> playerTasks = new HashMap<>();

@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    UUID uuid = player.getUUID();
    
    ScheduledTask task = scheduler.runRepeating(() -> {
        updatePlayerStats(player);
        return false; // Continue running
    }, 20);
    
    playerTasks.put(uuid, task);
}

@EventHandler
public void onPlayerQuit(PlayerQuitEvent event) {
    UUID uuid = event.getPlayer().getUUID();
    
    // Cancel task when player quits
    ScheduledTask task = playerTasks.remove(uuid);
    if (task != null) {
        task.cancel();
    }
}
```

## Collection Optimization

### Choose Right Data Structure

```java
// Use ArrayList for iteration, LinkedList for frequent add/remove
List<Player> players = new ArrayList<>(); // Fast iteration
List<QueueEntry> queue = new LinkedList<>(); // Fast add/remove from ends

// Use HashSet for uniqueness checks
Set<UUID> processedPlayers = new HashSet<>(); // O(1) lookup

// Use HashMap for key-value lookups
Map<UUID, PlayerData> data = new HashMap<>(); // O(1) lookup

// Use TreeMap for sorted data
Map<String, Integer> leaderboard = new TreeMap<>(); // Sorted by key

// Use ConcurrentHashMap for thread-safe access
Map<UUID, Data> shared = new ConcurrentHashMap<>(); // Thread-safe
```

## Profiling Your Plugin

### Measure Performance

```java
public class PerformanceMonitor {
    private final Map<String, Long> timings = new HashMap<>();
    
    public void startTiming(String operation) {
        timings.put(operation, System.nanoTime());
    }
    
    public void endTiming(String operation) {
        Long start = timings.remove(operation);
        if (start != null) {
            long duration = System.nanoTime() - start;
            double ms = duration / 1_000_000.0;
            
            if (ms > 50) { // Warn if operation takes >50ms
                logger.warn(operation + " took " + ms + "ms (slow!)");
            }
        }
    }
}

// Usage:
monitor.startTiming("database-query");
PlayerData data = database.query(...);
monitor.endTiming("database-query");
```

## Configuration for Performance

```yaml
# config.yml
performance:
  # Cache settings
  cache:
    player-data-ttl: 300 # seconds
    max-cached-players: 1000
  
  # Batch processing
  batch:
    blocks-per-tick: 1000
    max-batch-size: 100000
  
  # Database
  database:
    connection-pool-size: 10
    query-timeout: 5000 # ms
```

## Monitoring Tools

```java
// Log TPS (ticks per second)
scheduler.runRepeating(() -> {
    double tps = server.getTPS();
    
    if (tps < 15.0) {
        logger.warn("Low TPS: " + tps + " (lag detected!)");
    }
    
    return false;
}, 100); // Check every 5 seconds
```

---

**Key Takeaways**:
1. Cache expensive lookups
2. Use async for I/O operations
3. Batch block updates
4. Clean up after players quit
5. Choose appropriate data structures
6. Monitor and profile your code
