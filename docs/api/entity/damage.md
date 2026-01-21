# Damage API

Handle damage calculations, sources, and effects.

## Verified Classes
- `com.hypixel.hytale.protocol.DamageCause`
- `com.hypixel.hytale.protocol.DamageEntityInteraction`
- `com.hypixel.hytale.server.core.modules.entity.damage.Damage`

## Dealing Damage

### Simple Damage
Does "Generic" damage.

```java
player.damage(5.0); // 2.5 hearts
```

### Attributed Damage
Damage with a specific cause and source (useful for death messages: "Player was shot by Skeleton").

```java
Damage damage = new Damage(10.0);
damage.setCause(DamageCause.PROJECTILE);
damage.setSource(new Damage.EntitySource(skeletonEntity));

player.damage(damage);
```

## Damage Events

Intercept incoming damage to modify it.

```java
@EventHandler
public void onDamage(DamageEntityInteraction event) {
    Entity victim = event.getEntity();
    DamageCause cause = event.getCause();
    
    // 1. Damage Reduction: Armor
    // (Handled automatically by Hytale, but you can override)
    
    // 2. Custom immunity
    if (cause == DamageCause.FIRE && victim.hasComponent(FireResistComponent.class)) {
        event.setCancelled(true);
        return;
    }
    
    // 3. Modifier: Double damage
    event.setDamage(event.getDamage() * 2.0);
}
```

## Damage Causes
Verified Enum `DamageCause`:
- `ATTACK`: Melee combat.
- `PROJECTILE`: Arrows, thrown tridents.
- `FALL`: Gravity.
- `FIRE`: Fire blocks.
- `LAVA`: Swimming in lava.
- `DROWNING`: Out of air.
- `VOID`: Falling below y = -64.
- `COMMAND`: `/kill`.

## Visual Effects
Hytale handles red flashes automatically. For extra flair:

```java
// Add camera shake on heavy hit
if (event.getDamage() > 10) {
    player.sendPacket(new CameraShakeEffect(0.5f, 10));
}
```
