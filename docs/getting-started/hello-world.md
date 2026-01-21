# Hello World Plugin

Now that your [project is set up](/getting-started/project-setup), let's write a simple plugin that welcomes players when they join.

## The Main Plugin Class

Create `MyPlugin.java` in `src/main/java/com/yourname/myplugin/`:

```java
package com.yourname.myplugin;

import hytale.server.plugin.Plugin;
import hytale.server.plugin.PluginContext;
import hytale.server.event.EventHandler;
import hytale.server.event.player.PlayerJoinEvent;

public class MyPlugin implements Plugin {
    
    private PluginContext context;
    
    @Override
    public void onEnable(PluginContext context) {
        this.context = context;
        context.getLogger().info("Hello World plugin enabled!");
        
        // Register this class as an event listener
        context.getEventManager().register(this);
    }
    
    @Override
    public void onDisable() {
        context.getLogger().info("Hello World plugin disabled!");
    }
    
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        String playerName = event.getPlayer().getName();
        event.getPlayer().sendMessage("Welcome to the server, " + playerName + "!");
        context.getLogger().info(playerName + " joined the server");
    }
}
```

## Understanding the Code

### Plugin Interface

Every plugin must implement the `Plugin` interface:

```java
public class MyPlugin implements Plugin {
```

### Lifecycle Methods

| Method | When It's Called |
|--------|------------------|
| `onEnable(PluginContext)` | When the plugin is loaded and enabled |
| `onDisable()` | When the plugin is disabled or server shuts down |

### PluginContext

The `PluginContext` gives you access to:

- **Logger**: `context.getLogger()` - for console output
- **Event Manager**: `context.getEventManager()` - for registering listeners
- **Server**: `context.getServer()` - for server operations
- **Config**: `context.getConfig()` - for plugin configuration

### Event Handling

The `@EventHandler` annotation marks methods that respond to events:

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    // This runs when a player joins
}
```

## Building the Plugin

Run the build command from your project root:

```bash
# Gradle
./gradlew build

# Maven
mvn package
```

## Installing the Plugin

Copy the JAR to your server's `mods` folder:

```bash
# Gradle output location
cp build/libs/my-plugin.jar "D:/HyTale Server/Server/mods/"

# Or use the deploy task (if configured)
./gradlew deploy
```

## Testing

1. Start (or restart) your Hytale server
2. Watch the console for: `Hello World plugin enabled!`
3. Join the server
4. You should see: `Welcome to the server, YourName!`

### Expected Console Output

```
[INFO] Loading plugin: my-plugin v1.0.0
[INFO] Hello World plugin enabled!
[INFO] YourName joined the server
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Plugin not loading | Check `manifest.json` is in the JAR root |
| ClassNotFoundException | Verify `entrypoint` matches your class path |
| No welcome message | Ensure `context.getEventManager().register(this)` is called |
| Build fails | Check Java version is 21+ |

## Adding More Features

### Multiple Events

You can handle multiple events in the same class:

```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
    event.getPlayer().sendMessage("Welcome!");
}

@EventHandler
public void onPlayerLeave(PlayerLeaveEvent event) {
    context.getLogger().info(event.getPlayer().getName() + " left");
}
```

### Separate Listener Classes

For larger plugins, use separate listener classes:

```java
// In MyPlugin.java onEnable():
context.getEventManager().register(new JoinListener(context));

// JoinListener.java
public class JoinListener {
    private final PluginContext context;
    
    public JoinListener(PluginContext context) {
        this.context = context;
    }
    
    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        // Handle join
    }
}
```

## Next Steps

- [Debugging](/getting-started/debugging) - Learn to troubleshoot issues
- [Commands Guide](/guide/commands) - Add custom commands
- [Events Guide](/guide/events) - Deep dive into the event system
- [Events Reference](/reference/events) - List of all available events
