# Events & Listeners

The Hytale server uses a **functional, asynchronous event system**. Unlike other platforms that use annotation-based listeners (`@EventHandler`), Hytale uses direct registration with `CompletableFuture`.

## The Event Bus

You access the event bus via the `HytaleServer` instance.

```java
import com.hypixel.hytale.server.core.HytaleServer;
import com.hypixel.hytale.event.EventBus;

// Get the event bus
EventBus eventBus = HytaleServer.get().getEventBus();
```

## Registering a Listener

Events are registered programmatically. You must provide:
1. **Priority**: When your listener runs relative to others.
2. **Event Class**: The specific event type you want to handle.
3. **Handler Function**: A function that processes the event asynchronously.

### Basic Example: Welcome Message

```java
import com.hypixel.hytale.server.core.HytaleServer;
import com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent;
import com.hypixel.hytale.event.EventPriority;
import com.hypixel.hytale.server.core.Message;

@Override
public void start() {
    HytaleServer.get().getEventBus().register(
        EventPriority.NORMAL,
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

Priorities determine the order in which listeners are executed. They are defined in `com.hypixel.hytale.event.EventPriority`.

| Priority | Usage |
|----------|-------|
| `FIRST` | Run first. Use for blocking/protection plugins. |
| `EARLY` | Run before standard plugins. |
| `NORMAL` | **Default**. Standard gameplay logic. |
| `LATE` | Run after standard logic. |
| `LAST` | Run last. Use for monitoring or final logging. |

```java
EventPriority.FIRST.getValue() // Pass this .getValue() short to the register method
```

## Asynchronous Handling

The event system is built on `CompletableFuture`. This means your handlers are naturally chainable and async-friendly.

```java
future -> future.thenApplyAsync(event -> {
    // This runs on a separate thread pool!
    loadPlayerDataFromDatabase(event.getPlayer());
    return event;
})
```

### [BAD] Blocking the Chain
Do not block the future chain with `Thread.sleep` or heavy synchronous IO directly in `thenApply` if you can avoid it, although `thenApply` usually runs on the event thread. For heavy work, use `thenApplyAsync`.

## Common Events

### Player Events
Package: `com.hypixel.hytale.server.core.event.events.player`

- **`PlayerConnectEvent`**: Fired when a player joins (replaces "JoinEvent").
- **`PlayerDisconnectEvent`**: Fired when a player leaves.
- **`PlayerChatEvent`**: Fired when a player sends a message.

### World/Block Events
Package: `com.hypixel.hytale.server.core.event.events.ecs`

- **`PlaceBlockEvent`**: Fired when a block is placed.
- **`BreakBlockEvent`**: Fired when a block is broken.

## Unregistering Listeners

The `register` method returns an `EventRegistration` object. Keep a reference to it if you need to unregister later.

```java
var registration = HytaleServer.get().getEventBus().register(...);

// Later...
registration.unregister();
```
