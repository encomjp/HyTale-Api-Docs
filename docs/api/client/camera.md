# Camera API

Control the player's camera perspective, shake, and settings.

## Verified Classes
- `com.hypixel.hytale.protocol.CameraSettings`
- `com.hypixel.hytale.protocol.packets.camera.SetServerCamera`
- `com.hypixel.hytale.protocol.CameraShake`
- `com.hypixel.hytale.server.core.modules.camera.FlyCameraModule`

## Camera Perspectives
Hytale allows the server to force specific camera modes for gameplay (e.g., Top-Down RPG, Side-Scroller).

### Forced Views
You can restrict a player to a specific view.

```java
// Example method to set side-scroller mode
public void setSideScroller(Player player) {
    CameraSettings settings = new CameraSettings();
    settings.setPerspective(CameraPerspectiveType.SIDE_SCROLLER);
    
    // Lock axis if needed
    settings.setLockedAxis(CameraAxis.X); // Lock X movement
    
    player.sendPacket(new SetServerCamera(settings));
}
```

### Reset Camera
Return control to the player.

```java
player.sendPacket(new SetServerCamera(CameraSettings.RESET));
```

## Camera Shake
Add impact to explosions or events.

```java
// Intensity: 0.0 - 1.0
// Duration: Ticks
CameraShake shake = new CameraShake(0.5f, 20); 
shake.setType(CameraShakeConfig.EXPLOSION);

player.sendPacket(new UpdateCameraShake(shake));
```

## Camera Nodes
For cinematics, you can define `CameraNode` points that the camera travels between.
*Note: Full cinematic API details are still being verified, but nodes exist in the protocol.*
