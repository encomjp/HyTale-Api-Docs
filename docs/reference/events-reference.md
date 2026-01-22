# Events Reference

Complete reference for the Hytale event system, event types, and handler implementation.

## Event System Architecture

The Hytale event system is built on a dual bus architecture for handling both synchronous and asynchronous events.

### Core Components (VERIFIED from JAR)

**Package**: `com.hypixel.hytale.event`

| Class | Type | Purpose |
|-------|------|---------|
| `IEvent` | Interface | Base event interface |
| `IAsyncEvent` | Interface | Marker for async-capable events |
| `ICancellable` | Interface | Events that can be cancelled |
| `EventBus` | Class | Core event distribution system |
| `SyncEventBusRegistry` | Class | Synchronous event handling |
| `AsyncEventBusRegistry` | Class | Asynchronous event handling |
| `EventPriority` | Enum | Event handler priority levels |
| `EventRegistration` | Class | Event handler metadata |

## Event Priority System

Events are processed in priority order (VERIFIED from JAR):

```java
public enum EventPriority {
    LOWEST,    // Runs first - use for monitoring only
    LOW,       // Early handling
    NORMAL,    // Default priority
    HIGH,      // Late handling
    HIGHEST,   // Runs last - use for final modifications
    MONITOR    // Observe only - should never modify event
}
```

### Priority Usage Guidelines

```java
// LOWEST - Early data collection
@EventHandler(priority = EventPriority.LOWEST)
public void onPlayerJoinMonitor(PlayerJoinEvent event) {
    // Log the join time for analytics
    analytics.recordJoin(event.getPlayer());
}

// NORMAL - Standard event handling (default)
@EventHandler // Same as @EventHandler(priority = EventPriority.NORMAL)
public void onPlayerJoin(PlayerJoinEvent event) {
    // Standard greeting message
    event.getPlayer().sendMessage("Welcome!");
}

// HIGHEST - Final modifications before event completes
@EventHandler(priority = EventPriority.HIGHEST)
public void onPlayerJoinFinal(PlayerJoinEvent event) {
    // Apply final permission checks
    if (!hasJoinPermission(event.getPlayer())) {
        event.setCancelled(true);
    }
}

// MONITOR - Read-only observation (should NEVER cancel or modify)
@EventHandler(priority = EventPriority.MONITOR)
public void onPlayerJoinLog(PlayerJoinEvent event) {
    // Only log - do not modify the event!
    logger.info("Player joined: " + event.getPlayer().getName());
}
```

## Event Types

### Player Events

#### PlayerJoinEvent
Fired when a player joins the server.

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    
    // Customize join message
    event.setJoinMessage("Welcome " + player.getName() + "!");
    
    // Grant default permissions
    player.addPermission("default.permissions");
    
    // Teleport to spawn
    player.teleport(getSpawnLocation());
}
```

#### PlayerQuitEvent
Fired when a player leaves the server.

```java
@EventHandler
public void onPlayerQuit(PlayerQuitEvent event) {
    Player player = event.getPlayer();
    
    // Save player data
    savePlayerData(player);
    
    // Customize quit message
    event.setQuitMessage(player.getName() + " has left!");
    
    // Clean up player-specific data
    cleanupPlayerData(player.getUUID());
}
```

#### PlayerChatEvent (ICancellable)
Fired when a player sends a chat message.

```java
@EventHandler
public void onPlayerChat(PlayerChatEvent event) {
    Player player = event.getPlayer();
    String message = event.getMessage();
    
    // Check for spam
    if (isSpam(player, message)) {
        event.setCancelled(true); // Prevent message from sending
        player.sendMessage("Please don't spam!");
        return;
    }
    
    // Apply chat formatting
    if (player.hasPermission("chat.color")) {
        // Allow color codes
        event.setMessage(ChatColor.translateCodes(message));
    }
    
    // Add rank prefix
    String rank = getRank(player);
    event.setFormat("[" + rank + "] %player%: %message%");
}
```

#### PlayerMoveEvent (ICancellable)
Fired when a player moves.

```java
@EventHandler
public void onPlayerMove(PlayerMoveEvent event) {
    Player player = event.getPlayer();
    Location from = event.getFrom();
    Location to = event.getTo();
    
    // Check if player actually moved (not just head rotation)
    if (!hasMoved(from, to)) {
        return; // Ignore head movements
    }
    
    // Check for protected areas
    if (isInProtectedZone(to) && !player.hasPermission("bypass.protection")) {
        event.setCancelled(true); // Prevent movement
        player.sendMessage("You cannot enter this area!");
    }
    
    // Update player location in tracking system
    updatePlayerLocation(player, to);
}

