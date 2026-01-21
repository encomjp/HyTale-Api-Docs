# Physics API

Interact with Hytale's physics engine: Velocity, Collision, and Raycasting.

## Verified Classes
- `com.hypixel.hytale.protocol.PhysicsType`
- `com.hypixel.hytale.server.core.blocktype.component.BlockPhysics`

## Entity Physics

### Velocity
Velocity is the speed and direction an entity is moving (Vector3d).

```java
// Jump: Add Y velocity
player.setVelocity(player.getVelocity().add(0, 0.5, 0));

// Dash: Multiply current horizontal velocity
Vector3d dash = player.getLocation().getDirection().mul(2.0);
player.setVelocity(dash);
```

### Knockback
Knockback is a specific force application usually handled by damage, but can be manual.

```java
// Calculate direction away from explosion center
Vector3d blastDir = victim.getLocation().sub(explosionSrc).normalize();
victim.setVelocity(blastDir.mul(1.5));
```

## Raycasting (Line of Sight)

"Raycasting" fires an invisible line to see what it hits. Essential for guns, magic wands, or checking line-of-sight.

```java
// Raycast 50 blocks forward from eyes
RaycastResult result = world.raycast(
    player.getEyeLocation(), 
    player.getDirection(), 
    50.0,
    PhysicsType.STATIC // Only hit blocks, ignore entities for now
);

if (result.isHit()) {
    Block hitBlock = result.getBlock();
    // Spawn particle at hit location
    world.spawnParticle(ParticleType.SMOKE, result.getHitPosition(), 1, 0);
}
```

## Physics Types
- `STATIC`: Fixed objects (Terrain).
- `DYNAMIC`: Moving objects (Players, Mobs).
- `ETHEREAL`: Non-collidable (Triggers, Ghosts).
