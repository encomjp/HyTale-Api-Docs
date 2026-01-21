# Events & Listeners

Events are the primary way to react to things happening in the game. When a player joins, breaks a block, or sends a chat message, an event is fired that your plugin can handle.

## Basic Event Handling

### Registering a Listener

Register your listener class in `onEnable()`:

```java
@Override
public void onEnable(PluginContext context) {
    context.getEventManager().register(this);
    // Or register a separate listener class
    context.getEventManager().register(new PlayerListener(context));
}
```

### Creating Event Handlers

Annotate methods with `@EventHandler`:

```java
public class PlayerListener {
    private final PluginContext context;
    
    public PlayerListener(PluginContext context) {
        this.context = context;
    }
    
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        player.sendMessage("Welcome, " + player.getName() + "!");
    }
    
    @EventHandler
    public void onPlayerQuit(PlayerQuitEvent event) {
        context.getLogger().info(event.getPlayer().getName() + " left the server");
    }
}
```

## Event Priority

Control the order handlers are called:

```java
@EventHandler(priority = EventPriority.HIGH)
public void onChat(PlayerChatEvent event) {
    // Called before NORMAL priority handlers
}

@EventHandler(priority = EventPriority.LOW)
public void onChatLate(PlayerChatEvent event) {
    // Called after NORMAL priority handlers
}
```

Priority order (first to last):
1. `LOWEST`
2. `LOW`
3. `NORMAL` (default)
4. `HIGH`
5. `HIGHEST`
6. `MONITOR` (observe only, don't modify)

## Cancellable Events

Some events can be cancelled to prevent the action:

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    if (isProtectedArea(event.getBlock().getPosition())) {
        event.setCancelled(true);
        event.getPlayer().sendMessage("You cannot break blocks here!");
    }
}
```

Check if an event was cancelled by another handler:

```java
@EventHandler(priority = EventPriority.MONITOR)
public void onBlockBreakMonitor(BlockBreakEvent event) {
    if (!event.isCancelled()) {
        // Block was actually broken
        logBlockBreak(event);
    }
}
```

## Common Player Events

### PlayerJoinEvent

Fired when a player joins the server:

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    
    // Get player info
    String name = player.getName();
    UUID uuid = player.getUUID();
    
    // Send messages
    player.sendMessage("Welcome!");
    
    // Modify join message (if supported)
    event.setJoinMessage(name + " has joined the game!");
}
```

### PlayerQuitEvent

Fired when a player leaves:

```java
@EventHandler
public void onQuit(PlayerQuitEvent event) {
    Player player = event.getPlayer();
    savePlayerData(player);
}
```

### PlayerChatEvent

Fired when a player sends a chat message:

```java
@EventHandler
public void onChat(PlayerChatEvent event) {
    String message = event.getMessage();
    Player player = event.getPlayer();
    
    // Filter bad words
    if (containsBadWord(message)) {
        event.setCancelled(true);
        player.sendMessage("Please watch your language!");
        return;
    }
    
    // Modify the message
    event.setMessage("[Modified] " + message);
}
```

### PlayerMoveEvent

Fired when a player moves:

```java
@EventHandler
public void onMove(PlayerMoveEvent event) {
    Location from = event.getFrom();
    Location to = event.getTo();
    
    // Check if they entered a zone
    if (isInZone(to) && !isInZone(from)) {
        event.getPlayer().sendMessage("You entered the safe zone!");
    }
}
```

::: warning Performance
`PlayerMoveEvent` fires very frequently. Keep handlers lightweight.
:::

## Common World Events

### BlockBreakEvent

```java
@EventHandler
public void onBreak(BlockBreakEvent event) {
    Block block = event.getBlock();
    Player player = event.getPlayer();
    
    // Get block info
    BlockType type = block.getType();
    BlockPosition pos = block.getPosition();
    
    context.getLogger().info(player.getName() + " broke " + type + " at " + pos);
}
```

### BlockPlaceEvent

```java
@EventHandler
public void onPlace(BlockPlaceEvent event) {
    Block block = event.getBlock();
    Player player = event.getPlayer();
    
    // Prevent placing in certain areas
    if (isProtected(block.getPosition())) {
        event.setCancelled(true);
    }
}
```

## Unregistering Listeners

Remove listeners when no longer needed:

```java
// Unregister specific listener
context.getEventManager().unregister(myListener);

// Unregister all listeners from your plugin
context.getEventManager().unregisterAll(this);
```

## Custom Events

Create your own events:

```java
public class CustomEvent extends Event {
    private final Player player;
    private final String data;
    
    public CustomEvent(Player player, String data) {
        this.player = player;
        this.data = data;
    }
    
    public Player getPlayer() { return player; }
    public String getData() { return data; }
}
```

Fire custom events:

```java
CustomEvent event = new CustomEvent(player, "some data");
context.getEventManager().fire(event);
```

## Best Practices

### Keep Handlers Fast

Events block the main thread. Avoid:
- Database queries (use async)
- File I/O
- Heavy computation

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Bad: blocks the main thread
    // loadPlayerDataFromDatabase(event.getPlayer());
    
    // Good: async operation
    CompletableFuture.runAsync(() -> {
        loadPlayerData(event.getPlayer());
    });
}
```

### Separate Listener Classes

Don't put all handlers in your main class:

```java
// Good: organized by feature
context.getEventManager().register(new PlayerListener(context));
context.getEventManager().register(new WorldListener(context));
context.getEventManager().register(new ChatListener(context));
```

### Handle Exceptions

Wrap handler code in try-catch:

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    try {
        processJoin(event.getPlayer());
    } catch (Exception e) {
        context.getLogger().error("Failed to process join", e);
    }
}
```
