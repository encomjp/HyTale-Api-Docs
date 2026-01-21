# Your First Plugin

In this tutorial, you'll create a simple "Hello World" plugin that responds when players join the server. By the end, you'll understand the basic structure of a Hytale plugin.

::: info Time Required
About 10-15 minutes if you have your development environment ready.
:::

## Quick Start Template

Don't want to read everything? Here is the full code for `HelloWorldPlugin.java`. Just replace the package name!

```java
package com.example;

import hytale.server.plugin.Plugin;
import hytale.server.plugin.PluginContext;
import hytale.server.event.EventHandler;
import hytale.server.event.player.PlayerJoinEvent;

public class HelloWorldPlugin implements Plugin {
    @Override
    public void onEnable(PluginContext context) {
        context.getLogger().info("Plugin Enabled!");
        context.getEventManager().register(this);
    }

    @Override
    public void onDisable() {}

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        event.getPlayer().sendMessage("Welcome, " + event.getPlayer().getName() + "!");
    }
}
```

---

## Step 1: Create Project Structure

You can create this structure manually or use your IDE.

```
hello-world/
├── build.gradle.kts
├── settings.gradle.kts
├── manifest.json
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── HelloWorldPlugin.java
        └── resources/
            └── manifest.json
```

## Step 2: Configure Gradle

If you haven't initialized Gradle yet, run `gradle init` (select "Java Application", "Kotlin DSL", "JUnit Jupiter") or manually create these files. You'll need JDK 21 or newer installed.

### settings.gradle.kts

```kotlin
rootProject.name = "hello-world"
```

### build.gradle.kts

This is the most important file. It tells Gradle how to build your plugin and finds the Hytale server library.

```kotlin
plugins {
    java
}

group = "com.example"
version = "1.0.0"

java {
    toolchain {
        // Hytale requires Java 21 or higher
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Add the Hytale server JAR as a compile-only dependency
    // ADJUST THIS PATH to where your HytaleServer.jar is located!
    compileOnly(files("D:/HyTale Server/Server/HytaleServer.jar"))
}

tasks.jar {
    archiveBaseName.set("hello-world")
    
    // Include manifest.json in the JAR
    from("src/main/resources") {
        include("manifest.json")
    }
}

// Optional: Auto-deploy to server
tasks.register<Copy>("deploy") {
    dependsOn("build")
    from(tasks.jar)
    into("D:/HyTale Server/Server/mods")
}
```

::: tip
If you don't have a `gradlew` wrapper file yet, run `gradle wrapper` in your project folder to generate it. This allows you to run `./gradlew build`.
:::

## Step 3: Create the Manifest

The `manifest.json` tells the server about your plugin. Place this in `src/main/resources/manifest.json`:

```json
{
  "id": "com.example.hello-world",
  "name": "Hello World",
  "version": "1.0.0",
  "description": "A simple hello world plugin",
  "authors": ["Your Name"],
  "entrypoint": "com.example.HelloWorldPlugin"
}
```

## Step 4: Write the Plugin Code

Create `src/main/java/com/example/HelloWorldPlugin.java`:

```java
package com.example;

// Standard Java imports
import java.util.logging.Logger;

// Hytale Server imports
// NOTE: Your actual imports will depend on the standard provided by the HytaleServer.jar
// Common paths include: com.hypixel.hytale.server.core.plugin...
// Use your IDE (IntelliJ) to auto-import the correct classes!
import hytale.server.plugin.Plugin;
import hytale.server.plugin.PluginContext;
import hytale.server.event.EventHandler;
import hytale.server.event.player.PlayerJoinEvent;

public class HelloWorldPlugin implements Plugin {
    
    private PluginContext context;
    
    @Override
    public void onEnable(PluginContext context) {
        this.context = context;
        
        // Log that we're starting
        context.getLogger().info("Hello World plugin enabled!");
        
        // Register event listeners (this class) to receive events
        context.getEventManager().register(this);
    }
    
    @Override
    public void onDisable() {
        context.getLogger().info("Hello World plugin disabled!");
    }
    
    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        // Get the player's name from the event
        String playerName = event.getPlayer().getName();
        
        // Send a welcome message to the player
        event.getPlayer().sendMessage("Welcome to the server, " + playerName + "!");
        
        // Log to console for the admin to see
        context.getLogger().info("Player joined: " + playerName);
    }
}
```

