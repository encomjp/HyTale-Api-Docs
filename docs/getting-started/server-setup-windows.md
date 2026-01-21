# Server Setup (Windows)

This guide covers setting up a Hytale server on Windows.

## Prerequisites

- Windows 10/11
- Administrator access (recommended)

## Step 1: Install Java 25

1.  Download **[Eclipse Temurin JDK 25](https://adoptium.net/temurin/releases/?version=25)**.
2.  Run the installer.
3.  **Check the box**: "Set JAVA_HOME variable".

### Verify Installation

Open PowerShell and type:

```powershell
java -version
```

You should see `version "25.0.x"` or higher.

::: warning Java Not Detected?
If you see `'java' is not recognized` or an older version, you need to add Java to your system PATH manually:

1. Open **Start Menu** → Search for "**Environment Variables**" → Click "**Edit the system environment variables**"
2. Click **Environment Variables...** button
3. Under **System variables**, find `Path` and click **Edit**
4. Click **New** and add the path to your Java `bin` folder, e.g.:
   ```
   C:\Program Files\Eclipse Adoptium\jdk-25.0.1+10\bin
   ```
5. Also add a new **System variable** called `JAVA_HOME` pointing to the JDK root (without `\bin`):
   ```
   C:\Program Files\Eclipse Adoptium\jdk-25.0.1+10
   ```
6. Click **OK** on all dialogs and **restart PowerShell**
:::

## Step 2: Download the Server

1.  Create a folder: `C:\HytaleServer` (or your preferred location).
2.  Download the **[Hytale Downloader](https://downloader.hytale.com/hytale-downloader.zip)**.
3.  Extract the ZIP into your server folder.
4.  Run `hytale-downloader.exe`.

The downloader will prompt you to authenticate in your browser. After logging in, it automatically downloads `HytaleServer.jar` and `Assets.zip`.

::: danger Protect Your Credentials!
Your credentials are saved in `.hytale-downloader-credentials.json`. **Never commit this file to Git!** Add it to your `.gitignore` immediately.
:::

## Step 3: Start the Server

Open PowerShell in your server folder and run:

```powershell
java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip
```

| Flag | Meaning |
|------|---------|
| `-Xmx4G` | Maximum 4GB RAM |
| `-Xms2G` | Initial 2GB RAM |
| `--assets` | Path to game assets |

## Quick Start Script

Create `start.bat` for easy restarts:

```batch
@echo off
:loop
java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip
echo Server stopped. Press any key to restart...
pause > nul
goto loop
```

## Next Steps

- [IDE: Visual Studio Code](/getting-started/ide-vscode) - Set up your editor
- [IDE: IntelliJ IDEA](/getting-started/ide-intellij) - Professional IDE setup
- [First Plugin](/getting-started/first-plugin) - Build your first plugin
