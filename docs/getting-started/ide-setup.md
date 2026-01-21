# IDE Setup Guide

A properly configured IDE makes development faster and easier. We recommend **IntelliJ IDEA**.

## IntelliJ IDEA Configuration

### 1. Install Plugin Support
While not strictly required, the following plugins help:
- **Minecraft Development**: Often has useful NBT viewers.
- **Json Parser**: For editing `manifest.json` and assets.

### 2. Auto-Import Settings
Hytale packages (`com.hypixel.hytale...`) can be long. Configure IntelliJ to handle them:
1. Go to **Settings** > **Editor** > **General** > **Auto Import**.
2. Check **Add unambiguous imports on the fly**.
3. Check **Optimize imports on the fly**.

### 3. Gradle Setup
Ensure Gradle uses the correct Java version (Java 25).
1. Go to **Settings** > **Build, Execution, Deployment** > **Build Tools** > **Gradle**.
2. Set **Gradle JVM** to **Project SDK (25)**.

### 4. Running the Server
You can run the server directly from IntelliJ:
1. Click **Add Configuration** (top right).
2. Select **Jar Application**.
3. **Path to JAR**: `D:\HyTale Server\Server\HytaleServer.jar`.
4. **VM Options**: `-Xmx2G -Dfile.encoding=UTF-8`.
5. **Working Directory**: `D:\HyTale Server\Server`.

## Visual Studio Code

1. Install **Extension Pack for Java**.
2. Open your `build.gradle.kts`.
3. VS Code typically auto-detects the project.
4. To run, use the terminal: `.\gradlew run`.