private boolean hasMoved(Location from, Location to) {
    // Check if coordinates changed (not just rotation)
    return from.getX() != to.getX() || 
           from.getY() != to.getY() || 
           from.getZ() != to.getZ();
}
```

#### PlayerDeathEvent
Fired when a player dies.

```java
@EventHandler
public void onPlayerDeath(PlayerDeathEvent event) {
    Player player = event.getPlayer();
    Player killer = event.getKiller(); // Null if not killed by player
    
    // Customize death message
    if (killer != null) {
        event.setDeathMessage(player.getName() + " was slain by " + killer.getName());
    } else {
        event.setDeathMessage(player.getName() + " died");
    }
    
    // Keep inventory (if desired)
    event.setKeepInventory(true);
    
    // Keep experience
    event.setKeepLevel(true);
    
    // Custom respawn location
    event.setRespawnLocation(getLastBedLocation(player));
}
```

### Block Events

#### BlockBreakEvent (ICancellable)
See [Block Reference](./blocks-reference.md#blockbreakevent) for details.

#### BlockPlaceEvent (ICancellable)
See [Block Reference](./blocks-reference.md#blockplaceevent) for details.

### World Events

#### ChunkLoadEvent
Fired when a chunk is loaded.

```java
@EventHandler
public void onChunkLoad(ChunkLoadEvent event) {
    Chunk chunk = event.getChunk();
    World world = chunk.getWorld();
    
    // Check if this is a new chunk (first time generated)
    if (event.isNewChunk()) {
        // Apply custom world generation
        generateCustomStructures(chunk);
    }
    
    // Register chunk for periodic updates
    registerChunkForUpdates(chunk);
}
```

#### ChunkUnloadEvent (ICancellable)
Fired when a chunk is about to unload.

```java
@EventHandler
public void onChunkUnload(ChunkUnloadEvent event) {
    Chunk chunk = event.getChunk();
    
    // Save chunk data before unload
    saveChunkData(chunk);
    
    // Optionally prevent unload if players are nearby
    if (hasPlayersNearby(chunk)) {
        event.setCancelled(true);
    }
}
```

### Entity Events

#### EntitySpawnEvent (ICancellable)
Fired when an entity spawns.

```java
@EventHandler
public void onEntitySpawn(EntitySpawnEvent event) {
    Entity entity = event.getEntity();
    Location loc = event.getLocation();
    
    // Prevent hostile mobs in safe zones
    if (isHostile(entity) && inSafeZone(loc)) {
        event.setCancelled(true);
        return;
    }
    
    // Apply custom entity AI
    if (entity instanceof CustomNPC) {
        applyCustomAI((CustomNPC) entity);
    }
}
```

#### EntityDamageEvent (ICancellable)
Fired when an entity takes damage.

```java
@EventHandler
public void onEntityDamage(EntityDamageEvent event) {
    Entity entity = event.getEntity();
    double damage = event.getDamage();
    DamageCause cause = event.getCause();
    
    // Apply damage modifiers
    if (entity instanceof Player) {
        Player player = (Player) entity;
        
        // Reduce fall damage with specific items
        if (cause == DamageCause.FALL && hasFeatherFalling(player)) {
            event.setDamage(damage * 0.5); // 50% reduction
        }
        
        // Cancel damage in god mode
        if (player.hasPermission("admin.godmode")) {
            event.setCancelled(true);
        }
    }
}
```

## Async Events (IAsyncEvent)

Some events implement `IAsyncEvent` and can be handled asynchronously:

```java
@EventHandler
public void onAsyncPlayerChat(AsyncPlayerChatEvent event) {
    // This handler runs on an async thread
    // Safe to do blocking operations like database queries
    
    Player player = event.getPlayer();
    String message = event.getMessage();
    
    // Query database (blocking operation)
    PlayerData data = database.getPlayerData(player.getUUID());
    
    // Apply chat filters based on player data
    if (data.isMuted()) {
        event.setCancelled(true);
        
        // Schedule message on main thread
        scheduler.runSync(() -> {
            player.sendMessage("You are muted!");
        });
    }
}
```

> [!WARNING]
> **Thread Safety**: Async event handlers must not directly modify game state.  
> Use `Scheduler.runSync()` to schedule modifications on the main thread.

## Custom Events

Create your own events:

```java
// Define the event
public class CustomTeleportEvent implements ICancellable {
    private final Player player;
    private Location from;
    private Location to;
    private boolean cancelled = false;
    
