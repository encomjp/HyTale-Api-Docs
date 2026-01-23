# Your First Plugin

In this tutorial, you'll create a simple "Hello World" plugin that responds when players join the server. By the end, you'll understand the basic structure of a Hytale plugin.

::: info Time Required
About 10-15 minutes if you have your development environment ready.
:::

## Quick Start Template

Here is the full code for `HelloWorldPlugin.java`. Just replace the package name!

[**Download HelloWorld.jar**](/downloads/HelloWorld.jar)

```java
package com.example;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.HytaleServer;
import com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent;
import com.hypixel.hytale.server.core.Message;

public class HelloWorldPlugin extends JavaPlugin {
    
    public HelloWorldPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    public void start() {
        System.out.println("Plugin Enabled!");
        
        // Register an event listener for player connections
        HytaleServer.get().getEventBus().register(
            // Note: EventPriority and registration method signatures 
            // may vary based on exact server version. 
            // This is a conceptual example of the functional style.
            PlayerConnectEvent.class,
            event -> {
                String playerName = event.getPlayer().getDisplayName();
                event.getPlayer().sendMessage(Message.raw("Welcome, " + playerName + "!"));
            }
        );
    }

    @Override
    public void stop() {
        System.out.println("Plugin Disabled!");
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
├── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── HelloWorldPlugin.java
        └── resources/
            └── manifest.json
```

## Step 2: Configure Gradle

If you haven't initialized Gradle yet, run `gradle init` (select "Java Application", "Kotlin DSL", "JUnit Jupiter") or manually create these files. You'll need JDK 25 or newer installed.

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
        // Hytale requires Java 25 or higher
        languageVersion.set(JavaLanguageVersion.of(25))
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

The `manifest.json` tells the server about your plugin. Place this in `src/main/resources/manifest.json`.

**Note:** Ensure you use the correct capitalization for fields!

```json
{
  "Group": "com.example",
  "Name": "hello-world",
  "Version": "1.0.0",
  "Main": "com.example.HelloWorldPlugin",
  "Description": "A simple hello world plugin"
}
```

## Step 4: Write the Plugin Code

Create `src/main/java/com/example/HelloWorldPlugin.java`. Refer to the Quick Start Template above for the code.

## Understanding the Code (Beginner's Guide)

### 1. Packages and Imports
```java
package com.example;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
```
- **`package`**: Think of this as the "folder" where your code lives. It helps organize your files and prevents naming conflicts.
- **`import`**: Tells Java: "I want to use a tool that isn't in this file."

### 2. The Class Definition
```java
public class HelloWorldPlugin extends JavaPlugin {
```
- **`extends JavaPlugin`**: This tells Hytale that this class is a plugin that should be loaded.

### 3. Constructor
```java
public HelloWorldPlugin(JavaPluginInit init) {
    super(init);
}
```
- **Constructor**: Needed to initialize the plugin correctly with the server.

### 4. Lifecycle Methods
```java
@Override
public void start() {
```
- **Method**: Instructions for "What to do when the plugin starts." (Sometimes called `onEnable` in other APIs, but Hytale uses `start`).

### 5. Messaging
```java
event.getPlayer().sendMessage(Message.raw("Welcome!"));
```
- **`Message.raw`**: The correct way to create text messages in Hytale.

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
[INFO] [PluginManager] - com.example:hello-world from path HelloWorld.jar
[INFO] Plugin Enabled!
```

4. Join the server and you should see your welcome message!

::: tip Congratulations!
You've built your first Hytale plugin! Continue to learn about [Commands](/guide/commands) and [Events](/guide/events).
:::

## Helpful Resources

### Hytale Specific
- **Decompiled HytaleServer.jar** - The source of truth for API classes

::: warning Verified Code
The code in this tutorial is based on the structure found in `HytaleServer.jar`.
**Always check `HytaleServer.jar` directly** if you encounter "Class Not Found" errors.
:::

## Next Steps

Now that you have a working plugin, explore these topics:

- [Manifest File](/guide/manifest) - Learn all manifest options
- [Events & Listeners](/guide/events) - Handle more game events
- [Commands](/guide/commands) - Add custom player commands
- [Permissions](/guide/permissions) - Control access to features