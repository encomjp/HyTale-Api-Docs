# Audio API

Play sounds, music, and ambient noise.

## Verified Classes
- `com.hypixel.hytale.protocol.SoundEvent`
- `com.hypixel.hytale.server.core.universe.world.SoundUtil`

## Playing Sounds

### 2D Sounds (Global/UI)
These sounds have no location. They play "inside the player's head". Good for UI interaction, level-ups, or global announcements.

```java
// volume: 0.0 - 1.0
// pitch: 0.5 - 2.0 (speed/frequency)
SoundUtil.play2D(player, "ui.click", 1.0f, 1.0f);
```

### 3D Sounds (Positional)
These sounds come from a specific location. The client calculates volume based on distance (attenuation).

```java
Location loc = player.getLocation();

// Play a zombie groan at the player's feet
SoundUtil.play3D(world, loc, "entity.zombie.groan", 1.0f, 0.8f);
```

## Sound Categories
Categorizing sounds allows players to adjust volume sliders (Music vs SFX) in their settings.
- `MASTER`: Global volume.
- `MUSIC`: BGM.
- `BLOCK`: Breaking/Placing noises.
- `HOSTILE`: Monster sounds.
- `PLAYER`: Footsteps, etc.

## Custom Sounds (Resource Packs)

You can play sounds defined in your plugin's assets.

1. Define in `sounds.json`.
2. Use the Resource Location string.

```java
// "my_mod:epic_horn" corresponds to the JSON definition
player.playSound("my_mod:epic_horn", 1.0f, 1.0f);
```
