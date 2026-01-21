# Registry API

Advanced API for registering custom content.

This API acts as the "glue" for adding new things to the game that aren't just generic items.

## Verified Classes
- `com.hypixel.hytale.protocol.PacketRegistry`
- `com.hypixel.hytale.server.core.command.system.CommandRegistry`

## Asset Registry

Used to check if custom assets (models, textures) are loaded correctly.

```java
AssetRegistry assets = context.getAssetRegistry();

if (assets.hasAsset("my_mod:models/sword.json")) {
    // Asset is valid
}
```

## Command Registry

The backend for the Command API. Usually, you use `CommandManager`, but you can access the registry directly for advanced manipulation (like unregistering commands).

```java
CommandRegistry registry = server.getCommandRegistry();
registry.registerCommand(myCommand);
```

## Packet Registry

Essential for **Modding**. If you create a client-side mod and a server plugin, they talk via custom packets.

1.  Create a class extending `Packet`.
2.  Register it with a unique ID.

```java
PacketRegistry registry = server.getPacketRegistry();

// ID 1001. Must match on client!
registry.registerPacket(MyCustomPacket.class, 1001); 
```
