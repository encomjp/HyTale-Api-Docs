# Chat API

Send and format chat messages.

## Verified Classes
- `com.hypixel.hytale.protocol.packets.interface_.ChatMessage`
- `com.hypixel.hytale.protocol.packets.interface_.ChatType`
- `com.hypixel.hytale.server.core.event.events.player.PlayerChatEvent`

## Sending Messages

### Basic Messages
Send a simple text string to the player's chat box.

```java
player.sendMessage("Hello World!");
```

### Formatted Messages
Hytale supports formatting codes (usually involving `&` or `§`).

```java
// &c = Red, &a = Green, &l = Bold
player.sendMessage("&cAlert: &aSystem is &lonline&a!");

// Using ChatType for semantic meaning
ChatMessage msg = new ChatMessage("Welcome to the server!", ChatType.SYSTEM);
player.sendChat(msg);
```

## Chat Types
Different types render differently in the client (e.g. system messages might have a different font or icon).
- `CHAT`: Standard user chat.
- `SYSTEM`: Server notifications.
- `WHISPER`: Private messages.

## Chat Events

### PlayerChatEvent
Intercept messages before they reach other players.

```java
@EventHandler
public void onChat(PlayerChatEvent event) {
    Player player = event.getPlayer();
    String message = event.getMessage();
    
    // 1. Formatting: Add a prefix (e.g. Rank)
    event.setMessage("§7[Player] " + message);
    
    // 2. Moderation: Filter bad words
    if (isSwearWord(message)) {
        event.setCancelled(true);
        player.sendMessage("§cPlease watch your language!");
    }
}
```

## Broadcast
Send a message to every connected player.

```java
// Method 1: Loop
for (Player p : context.getServer().getOnlinePlayers()) {
    p.sendMessage("Server restart in 1 minute!");
}

// Method 2: Server broadcast (if available)
server.broadcastMessage("Server restart in 1 minute!");
```
