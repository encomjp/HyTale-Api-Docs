# Configuration

Hard-coding values is bad. If you want to change a message or a setting, you shouldn't have to recompile your entire plugin!

That's where **configuration** comes in.

## How it Works

We use **JSON** files for configuration.

1. **config.json** stores the settings
2. **Config.java** represents those settings in code
3. **start()** loads the file into the Java object

---

## 1. The Configuration File

Create a file `config.json` in your plugin's data folder:

```json
{
  "welcomeMessage": "Welcome to the server!",
  "teleportDelay": 5
}
```

---

## 2. The Config Class

Create a Java class that matches your JSON structure.

```java
public class MyConfig {
    public String welcomeMessage = "Default welcome message";
    public int teleportDelay = 3;
}
```

---

## 3. Loading the Config

Use **GSON** to read the file.

```java
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.nio.file.Files;
import java.nio.file.Path;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;

public class MyPlugin extends JavaPlugin {
    private MyConfig config;
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public MyPlugin(JavaPluginInit init) {
        super(init);
    }
    
    @Override
    public void start() {
        // Load the config
        reloadConfig();
        
        System.out.println("Teleport delay is: " + config.teleportDelay);
    }
    
    public void reloadConfig() {
        // Assume getGameDirectory() or similar exists to find mods folder
        // Or use init.getGameDirectory() if available in constructor
        Path configFile = Path.of("mods/my-plugin/config.json");
        
        try {
            if (!Files.exists(configFile)) {
                // Save default
                // Ensure parent dirs exist
                Files.createDirectories(configFile.getParent());
                Files.writeString(configFile, gson.toJson(new MyConfig()));
            }
            
            String json = Files.readString(configFile);
            this.config = gson.fromJson(json, MyConfig.class);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

::: tip Finding the Data Folder
Your plugin likely has access to its specific data folder via the `JavaPluginInit` object passed to the constructor.
:::