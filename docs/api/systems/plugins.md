# Plugin System API

The Hytale server uses a robust plugin system centered around `JavaPlugin`.

## Core Class: JavaPlugin

Every plugin must extend `com.hypixel.hytale.server.core.plugin.JavaPlugin`.

### Verified Structure

```java
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;

public class MyPlugin extends JavaPlugin {

    public MyPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    public void start() {
        // Initialization logic here
        // Register commands, events, etc.
    }

    @Override
    public void onDisable() {
        // Cleanup logic here
    }
}
```

## Lifecycle Methods

| Method | Description | Verified |
|--------|-------------|----------|
| `start()` | Called when the plugin is enabled. Use this instead of `onEnable`. | [VERIFIED] |
| `onDisable()` | Called when the plugin is disabled or server stops. | [VERIFIED] |

## Accessing Server Instance

The `HytaleServer` singleton provides access to core managers.

```java
import com.hypixel.hytale.server.core.HytaleServer;

HytaleServer server = HytaleServer.get();
server.getCommandManager();
server.getEventBus();
```

## Manifest

The `manifest.json` file is required in `src/main/resources`.

```json
{
  "Group": "com.example",
  "Name": "my-plugin",
  "Version": "1.0.0",
  "Main": "com.example.MyPlugin"
}
```
