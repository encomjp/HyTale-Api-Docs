# Fluids API

Manage liquid interactions, custom fluid states, and visual effects (FX).

## Verified Classes
- `com.hypixel.hytale.protocol.Fluid`
- `com.hypixel.hytale.server.core.asset.type.fluid.FluidTicker`
- `com.hypixel.hytale.protocol.FluidFX`

## Understanding Fluids
In Hytale, fluids are not just "blocks". They are a dynamic layer on top of the block grid. A block can be "Waterlogged" (contain fluid) or be entirely fluid.
Fluids use a **Ticker** system to simulate flow, pressure, and viscosity.

## Interacting with Fluids

### Placing Fluid
You can set a block to be a fluid.

```java
// Basic: Set a block to static water
// This resets flow data to default
world.setBlock(pos, BlockType.WATER);
```

### Advanced Fluid Control
To control the *level* or *state* of the fluid, use `setFluid`.

```java
// Set water with a specific height level (0-8)
// Level 8 = Full source block
// Level 1 = Shallow puddle
world.setFluid(pos, FluidType.WATER, 4);

// This is useful for:
// - Creating "flood" minigames
// - Draining areas slowly
```

## Fluid FX (Visuals)
You can trigger client-side fluid effects without actually changing the blocks. This is great for magic spells or environmental ambience.

```java
FluidFX fx = new FluidFX();

// The particle to spew (Bubbles, Splashes)
fx.setParticle(ParticleType.BUBBLE);

// The sound to play
fx.setSound("entity.player.swim");

// Trigger the effect for a specific player
// Useful when a player walks into a custom "poison pool"
player.sendPacket(new UpdateFluidFX(fx));
```

## Custom Fluids
Fluids are defined in the `assets/fluids.json` file of your mod/resource pack.
You can define:
- **Viscosity**: How fast it flows.
- **Density**: Does it float items?
- **Damage**: Does it burn (Lava)?

> [!TIP]
> **Performance**: Fluid updates can be expensive. Avoid setting thousands of fluid blocks in a single tick. Use `world.setFluids` (bulk) if available or spread the updates over time.
