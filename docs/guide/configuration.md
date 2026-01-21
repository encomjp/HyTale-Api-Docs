# Plugin Configuration

Learn how to add configurable settings to your plugin.

## Basic Configuration

### Creating a Config Class

```java
public class PluginConfig {
    private String welcomeMessage = "Welcome to the server!";
    private int teleportDelay = 3;
    private boolean announceJoins = true;
    
    // Getters
    public String getWelcomeMessage() { return welcomeMessage; }
    public int getTeleportDelay() { return teleportDelay; }
    public boolean isAnnounceJoins() { return announceJoins; }
    
    // Setters
    public void setWelcomeMessage(String msg) { welcomeMessage = msg; }
    public void setTeleportDelay(int delay) { teleportDelay = delay; }
    public void setAnnounceJoins(boolean announce) { announceJoins = announce; }
}
```

### Loading Configuration

Load config in `onEnable()`:

```java
public class MyPlugin implements Plugin {
    private PluginContext context;
    private PluginConfig config;
    
    @Override
    public void onEnable(PluginContext context) {
        this.context = context;
        this.config = loadConfig();
        
        context.getLogger().info("Teleport delay: " + config.getTeleportDelay());
    }
    
    private PluginConfig loadConfig() {
        Path configFile = context.getDataFolder().resolve("config.json");
        
        if (Files.exists(configFile)) {
            try {
                String json = Files.readString(configFile);
                return parseConfig(json);
            } catch (IOException e) {
                context.getLogger().error("Failed to load config", e);
            }
        }
        
        // Create default config
        PluginConfig defaultConfig = new PluginConfig();
        saveConfig(defaultConfig);
        return defaultConfig;
    }
}
```

## JSON Configuration

### Config File Format

`config.json`:
```json
{
  "welcomeMessage": "Welcome to our server!",
  "teleportDelay": 5,
  "announceJoins": true,
  "spawn": {
    "x": 0,
    "y": 64,
    "z": 0
  }
}
```

### Parsing JSON

Using a JSON library (like Gson):

```java
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class ConfigManager {
    private final Gson gson = new GsonBuilder()
        .setPrettyPrinting()
        .create();
    
    public PluginConfig load(Path file) throws IOException {
        String json = Files.readString(file);
        return gson.fromJson(json, PluginConfig.class);
    }
    
    public void save(Path file, PluginConfig config) throws IOException {
        String json = gson.toJson(config);
        Files.writeString(file, json);
    }
}
```

## Data Folder

Each plugin has its own data folder:

```java
// Get your plugin's data folder
Path dataFolder = context.getDataFolder();

// Create subfolders
Path warpsFolder = dataFolder.resolve("warps");
Files.createDirectories(warpsFolder);

// Save data files
Path warpFile = warpsFolder.resolve("spawn.json");
Files.writeString(warpFile, warpJson);
```

Data folder location:
```
mods/
├── my-plugin-1.0.0.jar
└── com.example_my-plugin/     <-- Your data folder
    ├── config.json
    └── warps/
        └── spawn.json
```

## Reload Configuration

Allow reloading config without restart:

```java
public class ReloadCommand implements Command {
    private final MyPlugin plugin;
    
    @Override
    public String getName() { return "myreload"; }
    
    @Override
    public void execute(CommandContext context) {
        if (!context.getPlayer().hasPermission("myplugin.admin")) {
            context.getPlayer().sendMessage("No permission!");
            return;
        }
        
        plugin.reloadConfig();
        context.getPlayer().sendMessage("Configuration reloaded!");
    }
}
```

In your main plugin class:

```java
public void reloadConfig() {
    this.config = loadConfig();
    context.getLogger().info("Configuration reloaded");
}
```

## Configuration Validation

Validate settings on load:

```java
private PluginConfig loadConfig() {
    PluginConfig config = loadFromFile();
    
    // Validate and fix invalid values
    if (config.getTeleportDelay() < 0) {
        context.getLogger().warn("Invalid teleport delay, using default");
        config.setTeleportDelay(3);
    }
    
    if (config.getTeleportDelay() > 60) {
        context.getLogger().warn("Teleport delay too high, capping at 60");
        config.setTeleportDelay(60);
    }
    
    return config;
}
```

## Default Config Generation

Generate a default config file with comments:

```java
private void createDefaultConfig(Path configFile) throws IOException {
    String defaultConfig = """
        {
          // Welcome message shown to players on join
          "welcomeMessage": "Welcome to the server!",
          
          // Seconds to wait before teleporting (0 for instant)
          "teleportDelay": 3,
          
          // Announce when players join/leave
          "announceJoins": true
        }
        """;
    
    Files.writeString(configFile, defaultConfig);
}
```

## Nested Configuration

Handle complex nested configs:

```java
public class PluginConfig {
    private GeneralSettings general = new GeneralSettings();
    private TeleportSettings teleport = new TeleportSettings();
    private Map<String, WarpConfig> warps = new HashMap<>();
    
    public static class GeneralSettings {
        public String prefix = "[MyPlugin]";
        public boolean debug = false;
    }
    
    public static class TeleportSettings {
        public int delay = 3;
        public boolean cancelOnMove = true;
        public boolean cancelOnDamage = true;
    }
    
    public static class WarpConfig {
        public double x, y, z;
        public String world;
    }
}
```

JSON format:
```json
{
  "general": {
    "prefix": "[MyPlugin]",
    "debug": false
  },
  "teleport": {
    "delay": 5,
    "cancelOnMove": true,
    "cancelOnDamage": true
  },
  "warps": {
    "spawn": { "x": 0, "y": 64, "z": 0, "world": "overworld" },
    "hub": { "x": 100, "y": 80, "z": -50, "world": "overworld" }
  }
}
```

## Environment Variables

Support environment variable overrides:

```java
private int getTeleportDelay() {
    String envValue = System.getenv("MYPLUGIN_TELEPORT_DELAY");
    if (envValue != null) {
        try {
            return Integer.parseInt(envValue);
        } catch (NumberFormatException e) {
            context.getLogger().warn("Invalid env var MYPLUGIN_TELEPORT_DELAY");
        }
    }
    return config.getTeleportDelay();
}
```
