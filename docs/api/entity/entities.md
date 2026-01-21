# Entities API

Manage living entities, monsters, and detailed visual components.

This API handles "traditional" entity interaction. For low-level data access, see the [Components API](./components).

## Verified Classes
- `com.hypixel.hytale.protocol.EntityEffect`
- `com.hypixel.hytale.protocol.EntityUIComponent`
- `com.hypixel.hytale.server.core.entity.damage.DamageEntityInteraction`

## Damage Handling

Intercept and modify damage using the event system.

```java
@EventHandler
public void onDamage(DamageEntityInteraction event) {
    // 1. Get components
    double damage = event.getDamage();
    Entity victim = event.getEntity();
    
    // 2. Modify damage (e.g. Critical Hit)
    if (damage > 100) {
        event.getPlayer().sendMessage("§cCritical Hit!");
        // Multiply damage
        event.setDamage(damage * 1.5);
    }
    
    // 3. Cancel specific causes
    if (event.getCause() == DamageCause.FALL && victim.hasPermission("nofall")) {
        event.setCancelled(true);
    }
}
```

## Floating UI (Combat Text)

Hytale supports attaching client-side UI elements to entities. This is notably used for damage numbers ("-50 HP") or status indicators.

**Verified Class**: `CombatTextEntityUIComponent`

> [!NOTE]
> These components are visual-only and primarily managed by the client or synced from server for visual flair.

```java
// Hypothetical usage for a damage indicator
EntityUIComponent text = new EntityUIComponent("Damage: 999");
text.setAnimation(CombatTextEntityUIAnimationEventType.BOUNCE);

// Attach to entity (visible to all tracking players)
entity.addUI(text);
```

## Status Effects

Apply potion-like effects (Poison, Regeneration, Speed). See [Effects API](./effects) for more.

```java
// Create effect: POISON for 5 seconds (100 ticks)
EntityEffect poison = new EntityEffect(EntityEffectType.POISON);
poison.setDuration(100); 
poison.setAmplifier(1); // Level 2 (0-indexed)

entity.addEffect(poison);
```

## Spawning Entities

See the [World API](./world) or [Prefabs API](./prefabs) for spawning logic.

```java
// Quick example
world.spawnEntity(EntityType.CREEPER, location);
```
