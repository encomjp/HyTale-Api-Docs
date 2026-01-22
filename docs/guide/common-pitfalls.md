# Common Pitfalls & Anti-Patterns

Learn from common mistakes to write better Hytale plugins.

## Thread Safety Issues

## Thread Safety Issues

### [PITFALL] Modifying Game State from Async Thread

```java
// DANGEROUS! Will cause crashes and corruption
scheduler.runAsync(() -> {
    Player player = server.getPlayer("Steve");
    player.teleport(spawn); // CRASH! Not on main thread!
    
    world.setBlock(location, BlockType.STONE); // CORRUPTION!
});
```

**Why it fails**: Hytale's API is not thread-safe. Game state can only be modified from the main thread.

### [SOLUTION] Always Use runSync for Game Modifications

```java
scheduler.runAsync(() -> {
    // Do heavy computation on async thread
    Location destination = calculateDestination();
    
    // Switch back to main thread for game modifications
    scheduler.runSync(() -> {
        Player player = server.getPlayer("Steve");
        if (player != null) {
            player.teleport(destination); // Safe!
        }
    });
});
```

## Event Handler Mistakes

### [PITFALL] Ignoring Cancelled Events

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    // This runs even if another plugin cancelled it!
    Block block = event.getBlock();
    dropCustomLoot(block);
}
```

**Result**: Loot drops even when break was cancelled by protection plugin.

### [SOLUTION] Check for Cancellation

```java
@EventHandler(priority = EventPriority.MONITOR) // Run last
public void onBlockBreak(BlockBreakEvent event) {
    // Only process if not cancelled
    if (event.isCancelled()) {
        return;
    }
    
    Block block = event.getBlock();
    dropCustomLoot(block);
}
```

### [PITFALL] Wrong Event Priority for Cancellation

```java
// Runs at NORMAL priority - might run before protection checks!
@EventHandler
public void onPlayerDamage(EntityDamageEvent event) {
    if (isInSafeZone(event.getEntity())) {
        event.setCancelled(true); // Too late! Damage already processed
    }
}
```

### [SOLUTION] Use LOWEST Priority for Protection

```java
// Runs FIRST - before other plugins process the event
@EventHandler(priority = EventPriority.LOWEST)
public void onPlayerDamage(EntityDamageEvent event) {
    if (isInSafeZone(event.getEntity())) {
        event.setCancelled(true); // Prevents all damage
    }
}
```

### [PITFALL] Modifying Events in MONITOR

```java
@EventHandler(priority = EventPriority.MONITOR)
public void onChat(PlayerChatEvent event) {
    // WRONG! MONITOR should be read-only
    event.setMessage(event.getMessage() + " [Monitored]");
}
```

**Why it's wrong**: MONITOR priority is for observing final state, not modifying.

### [SOLUTION] Use HIGHEST for Final Modifications

```java
@EventHandler(priority = EventPriority.HIGHEST)
public void onChat(PlayerChatEvent event) {
    // Runs late, but still allows modification
    if (!event.isCancelled()) {
        event.setMessage(event.getMessage() + " [Approved]");
    }
}

@EventHandler(priority = EventPriority.MONITOR)
public void logChat(PlayerChatEvent event) {
    // Only log - never modify
    logger.info("Chat: " + event.getMessage());
}
```

## Memory Management

### [PITFALL] Memory Leaks from Maps

```java
private final Map<UUID, PlayerData> playerData = new HashMap<>();

@EventHandler
public void onJoin(PlayerJoinEvent event) {
    playerData.put(event.getPlayer().getUUID(), new PlayerData());
    // Data stays in memory FOREVER, even after player quits!
}

// After a week: OutOfMemoryError!
```

### [SOLUTION] Clean Up on Quit

```java
private final Map<UUID, PlayerData> playerData = new HashMap<>();

@EventHandler
public void onJoin(PlayerJoinEvent event) {
    playerData.put(event.getPlayer().getUUID(), new PlayerData());
}

@EventHandler
public void onQuit(PlayerQuitEvent event) {
    UUID uuid = event.getPlayer().getUUID();
    
    // Save before removing
    PlayerData data = playerData.get(uuid);
    if (data != null) {
        saveData(uuid, data);
    }
    
    // Remove from memory
    playerData.remove(uuid);
}
```

### [PITFALL] Infinite Repeating Tasks

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Creates NEW task for EVERY join, never stopped!
    scheduler.runRepeating(() -> {
        updateStats(event.getPlayer());
        return false; // Keep running
    }, 20);
}

// After 100 players join: Hundreds of tasks running!
```

