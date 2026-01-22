# Entities Reference

Complete reference for entity types, components, and manipulation in Hytale.

## Entity Categories

Based on `/Server/Entity` structure, entities are organized into:

### Entity Component Categories

- **Damage** - Damage dealing and resistance
- **Effects** - Status effects and buffs/debuffs  
- **GameMode** - Player game mode states
- **HitboxCollision** - Collision detection
- **ModelVFX** - Visual effects on models
- **MovementConfig** - Movement mechanics
- **Repulsion** - Knockback and physics
- **Stats** - Entity attributes (health, speed, etc.)
- **Trails** - Movement trail effects
- **UI** - Entity UI elements (health bars, nameplates)

## Entity Component System (ECS)

Hytale uses an Entity Component System for flexible entity behavior:

```java
// Get entity components
Entity entity = event.getEntity();

// Check if entity has a component
if (entity.hasComponent(HealthComponent.class)) {
    HealthComponent health = entity.getComponent(HealthComponent.class);
    
    // Modify health
    double currentHealth = health.getHealth();
    double maxHealth = health.getMaxHealth();
    
    health.setHealth(currentHealth + 10.0); // Heal 10 HP
}

// Add a component
DamageComponent damage = new DamageComponent();
damage.setBaseDamage(15.0);
entity.addComponent(damage);

// Remove a component
entity.removeComponent(EffectComponent.class);
```

## Common Entity Types

### Players

```java
// Get player entity
Player player = server.getPlayer("PlayerName");

// Player is a special entity type
UUID uuid = player.getUUID();
String name = player.getName();
Location loc = player.getLocation();

// Player-specific methods
player.setGameMode(GameMode.CREATIVE);
player.setFlying(true);
player.setHealth(20.0);
player.setFoodLevel(20);
```

### NPCs

NPCs are defined in `/Server/NPC` (1,449 files) and `/Common/NPC` (5,999 files):

```java
// Spawn an NPC
Location spawnLoc = new Location(world, 100, 64, 200);
NPC npc = world.spawnNPC("hytale:npcs/villager/blacksmith", spawnLoc);

// Set NPC name
npc.setCustomName("Master Blacksmith");
npc.setCustomNameVisible(true);

// Make NPC invulnerable
npc.setInvulnerable(true);

// Set NPC behavior
NPCBehavior behavior = npc.getBehavior();
behavior.setWanderRadius(10); // Wander within 10 blocks
behavior.setLookAtPlayers(true);
```

### Hostile Mobs

```java
// Spawn a hostile mob
Entity mob = world.spawnEntity("hytale:mobs/scarak_fighter", spawnLoc);

// Configure mob stats
if (mob.hasComponent(StatsComponent.class)) {
    StatsComponent stats = mob.getComponent(StatsComponent.class);
    stats.setHealth(50.0);
    stats.setMaxHealth(50.0);
    stats.setMovementSpeed(1.2);
}

// Set target
if (mob instanceof Attackable) {
    Attackable attacker = (Attackable) mob;
    attacker.setTarget(player); // Attack the player
}
```

### Passive Animals

```java
// Spawn a passive animal
Entity animal = world.spawnEntity("hytale:animals/cow", spawnLoc);

// Make animal follow player
if (animal instanceof Tameable) {
    Tameable tameable = (Tameable) animal;
    tameable.setOwner(player);
    tameable.setFollowing(true);
}
```

## Entity Manipulation

### Spawning Entities

```java
// Basic entity spawning
Entity entity = world.spawnEntity("hytale:entity_type", location);

// Spawn with rotation
Entity rotatedEntity = world.spawnEntity("hytale:entity_type", location, yaw, pitch);

// Spawn from prefab
Prefab prefab = PrefabRegistry.getPrefab("hytale:prefabs/custom_boss");
Entity boss = world.spawnPrefab(prefab, location);
```

### Removing Entities

```java
// Remove entity immediately
entity.remove();

// Schedule delayed removal
scheduler.runLater(() -> {
    entity.remove();
}, 100); // Remove after 5 seconds (100 ticks)

// Remove with death animation
if (entity instanceof LivingEntity) {
    LivingEntity living = (LivingEntity) entity;
    living.setHealth(0); // Trigger death
}
```

