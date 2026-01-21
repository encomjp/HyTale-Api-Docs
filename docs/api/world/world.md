# World API

Manage dimensions, manipulate blocks, and control the environment.

The `World` interface represents a dimension (like Overworld, Nether, etc.) and provides access to its blocks, entities, and environment settings.

## Verified Classes
- `com.hypixel.hytale.server.core.universe.world.World`
- `com.hypixel.hytale.server.core.universe.world.Location`
- `com.hypixel.hytale.server.core.universe.world.BlockPosition`
- `com.hypixel.hytale.protocol.BlockType`

## World Interface

```java
public interface World {
    // Identity
    String getName();               // e.g. "world" or "lobby"
    
    // Blocks
    // Note: getBlockAt returns a snapshot/copy
    Block getBlockAt(int x, int y, int z);
    Block getBlockAt(BlockPosition position);
    void setBlockAt(int x, int y, int z, BlockType type);
    
    // Players & Entities
    Collection<Player> getPlayers(); // Online players in this world
    Collection<Entity> getEntities(); // All loaded entities
    Entity spawnEntity(EntityType type, Location location);
    
    // Environment
    long getTime();                 // World time in ticks (0-24000)
    void setTime(long time);
    Weather getWeather();
    void setWeather(Weather weather);
}
```

## Getting Worlds

```java
// Get the main default world (usually "world")
World world = context.getServer().getDefaultWorld();

// Get a specific world by name
World nether = context.getServer().getWorld("nether");
if (nether == null) {
    // World is not loaded or doesn't exist
}

// Get the world a player is currently in
World playerWorld = player.getWorld();
```

## Blocks

### Single Block Access
Use `setBlockAt` for small changes. For large areas, see **Region Operations** or the [Chunks API](./chunks).

```java
// Get block info
Block block = world.getBlockAt(100, 64, 200);
if (block.getType() == BlockType.DIAMOND_ORE) {
    // Found diamond!
}

// Change a block
world.setBlockAt(100, 64, 200, BlockType.STONE);
```

### BlockPosition Helper
`BlockPosition` is an immutable utility class for coordinate math.

```java
BlockPosition pos = new BlockPosition(100, 64, 200);

// Relative positions (returns NEW instances)
BlockPosition above = pos.up();      // (100, 65, 200)
BlockPosition east = pos.east();     // (101, 64, 200)

world.setBlockAt(above, BlockType.TORCH);
```

### Location vs BlockPosition
- **Location**: Use for entities/teleporting. Has decimals (double x, y, z) + Rotation (yaw, pitch).
- **BlockPosition**: Use for blocks. Integers only (int x, y, z).

```java
Location loc = player.getLocation();
BlockPosition groundPos = loc.toBlockPosition().down();
```

## Environment Management

### Time Cycle
The world time is measured in ticks (20 ticks = 1 second). A full day is 24000 ticks (20 minutes).

- `0`: Dawn / Sunrise
- `1000`: Day start
- `6000`: Noon
- `13000`: Dusk / Sunset
- `18000`: Midnight

```java
// Set to Noon
world.setTime(6000);

// Advances time is handled automatically by the server unless game rules prevent it
```

### Weather
Simple enum-based weather control.

```java
// Make it rain
world.setWeather(Weather.RAIN);

// Clear skies
world.setWeather(Weather.CLEAR);
```

## Entities
Access entities currently loaded in the world.

```java
// Count zombies
long zombieCount = world.getEntities().stream()
    .filter(e -> e.getType() == EntityType.ZOMBIE)
    .count();

// Spawn a new entity
Entity pig = world.spawnEntity(EntityType.PIG, player.getLocation());
```

## Region Operations & Performance

> [!WARNING]
> **Performance Tip**: When modifying many blocks (e.g., >1000), interacting directly with `World` can be slow because it updates physics and lighting for every single block. 
> 
> For massive edits, use the **[Chunks API](./chunks)** or batch your updates.

### Fill Area Example
*Educational example - for large fills, consider async processing.*

```java
public void fillArea(World world, BlockPosition min, BlockPosition max, BlockType type) {
    for (int x = min.getX(); x <= max.getX(); x++) {
        for (int y = min.getY(); y <= max.getY(); y++) {
            for (int z = min.getZ(); z <= max.getZ(); z++) {
                // Check if skipping air to save performance
                world.setBlockAt(x, y, z, type);
            }
        }
    }
}
```

## Example: Time Command

A command to control world time easily.

```java
public class TimeCommand implements Command {
    @Override
    public String getName() { return "time"; }
    
    @Override
    public void execute(CommandContext ctx) {
        String[] args = ctx.getArgs();
        World world = ctx.getPlayer().getWorld();
        
        if (args.length == 0) {
            ctx.getPlayer().sendMessage("Current Time: " + world.getTime());
            return;
        }
        
        switch (args[0].toLowerCase()) {
            case "day":
                world.setTime(1000);
                ctx.getPlayer().sendMessage("Time set to Day (1000)");
                break;
            case "noon":
                world.setTime(6000);
                ctx.getPlayer().sendMessage("Time set to Noon (6000)");
                break;
            case "night":
                world.setTime(13000);
                ctx.getPlayer().sendMessage("Time set to Night (13000)");
                break;
            default:
                ctx.getPlayer().sendMessage("Usage: /time <day|noon|night>");
        }
    }
}
```
