# Builder Tools API (Clipboard)

Native world editing and clipboard management.

> [!INFO]
> **Why use this?** This API hooks into the *client's* native building tools. Unlike server-side SetBlock loops, this provides users with the familiar "blue ghost" preview and client-side prediction.

## Verified Classes
- `com.hypixel.hytale.protocol.packets.buildertools.BuilderToolPasteClipboard`
- `com.hypixel.hytale.protocol.packets.buildertools.BuilderToolSelectionToolReplyWithClipboard`

## Clipboard Operations

### Pasting Logic
Trigger a paste operation using the data currently in the player's clipboard.

```java
// 1. Define target location
Location target = player.getLocation().add(5, 0, 5);

// 2. Create Packet
// - float rotation: 0, 90, 180, 270 degrees
// - boolean mirror: Flip across axis?
BuilderToolPasteClipboard packet = new BuilderToolPasteClipboard(
    target, 
    0.0f,  
    false
);

// 3. Send
player.sendPacket(packet);
```

### Accessing Selection
You can ask the client "What do you have selected?"

```java
// 1. Send Request
player.sendPacket(new BuilderToolSelectionToolAskForClipboard());

// 2. Listen for Response
@EventHandler
public void onClipboardReply(PacketReceivedEvent event) {
    if (event.getPacket() instanceof BuilderToolSelectionToolReplyWithClipboard) {
        // Access clipboard data (dimensions, blocks)
        var clipboard = ((BuilderToolSelectionToolReplyWithClipboard) event.getPacket()).getClipboard();
        logger.info("Player has " + clipboard.getSize() + " blocks copied.");
    }
}
```
