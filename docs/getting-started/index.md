# Introduction

Welcome to the Hytale Developer Documentation. Whether you're looking to create plugins, design art packs, or build resource packs, this guide will help you get started.

::: tip New to Hytale Development?
Follow our guides in order:
- **[Server Setup](./server-setup)**: Installing Java 25 and running the server.
- **[IDE Setup](./ide-setup)**: Configuring IntelliJ for the best experience.
- **[First Plugin](./first-plugin)**: Writing your first "Hello World".
- **[Debugging](./debugging)**: How to read logs and fix common errors.
:::

## What Can You Create?

### Plugins

Server-side modifications written in Java or Kotlin that extend server functionality. Plugins can:

- Add custom commands for players
- React to in-game events (player joins, block breaks, etc.)
- Implement new game mechanics and systems
- Manage permissions and player data
- Integrate with external services and databases

### Art Packs

Visual assets that customize the appearance of the game:

- Custom block and item textures
- Character skins and models
- UI elements and icons
- Particle effects and animations

### Resource Packs

Collections of game resources distributed to clients:

- Sounds and music
- Configuration files
- Localization and translations
- Combined art and data assets

## Required Tools

Before you start, you'll need to install a few things. Here are the official recommended versions:

### 1. Java Development Kit (JDK) 25
Hytale runs on the latest Java technology. You **must** have Java 25 or higher.

- **[Download JDK 25 (Adoptium)](https://adoptium.net/temurin/releases/?version=25)** - Recommended
- [Oracle JDK 25](https://www.oracle.com/java/technologies/downloads/) - Alternative

### 2. Code Editor (IDE)
We recommend IntelliJ IDEA for the best experience with Kotlin/Java and Hytale's API.

- **[IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/)** - Free, powerful, highly recommended.
- [Visual Studio Code](https://code.visualstudio.com/) - Good alternative if you prefer a lightweight editor.

### 3. Build Tools
Most templates include Gradle, but having it installed generally is good practice.

- **[Gradle Build Tool](https://gradle.org/install/)** - The standard build system for Hytale plugins.

### 4. Hytale Server
You'll need a local server for testing.

- **[Hytale Downloader](https://downloader.hytale.com/hytale-downloader.zip)** - Official tool to download/update the server jar.

## Development Workflow

A typical plugin development workflow looks like this:

1. **Set up your environment** - Install Java, IDE, and download the server
2. **Create a new project** - Use a template or start from scratch
3. **Write your code** - Implement features using the Hytale API
4. **Build your plugin** - Compile to a JAR file
5. **Test locally** - Deploy to your development server
6. **Iterate** - Fix bugs, add features, repeat

## Getting Help

If you get stuck, here are some resources:

- [Community Modding Wiki](https://hytalemodding.dev/en/docs) - Community-maintained documentation
- [Official Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual) - Official Hytale documentation
- [Hytale Downloader](https://downloader.hytale.com/hytale-downloader.zip) - Download server files
- **Decompiled Server JAR** - The source of truth for API symbols and methods
