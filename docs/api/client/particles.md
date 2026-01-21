# Particles API

Create visual effects using the particle system.

## Verified Classes
- `com.hypixel.hytale.protocol.ParticleSystem`
- `com.hypixel.hytale.protocol.ParticleSpawner`

## Spawning Particles

Particles are client-side visual effects. You can spawn them at a location for all players to see.

```java
// Spawn a simple particle
// Args: ParticleType, x, y, z, count, speed
world.spawnParticle(ParticleType.FLAME, location, 10, 0.1);
```

## Particle Systems

For clearer code, use `ParticleSystem` objects to define properties before spawning.

```java
ParticleSystem effects = new ParticleSystem(ParticleType.EXPLOSION);
effects.setAmount(50);
effects.setSpeed(0.5f);
effects.setOffset(1.0, 1.0, 1.0); // Random spread

// Spawn defined system
effects.spawn(location);
```

## Sounds

Often paired with particles. See [Audio API](./audio).

```java
world.spawnParticle(ParticleType.EXPLOSION, loc, 1, 0);
world.playSound(loc, "entity.generic.explode", 1.0f, 1.0f);
```
