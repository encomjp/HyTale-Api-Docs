# Component API (ECS)

Interact with the Entity Component System (ECS) to manipulate entity data directly.

## Understanding ECS

Hytale uses an **Entity Component System (ECS)** architecture. Unlike traditional Object-Oriented Programming (where a `Zombie` extends `Monster` extends `Entity`), ECS uses composition:

1.  **Entity**: Just a unique ID (integer/UUID). It is a "container".
2.  **Component**: A data object holding state (e.g., `Position`, `Health`, `Name`).
3.  **System**: Logic that runs on entities with specific components (e.g., `PhysicsSystem` moves entities that have `Position` and `Velocity` components).

In this API, you primarily interact with **Components** attached to **Entities**.

## Verified Classes
- `com.hypixel.hytale.server.core.modules.entity.component.TransformComponent`
- `com.hypixel.hytale.server.core.entity.knockback.KnockbackComponent`
- `com.hypixel.hytale.server.core.modules.entity.player.PlayerSkinComponent`
- `com.hypixel.hytale.server.core.modules.entity.DespawnComponent`

## Accessing Components

You can check for and retrieve components from any `Entity`.

### Get a Component
Retrieves the component if it exists. Returns `null` (or throws, check specific methods) if missing.

```java
// Get the Transform (Position/Rotation/Scale)
TransformComponent transform = entity.getComponent(TransformComponent.class);

if (transform != null) {
    Vector3d position = transform.getPosition();
}
```

### Check for Component
Check if an entity has a specific capability.

```java
if (entity.hasComponent(KnockbackComponent.class)) {
    // This entity is capable of taking knockback
    entity.getComponent(KnockbackComponent.class).applyKnockback(1.0, 0.5);
}
```

## Common Components

### TransformComponent
The most fundamental component. Holds the entity's physical presence in the world.

```java
TransformComponent transform = entity.getComponent(TransformComponent.class);

// Teleport/Move
transform.setPosition(new Vector3d(0, 100, 0));

// Rotate
transform.setRotation(new Quaternion(...)); 

// Resize
transform.setScale(new Vector3d(2.0, 2.0, 2.0)); // Giant entity!
```

### KnockbackComponent
Controls how the entity reacts to physical blows.

```java
KnockbackComponent kb = entity.getComponent(KnockbackComponent.class);
// Manually apply a shove
kb.applyKnockback(0.5, 0.2);
```

### PlayerSkinComponent
Holds the skin data for players.

```java
PlayerSkinComponent skin = player.getComponent(PlayerSkinComponent.class);
// Modify skin properties dynamically
```

### DespawnComponent
Controls logic for when the entity should be removed from the world.

```java
DespawnComponent despawn = entity.getComponent(DespawnComponent.class);

// Make entity persistent (never despawn naturally)
despawn.setPersistent(true); 

// Or change despawn range
despawn.setDespawnDistance(128);
```

### DisplayNameComponent
Controls the nametag above the entity.

```java
DisplayNameComponent name = entity.getComponent(DisplayNameComponent.class);
name.setName("§cBoss Entity");
name.setVisible(true);
```

## Dynamic Composition

The power of ECS is that you can add behavioral components to entities that don't normally have them.

```java
// Give a Zombie the ability to fly? 
// (Hypothetical - requires specific component existence)
zombie.addComponent(new FlightComponent()); 

// Remove the ability to move?
zombie.removeComponent(MovementComponent.class);
```

## Best Practices

> [!TIP]
> **Prefer Components over Casting**: Instead of checking `if (entity instanceof Zombie)`, check `if (entity.hasComponent(ZombieAIComponent.class))`. This makes your code work on *any* entity that shares that behavior, not just the specific class.
