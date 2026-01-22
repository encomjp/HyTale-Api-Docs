# Event System API

The Hytale server utilizes a reactive, functional event system based on `CompletableFuture`.

## Core Components

| Component | Class | Description |
|-----------|-------|-------------|
| **Event Bus** | `com.hypixel.hytale.event.EventBus` | The central registry for all events. Accessed via `HytaleServer.get().getEventBus()`. |
| **Registration** | `com.hypixel.hytale.event.EventRegistration` | The result of registering a listener. Used to unregister. |
| **Priorities** | `com.hypixel.hytale.event.EventPriority` | Enum determining execution order (`FIRST` to `LAST`). |

## Registration Method

```java
public <EventType> EventRegistration register(
    EventPriority priority, 
    Class<EventType> type, 
    Consumer<EventType> handler
)
```

## Example (Verified)

```java
HytaleServer.get().getEventBus().register(
    EventPriority.NORMAL,
    PlayerConnectEvent.class,
    event -> {
        System.out.println("Player " + event.getPlayer().getDisplayName() + " connected!");
    }
);
```

## Known Events

### Player Events
| Event Name | Package | Description |
|------------|---------|-------------|
| `PlayerConnectEvent` | `...events.player` | Triggered when a player completes connection. |
| `PlayerDisconnectEvent` | `...events.player` | Triggered on disconnection. |
| `PlayerChatEvent` | `...events.player` | Triggered on chat message. |

### Block/Entity Events
| Event Name | Package | Description |
|------------|---------|-------------|
| `PlaceBlockEvent` | `...events.ecs` | Block placement. |
| `BreakBlockEvent` | `...events.ecs` | Block destruction. |
| `EntityRemoveEvent` | `...events.entity` | Entity removal/death. |

## Verified vs Theoretical
This documentation matches the `HytaleServer.jar` API status as of verification.

- **Status**: [VERIFIED]
- **API Style**: Functional (Futures)
- **Annotations**: [MISSING]/Deprecated (No `@EventHandler` found in core).
