# Server Setup

This guide will walk you through setting up a local Hytale server for development and testing your plugins.

## Quick Start (TL;DR)

If you just want to get running in 2 minutes:

1. **Install Java 25**: [Download Here](https://adoptium.net/temurin/releases/?version=25)
2. **Download Server**: [Hytale Downloader](https://downloader.hytale.com/hytale-downloader.zip)
3. **Run Downloader**: Double-click `hytale-downloader.exe`
4. **Done**: You can now connect to `localhost` in Hytale!

---

## Detailed Setup Guide

## Step 1: Install Java 25

Hytale requires **Java 25** to run. Even if you have an older version of Java (like Java 8 or 17), you will need to install Java 25 side-by-side.

1.  Download **[Eclipse Temurin JDK 25+ (LTS)](https://adoptium.net/temurin/releases/?version=25)**.
2.  Run the installer.
3.  **Important:** Make sure to check the box "Set JAVA_HOME variable" during installation.

### Verify Installation
Open your terminal (Command Prompt or PowerShell) and type:

```bash
java -version
```

You should see output mentioning `version "25.0.0"` or higher. If you see an older version, you may need to adjust your system PATH.

## Step 2: Download the Server

1.  Create a folder for your server (e.g., `C:\HytaleServer`).
2.  Download the **[Hytale Downloader](https://downloader.hytale.com/hytale-downloader.zip)**.
3.  Extract the zip file into your server folder.
4.  Run the downloader script:

```bash
# Windows
./hytale-downloader.exe
```

This will automatically fetch the latest `HytaleServer.jar` and the required `Assets.zip` file. It ensures you are always on the correct version matching the game client.

On first run, you'll see an authorization URL. Open it in your browser and log in with your Hytale account. The download will start automatically.

::: tip
Your credentials are saved in `.hytale-downloader-credentials.json`. Add this to your `.gitignore`!
:::

## Step 2: Server File Structure

After downloading, you should have these files in your server directory:

```
Server/
├── HytaleServer.jar      # Main server application
├── Assets.zip            # Game assets
├── config.json           # Server configuration
├── permissions.json      # Player permissions
├── whitelist.json        # Allowed players
└── mods/                 # Plugin directory
```

## Step 3: Basic Configuration

Edit `config.json` to customize your server:

```json
{
  "serverName": "My Dev Server",
  "maxPlayers": 10,
  "port": 27015,
  "motd": "Development Server"
}
```

## Step 4: Start the Server

Run the server from the command line:

```bash
# Basic start command
java -jar HytaleServer.jar --assets Assets.zip

# With more memory (recommended)
java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip
```

::: info Memory Settings
`-Xmx4G` sets max memory to 4GB. `-Xms2G` sets initial memory to 2GB. Adjust based on your system.
:::

## Step 5: Set Up the Mods Folder

Plugins go in the `mods/` directory. Each plugin is a JAR file:

```
mods/
├── my-plugin-1.0.0.jar
├── de.europeanpepe_essentials-lite/  # Plugin data folder
└── essentials-lite-1.2.0.jar
```

When you build a plugin, copy the resulting JAR to this folder and restart the server.

## Step 6: Set Up Permissions

Edit `permissions.json` to give yourself admin access:

```json
{
  "players": {
    "YourUsername": {
      "permissions": ["*"],
      "groups": ["admin"]
    }
  },
  "groups": {
    "admin": {
      "permissions": ["*"]
    }
  }
}
```

## Development Tips

### Auto-Deploy with Gradle

Configure your `build.gradle.kts` to automatically copy JARs to the mods folder:

```kotlin
tasks.register<Copy>("deploy") {
    dependsOn("build")
    from(tasks.jar)
    into("D:/HyTale Server/Server/mods")
}
```

### Capture Logs

Always capture server output for debugging:

```bash
java -jar HytaleServer.jar --assets Assets.zip 2>&1 | tee server.log
```

### Quick Restart Script (Windows)

Create a batch file for quick restarts:

```batch
@echo off
:loop
java -Xmx4G -jar HytaleServer.jar --assets Assets.zip
echo Server stopped. Press any key to restart...
pause
goto loop
```

::: warning Important
Always stop the server gracefully before replacing plugin JARs. Hot-reloading is not supported.
:::

## Downloader Commands Reference

| Command | What it Does |
|---------|--------------|
| `./hytale-downloader` | Download latest release |
| `./hytale-downloader -print-version` | Show game version without downloading |
| `./hytale-downloader -version` | Show hytale-downloader version |
| `./hytale-downloader -check-update` | Check for hytale-downloader updates |
| `./hytale-downloader -download-path game.zip` | Download to specific file |
| `./hytale-downloader -patchline pre-release` | Download from pre-release channel |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Authentication error | Delete `.hytale-downloader-credentials.json` and re-run |
| Device code expired | Restart the tool to get a new authorization code |
| Checksum mismatch | Retry the download |
| 401 Unauthorized | Re-authenticate (delete credentials file) |
| 404 Not Found | Check patchline name & your access permissions |
