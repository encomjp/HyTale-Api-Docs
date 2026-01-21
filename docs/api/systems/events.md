# Events API

The event system allows plugins to react to actions occurring in the server.

## Event System Overview

Hytale uses a publish-subscribe event system. 
1. **Fire**: The server (or a plugin) fires an event (e.g., `PlayerJoinEvent`).
2. **Listen**: Registered listeners receive the event.
3. **React**: Listeners can modify the event, cancel it, or perform other logic.

## EventManager

The core interface for registering listeners.

```java
public interface EventManager {
    // Register a listener object (must contain @EventHandler methods)
    void register(Object listener);
    
    // Unregister a specific listener
    void unregister(Object listener);
    
    // Unregister everything from a specific plugin (useful on reload)
    void unregisterAll(Plugin plugin);
    
    // Fire a custom event for other plugins to hear
    void fire(Event event);
}
```

## Registering Listeners

Listeners must be registered in your plugin's main class, usually during `onEnable`.

```java
@Override
public void onEnable(PluginContext context) {
    // 1. Register the plugin class itself if it has @EventHandlers
    context.getEventManager().register(this);
    
    // 2. OR Register separate listener classes (Recommended for organization)
    context.getEventManager().register(new PlayerListener(context));
    context.getEventManager().register(new WorldListener(context));
}
```

## EventHandler Annotation

Mark methods with `@EventHandler` to designate them as event listeners.

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    // This code runs when a player joins
}
```

### Priority Levels

Priorities determine the order in which plugins receive the event.

| Priority | Order | Description & Use Case |
|----------|-------|------------------------|
| **LOWEST** | 1st | **Initial Setup**: Run first to set default values or prevent other plugins from seeing it. |
| **LOW** | 2nd | **Early Modification**: Make changes that others should see/override. |
| **NORMAL** | 3rd | **Standard Logic**: Most gameplay logic goes here. (Default) |
| **HIGH** | 4th | **Late Guard**: Block actions or override previous plugins. |
| **HIGHEST** | 5th | **Final Authority**: Force an outcome. (Use sparingly!) |
| **MONITOR** | 6th | **Read-Only**: Watch the final outcome of an event. **NEVER change the event state here.** |

```java
@EventHandler(priority = EventPriority.HIGH)
public void onPlayerJoinHigh(PlayerJoinEvent event) {
    // I run after NORMAL listeners
}
```

## Cancellable Events

Many events implement `Cancellable`. If cancelled, the action (e.g., block breaking) attempts to revert or stop.

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    // 1. Check if we should block this action
    if (isSpawnArea(event.getBlock())) {
        
        // 2. Cancel the event
        event.setCancelled(true);
        
        // 3. Inform the user
        event.getPlayer().sendMessage("§cYou cannot break blocks here!");
    }
}
```

### Handling Cancelled Events
By default, listeners still receive cancelled events. You should check `isCancelled()` if your logic depends on the event actually happening.

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    // Good Practice: Check if another plugin cancelled it first
    if (event.isCancelled()) {
        return; 
    }
    
    // Do expensive logic only if not cancelled
    giveCustomDrops(event);
}
```

## Player Events

### PlayerJoinEvent
Fired when a player successfully connects.

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    
    // Change the yellow login message
    event.setJoinMessage("§eWelcome, " + player.getName() + "!");
}
```

### PlayerChatEvent
Fired when a player types in chat.

```java
@EventHandler
public void onChat(PlayerChatEvent event) {
    // Filter bad words
    if (containsSwearWord(event.getMessage())) {
        event.setCancelled(true);
        event.getPlayer().sendMessage("§cPlease be polite.");
    }
}
```

## Custom Events

Plugins can define their own events for modularity.

### 1. Define the Event
```java
public class PlayerLevelUpEvent extends Event {
    private final Player player;
    private final int newLevel;
    
    public PlayerLevelUpEvent(Player player, int newLevel) {
        this.player = player;
        this.newLevel = newLevel;
    }
    
    public Player getPlayer() { return player; }
    public int getNewLevel() { return newLevel; }
}
```

### 2. Fire the Event
```java
public void levelUp(Player player) {
    int newLvl = player.getLevel() + 1;
    
    // Create and fire
    PlayerLevelUpEvent event = new PlayerLevelUpEvent(player, newLvl);
    context.getEventManager().fire(event);
    
    // Actually apply level
    player.setLevel(newLvl);
}
```

### 3. Listen for it
```java
@EventHandler
public void onLevelUp(PlayerLevelUpEvent event) {
    event.getPlayer().sendTitle("Leveled Up!", "Lvl " + event.getNewLevel());
}
```

## Best Practices

### 1. Don't Block the Main Thread
Events run on the main server thread. Never do blocking I/O (files, database, web requests) in an event handler.

```java
// BAD 🛑
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Freezes server until database responds!
    PlayerData data = database.load(event.getPlayer().getUUID()); 
}

// GOOD ✅
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Run async
    CompletableFuture.runAsync(() -> {
        PlayerData data = database.load(event.getPlayer().getUUID());
        // Return to main thread to apply
        server.getScheduler().runTask(() -> applyData(event.getPlayer(), data));
    });
}
```

### 2. Use Monitor for Logging
If you want to log something (like chat), use `MONITOR` priority so you log what *actually* happened after other plugins modified or cancelled it.

```java
@EventHandler(priority = EventPriority.MONITOR)
public void onChatLog(PlayerChatEvent event) {
    if (!event.isCancelled()) {
        Logger.info("[Chat] " + event.getPlayer().getName() + ": " + event.getMessage());
    }
}
```
