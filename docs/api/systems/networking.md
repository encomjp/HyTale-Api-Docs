# Networking API

Handle raw packets and custom network messaging.

> [!CAUTION]
> **Advanced Topic**: Most developers should use the Events API. Messing with packets can disconnect clients if done incorrectly.

## Verified Classes
- `com.hypixel.hytale.protocol.PacketRegistry`
- `com.hypixel.hytale.protocol.packets.Packet`

## Listening to Packets

Intercept packets coming from the client before the server handles them.

```java
@EventHandler
public void onPacketIn(PacketReceivedEvent event) {
    Packet packet = event.getPacket();
    
    // Example: Intercept player movement packets
    if (packet instanceof PlayerMovePacket) {
        PlayerMovePacket move = (PlayerMovePacket) packet;
        // Log or modify data
    }
}
```

## Sending Packets

Send raw data to the client. Useful for features not yet exposed in the high-level API.

```java
// Create a packet (e.g., forcing a camera shake)
CameraShakePacket packet = new CameraShakePacket(0.5f, 20);

// Send to specific player
player.sendPacket(packet);

// Broadcast
server.broadcastPacket(packet);
```

## Custom Packets

Register your own packets for plugin-to-plugin or client-mod communication. See [Registry API](../core/registry.md).
