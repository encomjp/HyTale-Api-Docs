# Projectiles API

Manage custom projectiles, arrows, and throwables.

## Verified Classes
- `com.hypixel.hytale.server.core.modules.projectile.ProjectileModule`
- `com.hypixel.hytale.protocol.DamageCause`

## Spawning Projectiles
You can spawn any entity as a projectile.

```java
// 1. Get location (Eye height of player)
Location launchLoc = player.getEyeLocation();

// 2. Spawn the entity
Projectile arrow = (Projectile) world.spawnEntity(EntityType.ARROW, launchLoc);

// 3. Set velocity (Speed and Direction)
// 'mul(3.0)' determines speed. Normal bow shot is ~3.0.
Vector3d dir = player.getDirection().mul(3.0);
arrow.setVelocity(dir);

// 4. Set Shooter
// This ensures that if the arrow kills someone, the player gets credit (and not just "Death by Arrow")
arrow.setShooter(player); 
```

## Handling Impacts
Listen for when a projectile hits a block or entity.

```java
@EventHandler
public void onProjectileHit(ProjectileHitEvent event) {
    Projectile proj = event.getProjectile();
    
    // Check if it's our custom snowball
    if (proj.getType() == EntityType.SNOWBALL) {
        
        // Impact Logic
        Location impactPos = event.getHitPosition();
        
        // Spawn particle
        world.spawnParticle(ParticleType.EXPLOSION, impactPos, 1, 0);
        
        // Deal Area of Effect damage?
        if (event.getHitEntity() != null) {
            event.getHitEntity().damage(5.0);
        }
    }
}
```

> [!WARNING]
> **Hit Detection**: Projectile hit detection is complex. If you modify velocity *after* spawn manually, ensure you update the server's tracking, otherwise the client might see the arrow lag behind.
