# World Gen API (Schemas)

Interact with world generation and structures (Schemas).

## Verified Classes
- `com.hypixel.hytale.server.core.asset.GenerateSchemaEvent`
- `com.hypixel.hytale.protocol.packets.asseteditor.SchemaFile`
- `com.hypixel.hytale.server.core.command.commands.world.worldgen.WorldGenCommand`

## Schemas (Structures)
In Hytale, structures are often referred to as **Schemas**.

### Generating Schemas
You can trigger schema generation programmatically.

```java
public void pasteSchema(World world, Location loc, String schemaName) {
    // Basic conceptual usage
    SchemaFile schema = assets.getSchema(schemaName); 
    // Hytale's internal worldgen would handle placement
}
```

### Listening to Generation
Intercept when the world generator places a schema.

```java
@EventHandler
public void onGenerate(GenerateSchemaEvent event) {
    String name = event.getSchemaName();
    BlockPosition pos = event.getPosition();
    
    if (name.equals("dungeon_entrance")) {
        logger.info("Dungeon generated at " + pos);
        // Maybe spawn a boss guardian?
    }
}
```

## World Generation Commands
Server owners can use commands to debug generation.
- `/worldgen`: Main command for generation tools.
- `/worldgen reload`: Reload generation configs hot.
- `/worldgen benchmark`: Test generation performance.
