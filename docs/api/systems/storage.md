# Storage API

Persist data for worlds, players, and plugins.

## Verified Classes
- `com.hypixel.hytale.server.core.universe.world.commands.world.WorldSaveCommand`
- `com.hypixel.hytale.server.core.universe.world.events.ecs.ChunkSaveEvent`

## World and Chunk Saving

Hytale handles world saving automatically (Auto-Save).

### Force Save
Manually trigger a save (e.g., before shutdown or after big edits).

```java
world.save();
sender.sendMessage("World saved.");
```

### Chunk Persistence
If you need to store custom data in chunks (like "This chunk is claimed by Faction A"), listen for save events.

```java
@EventHandler
public void onChunkSave(ChunkSaveEvent event) {
    ChunkAccessor chunk = event.getChunk();
    // Serialize your custom data to a file or DB associated with chunk X,Z
}
```

## Player Data

Player inventory/EnderChest/Stats are saved by the server. 

### Custom Data (Databases)
For plugin data (Money, Skills), **do not** rely on NBT tags on the player entity, as they may not persist cleanly. Use a Database or JSON file.

#### JSON Example
1.  On Join: Load `players/uuid.json` to memory.
2.  On Quit: Save memory to `players/uuid.json`.

```java
// Simple JSON load
File file = new File(getDataFolder(), "players/" + uuid + ".json");
if (file.exists()) {
    PlayerData data = gson.fromJson(new FileReader(file), PlayerData.class);
}
```
