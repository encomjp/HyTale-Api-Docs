# Configuration

Hard-coding values is bad. If you want to change a message or a setting, you shouldn't have to recompile your entire plugin!

That's where **configuration** comes in. It lets server owners tweak your plugin without touching code.

## How it Works

We use **JSON** files for configuration. It's a simple text format that both humans and computers can read.

1. **config.json** stores the settings
2. **Config.java** represents those settings in code
3. **onEnable()** loads the file into the Java object

---

## 1. The Configuration File

Let's say we want to configure a welcome message and a teleport delay. Create a file `config.json` in your plugin's data folder:

```json
{
  "welcomeMessage": "Welcome to the server!",
  "teleportDelay": 5,
  "enableFeatures": true
}
```

---

## 2. The Config Class

Now create a Java class that looks just like your JSON. The field names must match exactly!

```java
public class MyConfig {
    // Default values (used if file is missing)
    public String welcomeMessage = "Default welcome message";
    public int teleportDelay = 3;
    public boolean enableFeatures = true;
}
```

::: tip Why public fields?
For simple config classes, `public` fields are fine. GSON (the library we use) can read them easily. If you prefer encapsulation, you can use private fields with getters/setters.
:::

---

## 3. Loading the Config

We need a way to read the file and turn it into our `MyConfig` object. We'll use **GSON**, a library built into Hytale/Java.

Add this helper method to your plugin class (or a separate `ConfigManager` class):

```java
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.nio.file.Files;
import java.nio.file.Path;

public class MyPlugin implements Plugin {
    private MyConfig config;
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    @Override
    public void onEnable(PluginContext context) {
        // Load the config
        reloadConfig(context);
        
        // Use it!
        context.getLogger().info("Teleport delay is: " + config.teleportDelay);
    }
    
    public void reloadConfig(PluginContext context) {
        Path configFile = context.getDataFolder().resolve("config.json");
        
        try {
            // Check if file exists
            if (!Files.exists(configFile)) {
                // If not, create default
                saveConfig(context, new MyConfig());
            }
            
            // Read file
            String json = Files.readString(configFile);
            this.config = gson.fromJson(json, MyConfig.class);
            
        } catch (Exception e) {
            context.getLogger().error("Failed to load config!", e);
        }
    }
    
    public void saveConfig(PluginContext context, MyConfig newConfig) {
        Path configFile = context.getDataFolder().resolve("config.json");
        
        try {
            // Create folder if missing
            Files.createDirectories(context.getDataFolder());
            
            // Write JSON
            String json = gson.toJson(newConfig);
            Files.writeString(configFile, json);
            this.config = newConfig;
            
        } catch (Exception e) {
            context.getLogger().error("Failed to save config!", e);
        }
    }
}
```

---

## Using Configuration in Your Code

Now that `config` is loaded, you can use it anywhere!

### In Event Listeners

Pass the config to your listener:

```java
public class PlayerListener {
    private final MyConfig config;
    
    public PlayerListener(MyConfig config) {
        this.config = config;
    }
    
    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        // Use the configured message
        String msg = config.welcomeMessage;
        event.getPlayer().sendMessage(Message.raw(msg));
    }
}
```

### In Commands

Same for commands:

```java
public class TeleportCommand implements Command {
    private final MyConfig config;
    // ...
    
    @Override
    public void execute(CommandContext ctx) {
        int delay = config.teleportDelay;
        ctx.getPlayer().sendMessage("Teleporting in " + delay + " seconds...");
    }
}
```

---

## Advanced: Reloading Without Restart

Server admins hate restarting. Let's add a `/myplugin reload` command!

```java
public class ReloadCommand implements Command {
    private final MyPlugin plugin;
    
    public ReloadCommand(MyPlugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public String getName() { return "mypluginreload"; }

    @Override
    public void execute(CommandContext ctx) {
        if (!ctx.getPlayer().hasPermission("myplugin.admin")) return;
        
        // Reload!
        plugin.reloadConfig(ctx.getPluginContext());
        ctx.getPlayer().sendMessage("Configuration reloaded!");
    }
}
```

Because we update the `plugin.config` field, anything referencing it will see the new values next time they check!

---

## Complex Configurations

JSON can do more than just simple values. You can nest objects!

### Nested JSON

```json
{
  "database": {
    "host": "localhost",
    "port": 3306
  },
  "messages": {
    "welcome": "Hello!",
    "goodbye": "Bye!"
  }
}
```

### Matching Java Classes

```java
public class MyConfig {
    public DatabaseConfig database = new DatabaseConfig();
    public MessagesConfig messages = new MessagesConfig();
    
    public static class DatabaseConfig {
        public String host = "localhost";
        public int port = 3306;
    }
    
    public static class MessagesConfig {
        public String welcome = "Hello!";
        public String goodbye = "Bye!";
    }
}
```

Access it like this: `config.database.host` or `config.messages.welcome`.

---

## Tips & Best Practices

1. **Default Values:** Always set good defaults in your Java class. If the file is empty or missing fields, GSON will use your defaults.
2. **Validation:** Check values after loading. If `teleportDelay` is -1, maybe set it back to 0.
3. **Wait, where is the file?** 
   It's in `server/mods/com.yourname.plugin/config.json`.
   The `context.getDataFolder()` method automatically finds the right folder for your plugin ID.

---

## Next Steps

Now you have configured your plugin. Next, let's look at how to make things happen **over time**:

→ **Next: [Scheduling Tasks](./scheduling)**
