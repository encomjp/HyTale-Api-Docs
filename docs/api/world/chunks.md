# Chunks API

Manage world data segments for optimization and bulk editing.

## Concepts
A **Chunk** is a 16x256x16 (WxHxD) column of blocks. The world is divided into chunks.
- **Loading**: When chunks are "loaded", they are in memory and active.
- **Unloading**: When players leave, chunks unload to save RAM.

## Verified Classes
- `com.hypixel.hytale.server.core.universe.world.accessor.ChunkAccessor`
- `com.hypixel.hytale.server.core.modules.entity.player.ChunkTracker`

## Chunk Access

```java
// Convert block coords to chunk coords (Bit shift >> 4 is equivalent to / 16)
int chunkX = blockX >> 4;
int chunkZ = blockZ >> 4;

World world = player.getWorld();

// Get the chunk object
ChunkAccessor chunk = world.getChunk(chunkX, chunkZ);
```

## Performance: Bulk Operations

> [!TIP]
> **Use Chunks for Large Edits**: When filling a 100x100 area, using `world.setBlock` triggers 10,000 lighting updates. Modifying the chunk directly is faster.

```java
public void fillChunk(ChunkAccessor chunk, BlockType type) {
    // Iterate local chunk coords (0-15)
    for (int x = 0; x < 16; x++) {
        for (int z = 0; z < 16; z++) {
            for (int y = 0; y < 256; y++) {
                // Set block without triggering immediate world updates
                chunk.setBlockAt(x, y, z, type);
            }
        }
    }
    // Remind server to resend this chunk to clients
    chunk.markDirty(); 
}
```

## Chunk Tracking

See which chunks a player can see.

```java
ChunkTracker tracker = player.getChunkTracker();

// Is this chunk visible to the player?
if (tracker.isVisible(chunkX, chunkZ)) {
    // Send particles or updates
}
```
