# Blocks Reference

Complete reference for block types, categories, and manipulation in Hytale.

## Block Categories

Blocks are organized into the following categories in `Common/Blocks`:

### Natural Blocks
- **Stone** - Stone blocks, ores, minerals
- **Foliage** - Plants, grass, flowers, leaves
- **Farming** - Agricultural blocks and farmland

### Crafted & Functional
- **Benches** - Crafting stations, workbenches
- **Tinkering** - Mechanical and redstone-like blocks
- **Structures** - Pre-built structure components

### Decorative
- **Decorative_Sets** - Themed decoration collections
- **Miscellaneous** - Uncategorized decorative blocks
- **Icons** - Special display blocks

### Special
- **Dungeons** - Dungeon-specific blocks
- **Hypixel** - Hypixel-branded blocks
- **Animations** - Animated block states
- **_Debug** - Development and testing blocks

## Block Naming Convention

Blocks follow the format: `hytale:blocks/<category>/<block_id>`

### Examples
```
hytale:blocks/stone/granite
hytale:blocks/foliage/oak_leaves
hytale:blocks/benches/crafting_table
hytale:blocks/decorative_sets/lantern
```

## Block Manipulation API

### Getting a Block

```java
// Get block at specific location
World world = player.getWorld();
Location loc = new Location(world, 100, 64, 200);
Block block = world.getBlockAt(loc);

// Get block type
BlockType type = block.getType();
String blockId = type.getId(); // Returns "hytale:blocks/stone/granite"
```

### Setting a Block

```java
// Set block at location
BlockType newType = BlockRegistry.getType("hytale:blocks/stone/granite");
world.setBlockAt(loc, newType);

// Alternative: Set block with data
BlockData data = newType.createBlockData();
world.setBlockAt(loc, data);
```

### Block Properties

```java
// Check if block is solid
boolean isSolid = block.isSolid();

// Check if block can be broken
boolean isBreakable = block.isBreakable();

// Get block hardness (mining difficulty)
float hardness = block.getHardness();

// Check if block emits light
int lightLevel = block.getLightLevel(); // 0-15
```

### Bulk Block Operations

```java
// Fill a region with blocks
// WARNING: Can be performance-intensive for large areas
public void fillRegion(World world, Location corner1, Location corner2, BlockType type) {
    int minX = Math.min(corner1.getBlockX(), corner2.getBlockX());
    int minY = Math.min(corner1.getBlockY(), corner2.getBlockY());
    int minZ = Math.min(corner1.getBlockZ(), corner2.getBlockZ());
    
    int maxX = Math.max(corner1.getBlockX(), corner2.getBlockX());
    int maxY = Math.max(corner1.getBlockY(), corner2.getBlockY());
    int maxZ = Math.max(corner1.getBlockZ(), corner2.getBlockZ());
    
    // Iterate through all blocks in the region
    for (int x = minX; x <= maxX; x++) {
        for (int y = minY; y <= maxY; y++) {
            for (int z = minZ; z <= maxZ; z++) {
                Location loc = new Location(world, x, y, z);
                world.setBlockAt(loc, type);
            }
        }
    }
}
```

## Block Events

### BlockBreakEvent

Fired when a block is broken:

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    // Get the player who broke the block
    Player player = event.getPlayer();
    
    // Get the block that was broken
    Block block = event.getBlock();
    BlockType type = block.getType();
    
    // Get the location
    Location loc = block.getLocation();
    
    // Cancel the event to prevent the block from breaking
    if (type.getId().equals("hytale:blocks/dungeons/portal")) {
        event.setCancelled(true);
        player.sendMessage("You cannot break portal blocks!");
    }
    
    // Modify drops (if supported)
    // event.setDrops(customDrops);
}
```

### BlockPlaceEvent

Fired when a block is placed:

```java
@EventHandler
public void onBlockPlace(BlockPlaceEvent event) {
    Player player = event.getPlayer();
    Block block = event.getBlock();
    Location loc = block.getLocation();
    
    // Check if player can build here
    if (!canBuildAt(loc)) {
        event.setCancelled(true);
        player.sendMessage("You cannot build in this area!");
        return;
    }
    
    // Log block placement
    logBlockChange(player, "place", block.getType(), loc);
}
```

## Block Data & States

### Block Variants

Some blocks have multiple states (e.g., doors open/closed, crops growth stages):

```java
// Get current block data
BlockData data = block.getBlockData();

// Modify block state (example: door)
if (data instanceof DoorData) {
    DoorData doorData = (DoorData) data;
    
    // Check if door is open
    boolean isOpen = doorData.isOpen();
    
    // Toggle door state
    doorData.setOpen(!isOpen);
    
    // Apply the changes
    block.setBlockData(doorData);
}
```

### Farming Blocks

```java
// Check crop growth stage
if (data instanceof CropData) {
    CropData cropData = (CropData) data;
    
    // Get current growth stage (0 = planted, max = fully grown)
    int stage = cropData.getGrowthStage();
    int maxStage = cropData.getMaxGrowthStage();
    
    // Check if fully grown
    if (stage >= maxStage) {
        player.sendMessage("This crop is ready to harvest!");
    }
    
    // Manually advance growth (for testing/admin commands)
    cropData.setGrowthStage(maxStage);
    block.setBlockData(cropData);
}
```

## Performance Considerations

### Chunk Loading

Blocks can only be accessed in loaded chunks:

```java
// Check if chunk is loaded before accessing blocks
Chunk chunk = world.getChunkAt(loc);
if (!chunk.isLoaded()) {
    // Load the chunk first
    chunk.load();
}

// Now safe to access blocks
Block block = world.getBlockAt(loc);
```

### Batch Operations

For large-scale block changes, use batch operations:

```java
// Start a batched operation (if supported)
// This groups multiple block changes into a single update
world.startBatchUpdate();

try {
    // Make all your block changes
    for (Location loc : locations) {
        world.setBlockAt(loc, newType);
    }
} finally {
    // Always complete the batch, even if an error occurs
    world.completeBatchUpdate();
}
```

### Async Block Changes

Never modify blocks from async tasks:

```java
// ❌ WRONG - This will cause issues!
scheduler.runAsync(() -> {
    world.setBlockAt(loc, type); // DON'T DO THIS!
});

// ✅ CORRECT - Schedule sync task
scheduler.runAsync(() -> {
    // Do async work (e.g., calculations, database queries)
    BlockType calculatedType = calculateBlockType();
    
    // Schedule block change on main thread
    scheduler.runSync(() -> {
        world.setBlockAt(loc, calculatedType);
    });
});
```

## Common Block IDs

### Stone Types
```
hytale:blocks/stone/stone
hytale:blocks/stone/granite
hytale:blocks/stone/limestone
hytale:blocks/stone/slate
hytale:blocks/stone/marble
```

### Foliage
```
hytale:blocks/foliage/grass
hytale:blocks/foliage/oak_leaves
hytale:blocks/foliage/birch_leaves
hytale:blocks/foliage/flowers/daisy
hytale:blocks/foliage/mushroom
```

### Benches (Crafting Stations)
```
hytale:blocks/benches/crafting_table
hytale:blocks/benches/furnace
hytale:blocks/benches/anvil
hytale:blocks/benches/enchanting_table
```

## Asset Location

Block assets are found in:
- **Definitions**: `/Server/World/Blocks/`
- **Models**: `/Common/Blocks/`
- **Textures**: `/Common/BlockTextures/`

Total block-related files: ~2,971 (2,293 definitions + 678 textures)

---

**Last Updated**: 2026-01-22  
**Source**: Verified from `assets_unpacked` directory
