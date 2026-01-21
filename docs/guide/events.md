# Events & Listeners

Events are how your plugin knows when something happens in the game. When a player joins, breaks a block, or sends a message - the server fires an event that your plugin can respond to.

This is the heart of plugin development!

## How Events Work

Think of events like a notification system:

```
┌──────────────────────────────────────────────────────────────┐
│  1. SOMETHING HAPPENS                                         │
│     Player joins the server                                   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  2. SERVER CREATES AN EVENT                                   │
│     new PlayerJoinEvent(player)                              │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  3. SERVER NOTIFIES ALL LISTENERS                             │
│     "Hey plugins, a player joined!"                          │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  4. YOUR PLUGIN REACTS                                        │
│     Send welcome message, give items, log to console, etc.   │
└──────────────────────────────────────────────────────────────┘
```

---

## Your First Event Listener

Let's create a listener that welcomes players when they join.

### Step 1: Create the Listener Class

Create a new file `PlayerListener.java`:

```java
package com.yourname.myplugin.listeners;

import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.event.EventHandler;
import com.hypixel.hytale.server.core.event.player.PlayerJoinEvent;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.plugin.PluginContext;

public class PlayerListener {
    private final PluginContext context;
    
    // Constructor - receives the plugin context
    public PlayerListener(PluginContext context) {
        this.context = context;
    }
    
    // This method runs when a player joins
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        
        // Send a welcome message
        player.sendMessage(Message.raw("Welcome to the server, " + player.getName() + "!"));
        
        // Log to console
        context.getLogger().info(player.getName() + " has joined the server!");
    }
}
```

### Step 2: Register the Listener

In your main plugin class, register the listener in `onEnable()`:

```java
@Override
public void onEnable(PluginContext context) {
    this.context = context;
    
    // Register the listener
    context.getEventManager().register(new PlayerListener(context));
    
    context.getLogger().info("Plugin enabled!");
}
```

### Step 3: Test It!

1. Build your plugin: `./gradlew build`
2. Copy to mods folder
3. Restart server
4. Join the game
5. You should see the welcome message!

::: tip The @EventHandler Annotation
The `@EventHandler` annotation tells the server "this method handles events". Without it, your method won't be called!
:::

---

## Understanding Event Handler Methods

Event handler methods follow a specific pattern:

```java
@EventHandler
public void anyMethodName(EventType event) {
    // Your code here
}
```

**Rules:**
- Must have `@EventHandler` annotation
- Must be `public void`
- Must have exactly **one parameter** - the event type
- Method name can be anything (use descriptive names!)

### Examples

```java
// ✅ Good - clear and follows the pattern
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) { }

// ✅ Good - different naming style, still works
@EventHandler
public void handleBlockBreak(BlockBreakEvent event) { }

// ❌ Wrong - no annotation
public void onPlayerJoin(PlayerJoinEvent event) { }

// ❌ Wrong - wrong return type
@EventHandler
public String onPlayerJoin(PlayerJoinEvent event) { }

// ❌ Wrong - too many parameters
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event, Player player) { }
```

---

## Common Events

Here are the events you'll use most often:

### Player Events

| Event | When It Fires | Common Uses |
|-------|--------------|-------------|
| `PlayerJoinEvent` | Player connects to server | Welcome messages, loading data |
| `PlayerQuitEvent` | Player disconnects | Saving data, goodbye messages |
| `PlayerChatEvent` | Player sends a message | Chat filters, formatting |
| `PlayerMoveEvent` | Player moves | Zone detection, anti-cheat |
| `PlayerDeathEvent` | Player dies | Death messages, respawn handling |

### World Events

| Event | When It Fires | Common Uses |
|-------|--------------|-------------|
| `BlockBreakEvent` | Player breaks a block | Protection, logging, drops |
| `BlockPlaceEvent` | Player places a block | Protection, building limits |

---

## Working with Event Data

Each event gives you information about what happened.

