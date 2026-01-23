# Events & Listeners

The Hytale server uses a **functional, asynchronous event system**.

## The Event Bus

You access the event bus via the `HytaleServer` instance.

```java
import com.hypixel.hytale.server.core.HytaleServer;
// Note: exact package for EventBus depends on internal implementation
// It is accessed via HytaleServer.get().getEventBus()

// Get the event bus
var eventBus = HytaleServer.get().getEventBus();
```

## Registering a Listener

Events are registered programmatically. You typically provide:
1. **Priority** (Optional/Contextual): When your listener runs relative to others.
2. **Event Class**: The specific event type you want to handle.
3. **Handler Function**: A function that processes the event asynchronously.

### Basic Example: Welcome Message

```java
import com.hypixel.hytale.server.core.HytaleServer;
import com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent;
import com.hypixel.hytale.server.core.Message;

@Override
public void start() {
    HytaleServer.get().getEventBus().register(
        // Priority argument (e.g. EventPriority.NORMAL) may be required depending on version
        PlayerConnectEvent.class,
        event -> {
            String playerName = event.getPlayer().getDisplayName();
            // Send welcome message
            event.getPlayer().sendMessage(Message.raw("Welcome, " + playerName + "!"));
        }
    );
}
```

## Event Priorities

If available, priorities determine the order in which listeners are executed.

| Priority | Usage |
|----------|-------|
| `FIRST` | Run first. Use for blocking/protection plugins. |
| `EARLY` | Run before standard plugins. |
| `NORMAL` | **Default**. Standard gameplay logic. |
| `LATE` | Run after standard logic. |
| `LAST` | Run last. Use for monitoring or final logging. |

## Asynchronous Handling

The event system is designed to be async-friendly.

```java
// Conceptual example of async chaining
future -> future.thenApplyAsync(event -> {
    // This runs on a separate thread pool!
    loadPlayerDataFromDatabase(event.getPlayer());
    return event;
})
```

### [BAD] Blocking the Chain
Do not block the future chain with `Thread.sleep` or heavy synchronous IO directly in the main event loop.

## Common Events

### Player Events
Package: `com.hypixel.hytale.server.core.event.events.player`

- **`PlayerConnectEvent`**: Fired when a player joins.
- **`PlayerDisconnectEvent`**: Fired when a player leaves.
- **`PlayerChatEvent`**: Fired when a player sends a message.

### World/Block Events
Package: `com.hypixel.hytale.server.core.event.events.ecs` (or similar)

- **`PlaceBlockEvent`**: Fired when a block is placed.
- **`BreakBlockEvent`**: Fired when a block is broken.

## Unregistering Listeners

The `register` method typically returns a registration object. Keep a reference to it if you need to unregister later.

```java
var registration = HytaleServer.get().getEventBus().register(...);

// Later...
registration.unregister();
```