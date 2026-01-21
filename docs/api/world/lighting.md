# Lighting API

Control the dynamic lighting engine and apply visual light sources.

## Concept
Hytale's engine supports **Dynamic Colored Lighting**. Unlike Minecraft's block-light system (0-15 white light), Hytale lights have:
- **Color** (RGB)
- **Intensity** (Brightness)
- **Attachment** (Can follow entities)

## Verified Classes
- `com.hypixel.hytale.protocol.ColorLight`
- `com.hypixel.hytale.server.core.modules.entity.component.DynamicLight`
- `com.hypixel.hytale.server.core.universe.world.lighting.LightingCommand`

## Dynamic Entitiy Lights
You can attach a light source to any entity (Player, Mob, Arrow).

### Creating a Light Component
```java
// 1. Define the light properties
// Red: 255, Green: 100, Blue: 0 (Orange Fire)
// Intensity: 15 (Max brightness)
ColorLight fireLight = new ColorLight(255, 100, 0, 15);

// 2. Wrap it in a Component
DynamicLight component = new DynamicLight(fireLight);

// 3. Attach to the entity
// Valid for any entity type (Player, Cow, Zombie, Arrow)
player.addComponent(component);
```

### Use Cases
- **Miners Helmet**: Attach a white light to the player.
- **Flaming Arrow**: Attach an orange light to projectiles.
- **Magic Spell**: Attach purple light to a particle effect entity.

### Persistent Lighting
By default, some components might not save. Use `PersistentDynamicLight` if you want the light to remain on the entity after chunk unloads or server restarts.

## Debugging Lighting
Hytale provides built-in commands to diagnose lighting glitches (black chunks, shadows).

| Command | Description |
| :--- | :--- |
| `/lighting info` | Shows light levels and sources at your cursor. |
| `/lighting invalidate` | Forces the engine to recalculate lighting for the current chunk. Fixes "black void" glitches. |
| `/lighting global <val>` | Sets the global ambient light level (0.0 - 1.0). Good for testing "night" vision. |
