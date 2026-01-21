# Blocks API

Manipulate the world with the Blocks API.

This API allows you to get, set, and modify blocks in the world. For large-scale changes, consider using the [Chunks API](./chunks) or [World API](./world) bulk methods to avoid lighting/physics lag.

## Verified Classes
- `com.hypixel.hytale.protocol.BlockType` (Enum of all blocks)
- `com.hypixel.hytale.protocol.BlockPosition` (Integer coordinates)
- `com.hypixel.hytale.protocol.BlockBreaking` (Event)

## Common Operations

### Getting a Block
Retrieve the type of block at a specific location.

```java
World world = context.getServer().getWorld("overworld");

// BlockPosition uses integers (x, y, z)
BlockPosition pos = new BlockPosition(0, 64, 0);

// Returns the BlockType (e.g., STONE, AIR)
BlockType block = world.getBlock(pos);
```

### Setting a Block
Change the block type at a location.

```java
// Set the block at 0, 64, 0 to STONE
// This triggers physics updates and lighting recalculation
world.setBlock(pos, BlockType.STONE);
```

> [!WARNING]
> **Performance Note**: Setting thousands of blocks with `setBlock` one-by-one can lag the server.

### Block Data
Some blocks have extra state data (properties), such as:
- Doors (Open/Closed)
- Logs (Axis X/Y/Z)
- Crops (Growth stage)

```java
// Get the current state data
BlockData data = world.getBlockData(pos);

// Check if it has an "open" property
if (data.contains("open")) {
    // Open the door
    data.set("open", true);
    
    // Apply changes back to the world
    world.setBlockData(pos, data);
}
```

## Block Events

### BlockBreaking
*Verified Class: `com.hypixel.hytale.protocol.BlockBreaking`*

This event fires when a player *starts* or *continues* breaking a block, not just when it breaks. 

```java
@EventHandler
public void onBlockInteract(BlockBreaking event) {
    // 'stage' might represent cracking animation (0-9)
    int stage = event.getStage();
    
    // Example: Make obsidian harder to break by cancelling progress
    if (event.getBlock().getType() == BlockType.OBSIDIAN) {
        // Custom logic to slow down breaking
    }
}
```