### Teleporting Entities

```java
// Teleport to location
entity.teleport(targetLocation);

// Teleport to another entity
entity.teleport(otherEntity.getLocation());

// Teleport with rotation
Location destination = new Location(world, x, y, z, yaw, pitch);
entity.teleport(destination);
```

### Entity Metadata

```java
// Set custom metadata (persists across server restarts if saved)
entity.setMetadata("custom_data", "my_value");

// Get metadata
String value = entity.getMetadata("custom_data");

// Remove metadata
entity.removeMetadata("custom_data");

// Check if has metadata
if (entity.hasMetadata("custom_data")) {
    // Process...
}
```

## Entity Events

### EntitySpawnEvent

```java
@EventHandler
public void onEntitySpawn(EntitySpawnEvent event) {
    Entity entity = event.getEntity();
    String entityType = entity.getType();
    Location loc = event.getLocation();
    
    // Block hostile mob spawns in protected areas
    if (isHostileMob(entityType) && isProtected(loc)) {
        event.setCancelled(true);
        return;
    }
    
    // Apply custom modifications to spawned entities
    if (entityType.equals("hytale:mobs/zombie")) {
        // Make zombies stronger at night
        if (isNight(loc.getWorld())) {
            applyNightBuff(entity);
        }
    }
}
```

### EntityDeathEvent

```java
@EventHandler
public void onEntityDeath(EntityDeathEvent event) {
    Entity entity = event.getEntity();
    Player killer = event.getKiller(); // Null if not killed by player
    
    // Drop custom loot
    List<ItemStack> drops = event.getDrops();
    
    if (entity.getType().equals("hytale:mobs/boss")) {
        // Boss killed - drop special loot
        drops.add(new ItemStack("hytale:items/legendary_sword", 1));
        
        // Broadcast to server
        if (killer != null) {
            server.broadcast(killer.getName() + " defeated the boss!");
        }
    }
    
    // Modify experience dropped
    event.setDroppedExp(event.getDroppedExp() * 2); // Double XP
}
```

### EntityDamageEvent

```java
@EventHandler
public void onEntityDamage(EntityDamageEvent event) {
    Entity entity = event.getEntity();
    double damage = event.getDamage();
    DamageCause cause = event.getCause();
    
    // Protect NPCs from player damage
    if (entity instanceof NPC && cause == DamageCause.PLAYER_ATTACK) {
        Player attacker = (Player) event.getDamager();
        
        if (!attacker.hasPermission("admin.damage.npc")) {
            event.setCancelled(true);
            attacker.sendMessage("You cannot attack NPCs!");
        }
    }
    
    // Apply damage modifiers based on entity type
    if (entity.hasMetadata("boss")) {
        // Bosses take reduced damage
        event.setDamage(damage * 0.5);
    }
}
```

### EntityTargetEvent

```java
@EventHandler
public void onEntityTarget(EntityTargetEvent event) {
    Entity entity = event.getEntity();
    Entity target = event.getTarget();
    
    // Prevent hostile mobs from targeting admins
    if (target instanceof Player) {
        Player player = (Player) target;
        
        if (player.hasPermission("admin.notarget")) {
            event.setCancelled(true);
            
            // Find alternative target
            findAlternativeTarget(entity);
        }
    }
    
    // Make guards protect villagers
    if (entity.getType().equals("hytale:npcs/guard")) {
        if (target instanceof NPC && isVillager((NPC) target)) {
            // Don't let guards attack villagers
            event.setCancelled(true);
        }
    }
}
```

## Entity Stats & Components

### Health Component

```java
// Access health component
if (entity.hasComponent(HealthComponent.class)) {
    HealthComponent health = entity.getComponent(HealthComponent.class);
    
    // Get health values
    double current = health.getHealth();
    double max = health.getMaxHealth();
    
    // Modify health
    health.setHealth(max); // Full heal
    health.damage(10.0); // Deal 10 damage
    health.heal(5.0); // Heal 5 HP
    
    // Set max health
    health.setMaxHealth(100.0);
    
    // Check if alive
    if (health.isDead()) {
        entity.remove();
    }
}
```