### [SOLUTION] Track and Cancel Tasks

```java
private final Map<UUID, ScheduledTask> playerTasks = new HashMap<>();

@EventHandler
public void onJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    UUID uuid = player.getUUID();
    
    // Cancel old task if exists
    ScheduledTask oldTask = playerTasks.get(uuid);
    if (oldTask != null) {
        oldTask.cancel();
    }
    
    // Start new task
    ScheduledTask task = scheduler.runRepeating(() -> {
        updateStats(player);
        return false;
    }, 20);
    
    playerTasks.put(uuid, task);
}

@EventHandler
public void onQuit(PlayerQuitEvent event) {
    // CRITICAL: Cancel task when player quits
    UUID uuid = event.getPlayer().getUUID();
    ScheduledTask task = playerTasks.remove(uuid);
    if (task != null) {
        task.cancel();
    }
}
```

## Collection Modification

### [PITFALL] Concurrent Modification

```java
List<Player> players = new ArrayList<>(server.getOnlinePlayers());

for (Player player : players) {
    if (player.isAFK()) {
        players.remove(player); // ConcurrentModificationException!
    }
}
```

### [SOLUTION] Use Iterator or removeIf

```java
// Option 1: Iterator
Iterator<Player> it = players.iterator();
while (it.hasNext()) {
    Player player = it.next();
    if (player.isAFK()) {
        it.remove(); // Safe!
    }
}

// Option 2: removeIf (cleaner)
players.removeIf(Player::isAFK);

// Option 3: Collect to new list
List<Player> activePlayers = players.stream()
    .filter(p -> !p.isAFK())
    .collect(Collectors.toList());
```

## Null Safety

### [PITFALL] Assuming Non-Null

```java
@Event Handler
public void onDeath(PlayerDeathEvent event) {
    Player killer = event.getKiller(); // Can be NULL!
    
    // CRASH if killed by environment (fall, lava, etc.)
    killer.sendMessage("You killed " + event.getPlayer().getName());
}
```

### [SOLUTION] Always Check for Null

```java
@EventHandler
public void onDeath(PlayerDeathEvent event) {
    Player killer = event.getKiller();
    
    // Check before using
    if (killer != null) {
        killer.sendMessage("You killed " + event.getPlayer().getName());
    } else {
        // Player died to environment
        logger.info(event.getPlayer().getName() + " died to environment");
    }
}
```

## String Operations

### [PITFALL] String Concatenation in Loops

```java
String message = "";
for (Player player : players) {
    message += player.getName() + ", "; // Creates NEW string each time!
}
// With 1000 players: Creates 1000 string objects!
```

### [SOLUTION] Use StringBuilder

```java
StringBuilder message = new StringBuilder();
for (Player player : players) {
    message.append(player.getName()).append(", ");
}
String result = message.toString();

// Or use String.join for simple cases
String result = players.stream()
    .map(Player::getName)
    .collect(Collectors.joining(", "));
```

## File I/O

### [PITFALL] Not Closing Resources

```java
public void loadConfig() {
    FileReader reader = new FileReader(file);
    // Read data...
    // LEAK! File handle never closed!
}
```

### [SOLUTION] Try-With-Resources

```java
public void loadConfig() {
    try (FileReader reader = new FileReader(file)) {
        // Read data...
        // Automatically closed, even if exception occurs
    } catch (IOException e) {
        logger.error("Failed to load config", e);
    }
}
```

## Configuration

### [PITFALL] Hardcoding Values

```java
public void kick AfKPlayers() {
    for (Player player : server.getOnlinePlayers()) {
        if (player.getIdleTime() > 300000) { // 5 minutes hardcoded
            player.kick("AFK too long!");
        }
    }
}
```

### [SOLUTION] Use Configuration

```yaml
# config.yml
afk:
  timeout: 300 # seconds
  kick-message: "AFK too long!"
```

