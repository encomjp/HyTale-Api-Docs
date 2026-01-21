# Teleportation API

Safety move players and entities across dimensions.

## Verified Classes
- `com.hypixel.hytale.server.core.modules.entity.teleport.Teleport`
- `com.hypixel.hytale.server.core.modules.entity.teleport.PendingTeleport`

## Basic Teleportation

### Teleport to Location
Instant movement.

```java
// Create destination
Location dest = new Location(world, 100, 64, 200);

// Use .5 to center player on the block
dest.setX(100.5); 
dest.setZ(200.5);

player.teleport(dest);
```

### Cross-Dimension
Teleporting to another world works exactly the same.

```java
World nether = server.getWorld("nether");
Location portal = new Location(nether, 0, 50, 0);

player.teleport(portal);
```

## Safety Checks

Before teleporting, you might want to ensure the target is safe (not inside a wall, not in lava).

```java
public boolean isSafe(Location loc) {
    Block feet = loc.getWorld().getBlockAt(loc.toBlockPosition());
    Block head = loc.getWorld().getBlockAt(loc.toBlockPosition().up());
    Block ground = loc.getWorld().getBlockAt(loc.toBlockPosition().down());
    
    // Simple check: Feet and Head are Air, Ground is Solid
    return feet.isAir() && head.isAir() && ground.isSolid();
}
```

## Pending Teleports (Async)

Sometimes teleportation needs to wait for the destination chunk to load.

```java
// Request teleport
PendingTeleport req = teleportService.teleport(player, dest);

// Check result
if (req.getResult() == PendingTeleport.Result.SUCCESS) {
    // Moved immediately
} else {
    // Pending... loading chunks
    player.sendMessage("Loading world...");
}
```

## World Map
Teleport to predefined "Map Markers" set in the Hytale World Editor.

```java
// Jump to "spawn_point_1"
TeleportToWorldMapMarker.teleport(player, "spawn_point_1");
```
