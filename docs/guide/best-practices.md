# Plugin Best Practices

As your plugins grow in complexity, organizing your code becomes critical. Here are industry-standard patterns for Hytale development.

## Project Architecture

Avoid putting everything in your specific `Plugin` class. Instead, use a modular structure:

```
src/main/java/com/example/myplugin/
├── MyPlugin.java           # Entrypoint (Lightweight)
├── commands/               # Command handlers
│   ├── CommandManager.java # Registration logic
│   └── TeleportCommand.java
├── listeners/              # Event listeners
│   └── PlayerListener.java
├── managers/               # Business logic
│   └── EconomyManager.java
└── models/                 # Data objects
    └── PlayerProfile.java
```

### The "Manager" Pattern

Create singletons or context-based managers for specific features.

```java
public class EconomyManager {
    private final PluginContext context;
    private final Map<String, Double> balances = new HashMap<>();

    public EconomyManager(PluginContext context) {
        this.context = context;
    }

    public void addBalance(String player, double amount) {
        balances.merge(player, amount, Double::sum);
    }
}
```

Then initialize them in your main class:

```java
public class MyPlugin implements Plugin {
    private EconomyManager economyManager;

    @Override
    public void onEnable(PluginContext context) {
        this.economyManager = new EconomyManager(context);
        
        // Pass manager to commands
        // registerCommand(new PayCommand(economyManager));
    }
}
```

## Performance Tips

### 1. Avoid Heavy Tasks on Main Thread
The Hytale server runs on a main loop. If you block it (e.g., database calls, web requests), the server will lag.

**Bad:**
```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Blocks the server until database responds!
    PlayerData data = database.load(event.getPlayer().getUid());
}
```

**Good:**
```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Run asynchronously
    context.getScheduler().runAsync(() -> {
        PlayerData data = database.load(event.getPlayer().getUid());
        
        // Return to main thread to apply changes
        context.getScheduler().runTask(() -> {
            applyData(event.getPlayer(), data);
        });
    });
}
```

### 2. Caching
Don't fetch data from disk or database every time. Cache it in memory (`HashMap`) and save it periodically or on server shutdown.

## Resource Management

Always clean up resources in `onDisable()`:

- Cancel running tasks
- Close database connections
- Save pending data

```java
@Override
public void onDisable() {
    // Save all data before stopping
    if (this.economyManager != null) {
        this.economyManager.saveAll();
    }
    
    context.getLogger().info("Plugin disabled safely.");
}
```
