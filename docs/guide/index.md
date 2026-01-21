# Plugin Development Overview

Hytale plugins are server-side modifications that extend and customize server functionality. Plugins are written in Java or Kotlin and compiled to JAR files.

## Plugin Architecture

Every plugin consists of:

- **Main class** - Implements the `Plugin` interface with lifecycle methods
- **Manifest file** - JSON metadata describing the plugin
- **Event listeners** - React to game events
- **Commands** - Player-executable actions
- **Configuration** - Customizable settings

## Plugin Lifecycle

Plugins go through these lifecycle phases:

| Phase | Method | Description |
|-------|--------|-------------|
| **Load** | - | Server discovers and loads the JAR file |
| **Enable** | `onEnable()` | Plugin is activated, register events/commands |
| **Running** | - | Plugin handles events and commands |
| **Disable** | `onDisable()` | Cleanup before server shutdown |

## Basic Plugin Structure

```java
public class MyPlugin implements Plugin {
    private PluginContext context;
    
    @Override
    public void onEnable(PluginContext context) {
        this.context = context;
        
        // Register event listeners
        context.getEventManager().register(new MyEventListener());
        
        // Register commands
        context.getCommandManager().register(new MyCommand());
        
        context.getLogger().info("Plugin enabled!");
    }
    
    @Override
    public void onDisable() {
        // Cleanup resources
        context.getLogger().info("Plugin disabled!");
    }
}
```

## Project Structure

A typical plugin project looks like this:

```
my-plugin/
├── build.gradle.kts        # Build configuration
├── settings.gradle.kts     # Project settings
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/
│       │       ├── MyPlugin.java           # Main plugin class
│       │       ├── commands/               # Command classes
│       │       │   └── MyCommand.java
│       │       ├── listeners/              # Event listeners
│       │       │   └── PlayerListener.java
│       │       └── config/                 # Configuration
│       │           └── PluginConfig.java
│       └── resources/
│           └── manifest.json               # Plugin metadata
```

## PluginContext API

The `PluginContext` provides access to all server systems:

```java
// Logging
context.getLogger().info("Message");
context.getLogger().warn("Warning");
context.getLogger().error("Error", exception);

// Events
context.getEventManager().register(listener);
context.getEventManager().unregister(listener);

// Commands
context.getCommandManager().register(command);

// Other plugins
context.getPluginManager().getPlugin("other-plugin");
context.getPluginManager().isPluginLoaded("other-plugin");

// Data storage
Path dataFolder = context.getDataFolder();
```

## Best Practices

### Modular Design

Keep your code organized in packages:

```
com.example.myplugin/
├── MyPlugin.java          # Entry point only
├── commands/              # All command classes
├── listeners/             # All event listeners
├── services/              # Business logic
├── config/                # Configuration handling
└── util/                  # Utility classes
```

### Error Handling

Always handle exceptions gracefully:

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    try {
        // Your code here
    } catch (Exception e) {
        context.getLogger().error("Failed to handle player join", e);
    }
}
```

### Resource Cleanup

Clean up resources in `onDisable()`:

```java
@Override
public void onDisable() {
    // Cancel scheduled tasks
    // Close database connections
    // Save pending data
    context.getLogger().info("Plugin disabled cleanly");
}
```

## Next Steps

- [Manifest File](./manifest) - Plugin metadata and dependencies
- [Events & Listeners](./events) - React to game events
- [Commands](./commands) - Create player commands
- [Permissions](./permissions) - Access control
- [Configuration](./configuration) - Plugin settings