```java
public void kickAFKPlayers() {
    int timeout = config.getInt("afk.timeout") * 1000; // Convert to ms
    String message = config.getString("afk.kick-message");
    
    for (Player player : server.getOnlinePlayers()) {
        if (player.getIdleTime() > timeout) {
            player.kick(message);
        }
    }
}
```

## Player References

### [PITFALL] Storing Player Objects

```java
// BAD: Player object becomes stale after quit
private final Map<String, Player> cachedPlayers = new HashMap<>();

public void addPlayer(Player player) {
    cachedPlayers.put(player.getName(), player);
}

public void doSomething(String name) {
    Player player = cachedPlayers.get(name);
    player.sendMessage("Hello!"); // CRASH if player quit!
}
```

### [SOLUTION] Store UUIDs, Lookup When Needed

```java
// GOOD: Store UUID, lookup when needed
private final Set<UUID> trackedPlayers = new HashSet<>();

public void addPlayer(Player player) {
    trackedPlayers.add(player.getUUID());
}

public void doSomething(UUID uuid) {
    Player player = server.getPlayer(uuid);
    if (player != null && player.isOnline()) {
        player.sendMessage("Hello!"); // Safe!
    }
}
```

## Database Access

### [PITFALL] Blocking Main Thread

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // BLOCKS server for 100-500ms per join!
    PlayerData data = database.query("SELECT * FROM players WHERE uuid=?", 
                                      event.getPlayer().getUUID());
    
    // Server freezes during database query
    applyData(data);
}
```

### [SOLUTION] Async with Callback

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    UUID uuid = player.getUUID();
    
    // Quick default setup (instant)
    applyDefaults(player);
    
    // Load from database asynchronously
    scheduler.runAsync(() -> {
        PlayerData data = database.query("SELECT * FROM players WHERE uuid=?", uuid);
        
        // Apply on main thread
        scheduler.runSync(() -> {
            if (player.isOnline()) {
                applyData(player, data);
            }
        });
    });
}
```

## Exception Handling

### [PITFALL] Swallowing Exceptions

```java
try {
    saveData(player);
} catch (Exception e) {
    // Silent failure - no one knows it failed!
}
```

### [SOLUTION] Log Exceptions

```java
try {
    saveData(player);
} catch (IOException e) {
    logger.error("Failed to save data for " + player.getName(), e);
    player.sendMessage("Error saving your data! Contact admin.");
} catch (Exception e) {
    logger.error("Unexpected error saving data", e);
}
```

## Testing & Validation

### [PITFALL] No Input Validation

```java
@Override
public void execute(CommandContext context) {
    String[] args = context.getArgs();
    
    // CRASH if no arguments!
    int amount = Integer.parseInt(args[0]);
    
    // CRASH if not a number!
    giveItems(context.getPlayer(), amount);
}
```

### [SOLUTION] Validate All Inputs

```java
@Override
public void execute(CommandContext context) {
    String[] args = context.getArgs();
    Player player = context.getPlayer();
    
    // Check argument count
    if (args.length < 1) {
        player.sendMessage("Usage: /give <amount>");
        return;
    }
    
    // Validate number
    int amount;
    try {
        amount = Integer.parseInt(args[0]);
    } catch (NumberFormatException e) {
        player.sendMessage("Amount must be a number!");
        return;
    }
    
    // Validate range
    if (amount < 1 || amount > 64) {
        player.sendMessage("Amount must be between 1 and 64!");
        return;
    }
    
    // Now safe to process
    giveItems(player, amount);
}
```

## Quick Reference Card

| Pitfall | Solution |
|---------|----------|
| Async game modification | Use `scheduler.runSync()` |
| Ignoring cancelled events | Check `event.isCancelled()` |
| Wrong event priority | Use LOWEST for protection, HIGHEST for final mods, MONITOR for logging |
| Memory leaks | Clean up maps on player quit |
| Infinite tasks | Track and cancel tasks on quit |
| Concurrent modification | Use iterator or `removeIf()` |
| Null assumptions | Always check `!= null` |
| String concatenation | Use `StringBuilder` |
| Resource leaks | Use try-with-resources |
| Hardcoded values | Use configuration files |
| Storing Player objects | Store UUIDs, lookup when needed |
| Blocking database | Use async with callbacks |
| Swallowing exceptions | Log with context |
| No validation | Validate all user inputs |

---

**Remember**: Prevention is better than debugging. Follow these patterns from the start!