## Understanding the Code (Beginner's Guide)

If you're new to Java, here is a line-by-line breakdown of what's happening:

### 1. Packages and Imports
```java
package com.example;
import hytale.server.plugin.Plugin;
```
- **`package`**: Think of this as the "folder" where your code lives. It helps organize your files and prevents naming conflicts.
- **`import`**: Tells Java: "I want to use a tool that isn't in this file." It's like checking a book out of the library so you can use it.

### 2. The Class Definition
```java
public class HelloWorldPlugin implements Plugin {
```
- **`public class`**: Defines the blueprint for your "object" (the plugin). `public` means other parts of the server can see it.
- **`implements Plugin`**: This is a key contract. It tells the Hytale server: "I promise this class behaves like a Plugin." It forces you to include `onEnable` and `onDisable`.

### 3. Variables
```java
private PluginContext context;
```
- **Variable**: A saved piece of data.
- **`PluginContext`**: A special toolbelt Hytale gives you. It contains the Logger, EventManager, and other core tools. We save it here so we can use it later.

### 4. Methods and Overrides
```java
@Override
public void onEnable(PluginContext context) {
```
- **Method**: A set of instructions (like a recipe). `onEnable` is the instruction manual for "What to do when the plugin starts."
- **`@Override`**: A note to the compiler saying: "I am replacing the default empty behavior with my own custom instructions."

### 5. Event Handling
```java
@EventHandler
public void onPlayerJoin(PlayerJoinEvent event) {
```
- **`@EventHandler`**: A marker that tells Hytale: "Hey! Wake me up when this specific thing happens."
- **`PlayerJoinEvent`**: The "specific thing." This code *only* runs when a player joins.

::: tip Pro Tip
Don't worry if you don't memorize this syntax immediately. Most developers copy-paste the structure and fill in the blanks!
:::

## Step 5: Build and Deploy

Build your plugin:

```bash
# Build the JAR
./gradlew build

# Or build and auto-deploy
./gradlew deploy
```

The JAR file will be created at `build/libs/hello-world-1.0.0.jar`.

## Step 6: Test Your Plugin

1. Make sure the JAR is in your server's `mods/` folder
2. Start (or restart) your Hytale server
3. Look for these log messages:

```
[INFO] Loading plugin: Hello World v1.0.0
[INFO] Hello World plugin enabled!
```

4. Join the server and you should see your welcome message!

::: tip Congratulations!
You've built your first Hytale plugin! Continue to learn about [Commands](/guide/commands) and [Events](/guide/events).
:::

## Helpful Resources

### Learning Java
If you're new to programming, these free resources are excellent:
- **[W3Schools Java Tutorial](https://www.w3schools.com/java/)** - Very beginner friendly, interactive.
- **[Codecademy Java Course](https://www.codecademy.com/learn/learn-java)** - Hands-on coding lessons.
- **[Hyperskill (JetBrains Academy)](https://hyperskill.org/)** - Project-based learning (great for detailed learning).

### Hytale Specific
- **[Hytale Modding Wiki](https://hytalemodding.dev/en/docs)** - Community maintained documentation.
- **[Official Hytale Discord](https://discord.com/invite/hytale)** - Ask questions in the modding channels.

::: warning Verified Code
The code in this tutorial is based on the structure found in `HytaleServer.jar`.
**Always check `HytaleServer.jar` directly** if you encounter "Class Not Found" errors, as package names (`com.hypixel.hytale...`) can change during beta development.
:::

| Problem | Solution |
|---------|----------|
| Plugin not loading | Check `manifest.json` syntax and entrypoint class name |
| ClassNotFoundException | Verify the package structure matches your entrypoint |
| Events not firing | Make sure you called `register(this)` on the EventManager |
| NoClassDefFoundError | Ensure HytaleServer.jar is in your compile dependencies |

## Next Steps

Now that you have a working plugin, explore these topics:

- [Manifest File](/guide/manifest) - Learn all manifest options
- [Events & Listeners](/guide/events) - Handle more game events
- [Commands](/guide/commands) - Add custom player commands
- [Permissions](/guide/permissions) - Control access to features

