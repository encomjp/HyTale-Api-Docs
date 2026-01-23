# Project Setup

Before writing your first plugin, you need to set up a proper Java project with a build tool. This guide covers both **Gradle** (recommended) and **Maven**.

## Prerequisites

- [Java 25+ installed](/getting-started/server-setup-windows)
- An IDE ([VS Code](/getting-started/ide-vscode) or [IntelliJ](/getting-started/ide-intellij))
- Access to `HytaleServer.jar` (from your server installation)

## Option 1: Gradle (Recommended)

Gradle is the preferred build tool for Hytale plugins due to its flexibility and Kotlin DSL support.

### Create Project Structure

Create a folder for your plugin and set up this structure:

```
my-plugin/
├── build.gradle.kts
├── settings.gradle.kts
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── yourname/
        │           └── myplugin/
        │               └── MyPlugin.java
        └── resources/
            └── manifest.json
```

### settings.gradle.kts

```kotlin
rootProject.name = "my-plugin"
```

### build.gradle.kts

```kotlin
plugins {
    java
}

group = "com.yourname"
version = "1.0.0"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(25))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Point to your local HytaleServer.jar
    compileOnly(files("D:/HyTale Server/Server/HytaleServer.jar"))
}

tasks.jar {
    archiveBaseName.set("my-plugin")
    
    from("src/main/resources") {
        include("manifest.json")
    }
}

// Auto-deploy to server mods folder
tasks.register<Copy>("deploy") {
    dependsOn("build")
    from(tasks.jar)
    into("D:/HyTale Server/Server/mods")
}
```

::: warning Adjust Paths
Update the paths to match your actual `HytaleServer.jar` and server `mods` folder locations.
:::

### Initialize Gradle Wrapper

If you don't have Gradle installed globally, you can generate the wrapper:

```bash
gradle wrapper
```

This creates `gradlew` (Linux/Mac) and `gradlew.bat` (Windows) scripts.

### Build Commands

```bash
# Build the plugin
./gradlew build

# Build and deploy to server
./gradlew deploy

# Clean and rebuild
./gradlew clean build
```

---

## Option 2: Maven

Maven is an alternative if you prefer XML-based configuration.

### Create Project Structure

```
my-plugin/
├── pom.xml
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── yourname/
        │           └── myplugin/
        │               └── MyPlugin.java
        └── resources/
            └── manifest.json
```

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.yourname</groupId>
    <artifactId>my-plugin</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>25</maven.compiler.source>
        <maven.compiler.target>25</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.hypixel.hytale</groupId>
            <artifactId>hytale-server</artifactId>
            <version>1.0.0</version>
            <scope>system</scope>
            <systemPath>D:/HyTale Server/Server/HytaleServer.jar</systemPath>
        </dependency>
    </dependencies>

    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>manifest.json</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```

### Build Commands

```bash
# Build the plugin
mvn package

# Clean and rebuild
mvn clean package
```

The JAR will be in `target/my-plugin-1.0.0.jar`.

---

## The Manifest File

Every plugin needs a `manifest.json` in `src/main/resources/`:

```json
{
    "id": "my-plugin",
    "name": "My Plugin",
    "version": "1.0.0",
    "entrypoint": "com.yourname.myplugin.MyPlugin",
    "description": "My first Hytale plugin"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique plugin identifier (lowercase, no spaces) |
| `name` | Yes | Display name |
| `version` | Yes | Semantic version (e.g., 1.0.0) |
| `entrypoint` | Yes | Fully qualified class name of your main class |
| `description` | No | Brief description |

## Verifying Your Setup

After setting up:

1. Run `./gradlew build` (or `mvn package`)
2. Check that a JAR file is created in `build/libs/` (Gradle) or `target/` (Maven)
3. The JAR should contain your compiled classes and `manifest.json`

::: tip Quick Check
Open the JAR with any ZIP tool and verify `manifest.json` is at the root level, not in a subfolder.
:::

## Next Steps

Now that your project is set up, it's time to write some code!

[**Next Step: Your First Plugin →**](/getting-started/first-plugin)