### PlayerJoinEvent

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Get the player who joined
    Player player = event.getPlayer();
    
    // Get player info
    String name = player.getName();      // "Steve"
    UUID uuid = player.getUuid();        // Player's unique ID
    
    // Send them a message
    player.sendMessage(Message.raw("Hello " + name + "!"));
}
```

### BlockBreakEvent

```java
@EventHandler
public void onBreak(BlockBreakEvent event) {
    // Who broke the block?
    Player player = event.getPlayer();
    
    // What block was broken?
    Block block = event.getBlock();
    BlockType type = block.getType();
    
    // Where was it?
    BlockPosition position = block.getPosition();
    int x = position.getX();
    int y = position.getY();
    int z = position.getZ();
    
    context.getLogger().info(
        player.getName() + " broke " + type + " at " + x + ", " + y + ", " + z
    );
}
```

---

## Cancelling Events

Some events can be **cancelled** to prevent the action from happening.

### Example: Block Protection

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    Player player = event.getPlayer();
    BlockPosition pos = event.getBlock().getPosition();
    
    // Check if this area is protected
    if (isProtectedArea(pos)) {
        // Stop the block from being broken!
        event.setCancelled(true);
        
        // Tell the player why
        player.sendMessage(Message.raw("You cannot break blocks in this protected area!"));
    }
}
```

When you call `event.setCancelled(true)`:
- The block won't break
- The player sees nothing happen
- Other plugins still get notified (so they can react)

### Example: Chat Filter

```java
@EventHandler
public void onChat(PlayerChatEvent event) {
    String message = event.getMessage();
    
    if (containsBadWord(message)) {
        event.setCancelled(true);
        event.getPlayer().sendMessage(Message.raw("Please watch your language!"));
    }
}
```

---

## Event Priority

When multiple plugins listen to the same event, who goes first?

### The Priority Order

```
LOWEST  →  LOW  →  NORMAL  →  HIGH  →  HIGHEST  →  MONITOR
(first)                                              (last)
```

By default, all handlers use `NORMAL` priority.

### Setting Priority

```java
@EventHandler(priority = EventPriority.HIGH)
public void onChatHigh(PlayerChatEvent event) {
    // This runs BEFORE normal priority handlers
}

@EventHandler  // Default is NORMAL
public void onChatNormal(PlayerChatEvent event) {
    // This runs in the middle
}

@EventHandler(priority = EventPriority.LOW)
public void onChatLow(PlayerChatEvent event) {
    // This runs AFTER normal priority handlers
}
```

### When to Use Each Priority

| Priority | Use For |
|----------|---------|
| `LOWEST` | Features that must override everything |
| `LOW` | Pre-processing, validation |
| `NORMAL` | Most features (default) |
| `HIGH` | Post-processing, formatting |
| `HIGHEST` | Final modifications |
| `MONITOR` | Logging only (never modify or cancel!) |

::: warning About MONITOR
`MONITOR` priority is for **observation only**. Don't cancel events or modify data at this priority - other plugins expect you won't.
:::

---

## Organizing Your Listeners

As your plugin grows, keep listeners organized:

### One Class Per Feature

```java
// Good: separate concerns
context.getEventManager().register(new PlayerListener(context));  // Join/quit handling
context.getEventManager().register(new ChatListener(context));    // Chat features
context.getEventManager().register(new ProtectionListener(context)); // Block protection
```

### Multiple Handlers in One Class

You can have multiple handlers in one listener class:

```java
public class PlayerListener {
    
    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        // Handle join
    }
    
    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        // Handle quit
    }
    
    @EventHandler
    public void onChat(PlayerChatEvent event) {
        // Handle chat
    }
}
```

---

## Best Practices

### 1. Keep Handlers Fast

Events run on the main server thread. Slow handlers = server lag!

```java
// ❌ Bad - blocks the server
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    loadDataFromDatabase(event.getPlayer());  // Slow!
}

// ✅ Good - runs database work in background
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    CompletableFuture.runAsync(() -> {
        loadDataFromDatabase(event.getPlayer());
    });
}
```

### 2. Handle Exceptions

Don't let errors crash your handler:

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    try {
        processJoin(event.getPlayer());
    } catch (Exception e) {
        context.getLogger().error("Failed to process player join", e);
    }
}
```

### 3. Check for Cancelled Events

If you're at `MONITOR` priority, check if the event was cancelled:

```java
@EventHandler(priority = EventPriority.MONITOR)
public void logBlockBreak(BlockBreakEvent event) {
    if (event.isCancelled()) {
        return;  // Don't log cancelled actions
    }
    
    logToFile(event);
}
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Handler not called | Check `@EventHandler` annotation is present |
| Handler not called | Make sure you registered the listener in `onEnable()` |
| Wrong event data | Check you're using the right event type |
| Server lag | Move slow operations to async (CompletableFuture) |

---

## Next Steps

Now that you can react to events, let's create commands that players can run:

→ **Next: [Commands](./commands)**