### Movement Component

```java
// Access movement component
if (entity.hasComponent(MovementComponent.class)) {
    MovementComponent movement = entity.getComponent(MovementComponent.class);
    
    // Get/set movement speed
    double speed = movement.getSpeed();
    movement.setSpeed(speed * 1.5); // 50% faster
    
    // Apply velocity
    Vector velocity = new Vector(0, 1, 0); // Upward
    movement.setVelocity(velocity);
    
    // Disable gravity
    movement.setGravity(false);
    
    // Freeze entity
    movement.setFrozen(true);
}
```

### Effect Component

```java
// Apply status effects
if (entity.hasComponent(EffectComponent.class)) {
    EffectComponent effects = entity.getComponent(EffectComponent.class);
    
    // Apply potion effect
    Effect poison = new Effect(EffectType.POISON, 200, 1); // 10 seconds, level 2
    effects.addEffect(poison);
    
    // Remove effect
    effects.removeEffect(EffectType.POISON);
    
    // Check for effect
    if (effects.hasEffect(EffectType.SPEED)) {
        Effect speed = effects.getEffect(EffectType.SPEED);
        int level = speed.getLevel();
        int duration = speed.getDuration(); // In ticks
    }
    
    // Clear all effects
    effects.clearEffects();
}
```

## Prefabs & Entity Templates

Prefabs are pre-configured entity templates (7,762 prefab files):

```java
// Load a prefab
Prefab bossPrefab = PrefabRegistry.getPrefab("hytale:prefabs/bosses/dragon");

// Spawn entity from prefab
Entity boss = world.spawnPrefab(bossPrefab, spawnLocation);

// Prefabs include:
// - Pre-configured components
// - AI behaviors
// - Loot tables
// - Visual effects
// - Custom mechanics

// Override prefab values
boss.getComponent(HealthComponent.class).setMaxHealth(500.0);
boss.setCustomName("Ancient Dragon");
```

## Entity AI & Behaviors

```java
// Set entity AI goals
if (entity instanceof LivingEntity) {
    LivingEntity living = (LivingEntity) entity;
    AIController ai = living.getAIController();
    
    // Clear existing goals
    ai.clearGoals();
    
    // Add goals in priority order
    ai.addGoal(1, new MeleeAttackGoal(living));
    ai.addGoal(2, new WanderGoal(living, 1.0));
    ai.addGoal(3, new LookAtPlayerGoal(living, 8.0));
    
    // Set targeting
    ai.setTarget(nearestPlayer);
    ai.setAggroRange(16.0); // Aggro within 16 blocks
}
```

## Performance Considerations

### Entity Limits

```java
// Check entity count before spawning
int entityCount = world.getEntities().size();
int maxEntities = 1000; // Configure based on server performance

if (entityCount >= maxEntities) {
    // Don't spawn more entities
    logger.warn("Entity limit reached!");
    return;
}

// Alternatively, count by type
long mobCount = world.getEntities().stream()
    .filter(e -> e instanceof HostileMob)
    .count();
```

### Entity Tracking

```java
// Only track nearby entities for performance
double trackingRange = 32.0; // Track entities within 32 blocks

List<Entity> nearbyEntities = world.getEntities().stream()
    .filter(e -> e.getLocation().distance(player.getLocation()) <= trackingRange)
    .collect(Collectors.toList());

// Process only nearby entities
for (Entity entity : nearbyEntities) {
    updateEntityLogic(entity);
}
```

## Asset Locations

- **Entity Definitions**: `/Server/Entity/` (256 files)
- **NPC Data**: `/Server/NPC/` (1,449 files) + `/Common/NPC/` (5,999 files)
- **Prefabs**: `/Server/Prefabs/` (7,762 files)
- **Character Models**: `/Common/Characters/` (2,653 files)

**Total Entity-Related Files**: ~18,119

---

**Last Updated**: 2026-01-22  
**Source**: Verified from `assets_unpacked` directory and JAR analysis
