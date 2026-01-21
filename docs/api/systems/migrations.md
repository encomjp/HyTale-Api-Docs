# Migrations API

Handle data versioning and legacy content upgrades.

## Verified Classes
- `com.hypixel.hytale.server.core.modules.migrations.MigrationModule`
- `com.hypixel.hytale.server.core.modules.migrations.Migration`

## Data Versioning
As your plugin (or the game) evolves, data formats change. The Migration API helps upgrade old data.

### Chunk Migration
Automatically upgrade chunks when loaded.

```java
public class MyBlockMigration extends Migration {
    @Override
    public void migrate(ChunkData data) {
        if (data.getVersion() < 2) {
            // Replace old ID 'test:foo' with 'test:bar'
            data.replaceBlock("test:foo", "test:bar");
        }
    }
}
```

### Entity Migration
Upgrade entity data (e.g., renaming components).

```java
// System handles upgrading legacy UUIDs or components
entityModule.registerMigration(new EntityMigration(1, 2) {
    public void upgrade(EntityData entity) {
        // logic
    }
});
```
