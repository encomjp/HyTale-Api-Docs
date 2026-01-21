# Environment API

Control global world atmosphere, lighting, and weather.

## Verified Classes
- `com.hypixel.hytale.protocol.WorldEnvironment`
- `com.hypixel.hytale.protocol.packets.assets.UpdateEnvironments`
- `com.hypixel.hytale.protocol.packets.world.UpdateEnvironmentMusic`
- `com.hypixel.hytale.server.core.asset.type.environment.config.Environment`

## Environments
An `Environment` defines the skybox, fog, lighting, and color grading of an area.

### Changing Environment
You can force a specific environment for a player (e.g., make it look like the Nether even in the Overworld).

```java
// "zone_1_underground" is an environment ID defined in assets
WorldEnvironment env = new WorldEnvironment("zone_1_underground");
player.sendPacket(new UpdateEnvironments(env));
```

### Zone-Based Environments
Hytale chunks can have assigned environments (`EnvironmentChunk`).

```java
// Set the environment for a specific chunk column
// This allows biomes to look distinct (fog color, sky color)
chunk.setEnvironment("zone_3_polar"); 
```

## Environment Music
Music is often tied to the environment.

```java
// Force music track
UpdateEnvironmentMusic packet = new UpdateEnvironmentMusic("music.zone1.exploration");
player.sendPacket(packet);
```

## Decals
Visual overlays on blocks (like cracks or moss).

```java
BlockBreakingDecal decal = new BlockBreakingDecal();
decal.setPosition(new BlockPosition(0, 60, 0));
decal.setProgress(5); // 0-9 crack stage
```