    public CustomTeleportEvent(Player player, Location from, Location to) {
        this.player = player;
        this.from = from;
        this.to = to;
    }
    
    public Player getPlayer() { return player; }
    public Location getFrom() { return from; }
    public Location getTo() { return to; }
    public void setTo(Location to) { this.to = to; }
    
    @Override
    public boolean isCancelled() { return cancelled; }
    
    @Override
    public void setCancelled(boolean cancelled) { 
        this.cancelled = cancelled; 
    }
}

// Fire the event
public void teleportPlayer(Player player, Location to) {
    Location from = player.getLocation();
    
    // Create and fire event
    CustomTeleportEvent event = new CustomTeleportEvent(player, from, to);
    eventManager.callEvent(event);
    
    // Check if cancelled
    if (!event.isCancelled()) {
        // Perform teleport with potentially modified location
        player.teleport(event.getTo());
    }
}

// Listen to the custom event
@EventHandler
public void onCustomTeleport(CustomTeleportEvent event) {
    Player player = event.getPlayer();
    
    // Prevent teleporting to dangerous locations
    if (isDangerous(event.getTo())) {
        event.setCancelled(true);
        player.sendMessage("That location is too dangerous!");
    }
}
```

## Event Registration

### Manual Registration

```java
@Override
public void onEnable(PluginContext context) {
    EventManager events = context.getEventManager();
    
    // Register this class as an event listener
    events.registerEvents(this, this);
    
    // Register a specific listener instance
    MyEventListener listener = new MyEventListener();
    events.registerEvents(listener, this);
}
```

### Unregistering Events

```java
@Override
public void onDisable(PluginContext context) {
    EventManager events = context.getEventManager();
    
    // Unregister all handlers from this plugin
    events.unregisterAll(this);
    
    // Unregister specific listener
    events.unregisterAll(myListener);
}
```

## Best Practices

### Do's [GOOD]
- **Use appropriate priority levels** based on your needs
- **Check for null values** (e.g., `event.getKiller()` can be null)
- **Always check cancelled events** before processing
- **Use MONITOR priority** for read-only logging
- **Handle exceptions** to prevent breaking other plugins

### Don'ts [BAD]
- **Never modify events in MONITOR priority**
- **Don't perform heavy operations** in high-frequency events (PlayerMoveEvent)
- **Don't modify game state** from async event handlers
- **Don't rely on execution order** between same-priority handlers
- **Don't forget to unregister** events in onDisable()

## Performance Tips

```java
// [BAD] - Checking every movement
@EventHandler
public void onPlayerMove(PlayerMoveEvent event) {
    checkForTriggers(event.getTo()); // Called hundreds of times per second!
}

// [GOOD] - Only check when player moves to new block
private final Map<UUID, Location> lastBlockLocation = new HashMap<>();

@EventHandler
public void onPlayerMove(PlayerMoveEvent event) {
    Player player = event.getPlayer();
    Location to = event.getTo();
    
    // Only process if player moved to a different block
    Location lastBlock = lastBlockLocation.get(player.getUUID());
    if (lastBlock != null && sameBlock(lastBlock, to)) {
        return; // Still in same block, ignore
    }
    
    lastBlockLocation.put(player.getUUID(), to);
    checkForTriggers(to); // Much less frequent!
}

private boolean sameBlock(Location a, Location b) {
    return a.getBlockX() == b.getBlockX() &&
           a.getBlockY() == b.getBlockY() &&
           a.getBlockZ() == b.getBlockZ();
}
```

---

**Last Updated**: 2026-01-22  
**Source**: Verified from `hytalseserver_unpacked/com/hypixel/hytale/event`  
**JAR Version**: HytaleServer.jar (latest)
