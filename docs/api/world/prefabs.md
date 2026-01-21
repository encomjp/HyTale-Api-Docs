# Prefabs & Entities

API reference for spawning and managing entities using prefabs.

## What Are Prefabs?

Prefabs are pre-defined templates for spawning entities in the world. They define the entity's model, behavior, and properties.

## Spawning Entities

### Basic Spawn

```java
Location spawnLoc = new Location(world, 100, 64, 200);
Entity entity = world.spawnEntity(EntityType.ZOMBIE, spawnLoc);
```

### Using PrefabUtil

```java
// Paste a prefab at a location
PrefabUtil.paste("prefabs/creatures/zombie", location);

// Paste with rotation
PrefabUtil.paste("prefabs/structures/house", location, rotation);
```

## Finding Prefabs

List available prefabs by exploring the Assets.zip:

```
prefabs/
├── creatures/
│   ├── zombie
│   ├── skeleton
│   └── spider
├── structures/
│   └── house
└── items/
    └── sword
```

### Programmatic Discovery

```java
// Log available prefabs (for debugging)
List<String> prefabs = PrefabUtil.listPrefabs();
for (String prefab : prefabs) {
    context.getLogger().info("Found prefab: " + prefab);
}
```

## Entity Interface

```java
public interface Entity {
    // Identity
    UUID getUUID();
    EntityType getType();
    
    // Location
    Location getLocation();
    World getWorld();
    void teleport(Location location);
    
    // State
    boolean isAlive();
    void remove();
    
    // Health (for living entities)
    double getHealth();
    void setHealth(double health);
    void damage(double amount);
}
```

## Entity Types

Common entity types:

| Type | Description |
|------|-------------|
| `ZOMBIE` | Hostile zombie |
| `SKELETON` | Hostile skeleton |
| `SPIDER` | Hostile spider |
| `CHICKEN` | Passive chicken |
| `COW` | Passive cow |
| `PIG` | Passive pig |
| `ITEM` | Dropped item |
| `ARROW` | Projectile |

## Entity Management

### Get All Entities

```java
Collection<Entity> entities = world.getEntities();

// Filter by type
List<Entity> zombies = entities.stream()
    .filter(e -> e.getType() == EntityType.ZOMBIE)
    .collect(Collectors.toList());
```

### Get Nearby Entities

```java
public List<Entity> getNearbyEntities(Location center, double radius) {
    return world.getEntities().stream()
        .filter(e -> e.getLocation().distance(center) <= radius)
        .collect(Collectors.toList());
}
```

### Remove Entities

```java
// Remove single entity
entity.remove();

// Remove all zombies
for (Entity entity : world.getEntities()) {
    if (entity.getType() == EntityType.ZOMBIE) {
        entity.remove();
    }
}
```

## Spawning Custom Entities

### With Properties

```java
public Entity spawnCustomZombie(Location loc) {
    Entity zombie = world.spawnEntity(EntityType.ZOMBIE, loc);
    
    // Set properties
    zombie.setHealth(40.0);  // Double health
    
    // Add custom metadata
    zombie.setMetadata("custom", true);
    
    return zombie;
}
```

## Spawner Patterns

### Wave Spawner

```java
public class WaveSpawner {
    private final PluginContext context;
    private final Location spawnPoint;
    private int waveNumber = 0;
    
    public void startWave() {
        waveNumber++;
        int mobCount = waveNumber * 5;
        
        for (int i = 0; i < mobCount; i++) {
            Location loc = getRandomSpawnLocation();
            spawnMob(loc);
        }
    }
    
    private void spawnMob(Location loc) {
        EntityType type = (waveNumber > 3) 
            ? EntityType.SKELETON 
            : EntityType.ZOMBIE;
        
        Entity mob = loc.getWorld().spawnEntity(type, loc);
        
        // Scale health with wave
        double health = 20 + (waveNumber * 5);
        mob.setHealth(health);
    }
    
    private Location getRandomSpawnLocation() {
        double angle = Math.random() * 2 * Math.PI;
        double radius = 10 + (Math.random() * 10);
        
        double x = spawnPoint.getX() + (Math.cos(angle) * radius);
        double z = spawnPoint.getZ() + (Math.sin(angle) * radius);
        
        return new Location(spawnPoint.getWorld(), x, spawnPoint.getY(), z);
    }
}
```

### Arena Mob Limit

```java
public class ArenaManager {
    private static final int MAX_MOBS = 50;
    private final Location center;
    private final double radius;
    
    public boolean canSpawnMob() {
        long mobCount = center.getWorld().getEntities().stream()
            .filter(e -> isHostile(e))
            .filter(e -> e.getLocation().distance(center) <= radius)
            .count();
        
        return mobCount < MAX_MOBS;
    }
    
    private boolean isHostile(Entity entity) {
        return entity.getType() == EntityType.ZOMBIE ||
               entity.getType() == EntityType.SKELETON ||
               entity.getType() == EntityType.SPIDER;
    }
}
```

## Prefab Best Practices

1. **Cache prefab paths** - Look up once, reuse

2. **Validate before spawning** - Check prefab exists

3. **Limit spawn rates** - Prevent server overload

4. **Clean up entities** - Remove when no longer needed

5. **Use entity metadata** - Track custom entities

```java
// Tag custom entities for later cleanup
entity.setMetadata("plugin_spawned", true);

// Clean up on disable
@Override
public void onDisable() {
    for (Entity entity : world.getEntities()) {
        if (entity.hasMetadata("plugin_spawned")) {
            entity.remove();
        }
    }
}
```
