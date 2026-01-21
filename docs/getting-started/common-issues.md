# Common Issues

Quick solutions to the most frequent problems when setting up or running a Hytale server.

## Server Won't Start

### "Java not found" or "java is not recognized"

**Cause:** Java is not installed or not in your system PATH.

**Fix:**
1. Install [Java 25 (Temurin)](https://adoptium.net/temurin/releases/?version=25)
2. During installation, check "Set JAVA_HOME variable"
3. Restart your terminal/PowerShell

See: [Windows Setup - Java Not Detected](/getting-started/server-setup-windows#verify-installation)

### "Error: Unable to access jarfile"

**Cause:** You're running the command from the wrong directory.

**Default Server Locations:**
- **Windows (default install):** `%appdata%\Hytale\install\release\package\game\latest\Server`
- **Windows (custom):** Wherever you extracted/installed the server
- **Linux:** `~/hytale-server` or your chosen directory

**Fix:**

**Windows (PowerShell):**
```powershell
# Default location
cd "$env:APPDATA\Hytale\install\release\package\game\latest\Server"

# Or custom location
cd "D:\HyTale Server\Server"

# Then run
java -jar HytaleServer.jar --assets Assets.zip
```

**Linux:**
```bash
cd ~/hytale-server
java -jar HytaleServer.jar --assets Assets.zip
```

### "Assets.zip not found"

**Cause:** The assets file is missing or in the wrong location.

**Fix:**
1. Run the Hytale Downloader again to download `Assets.zip`
2. Make sure `Assets.zip` is in the same folder as `HytaleServer.jar`

### Server crashes immediately

**Cause:** Usually a memory or Java version issue.

**Fix:**
1. Check you're using Java 25+: `java -version`
2. Allocate more memory: `java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip`

---

## Plugin Not Loading

### Plugin doesn't appear in logs

**Cause:** The JAR file isn't in the right folder or has the wrong structure.

**Fix:**
1. Ensure the JAR is in `mods/` (not a subfolder)
2. Check the JAR contains `manifest.json` at the root
3. Verify `manifest.json` has a valid `entrypoint` class

### "ClassNotFoundException" or "NoClassDefFoundError"

**Cause:** Your plugin's main class doesn't exist or the package is wrong.

**Fix:**
1. Check `entrypoint` in `manifest.json` matches your actual class path
2. Verify your package structure: `com.example.MyPlugin` → `src/main/java/com/example/MyPlugin.java`
3. Rebuild the plugin: `./gradlew clean build`

### "Invalid manifest" errors

**Cause:** `manifest.json` has syntax errors.

**Fix:**
1. Validate your JSON at [jsonlint.com](https://jsonlint.com/)
2. Ensure all required fields are present: `id`, `name`, `version`, `entrypoint`

---

## Connection Issues

### Can't connect to localhost

**Cause:** Server isn't running or using wrong port.

**Fix:**
1. Check the server is running (look for "Server started" in logs)
2. Use the correct address: `localhost` or `127.0.0.1`
3. Default port is `5520` (UDP)

### Friends can't connect

**Cause:** Port forwarding not set up or behind CGNAT.

**Fix:**
1. Set up [Port Forwarding](/getting-started/port-forwarding)
2. If that doesn't work, try [Tailscale](/getting-started/tailscale)

### "Connection timed out"

**Cause:** Firewall blocking the connection.

**Fix:**
1. Allow UDP port 5520 in Windows Firewall
2. Check your router's firewall settings
3. Temporarily disable antivirus to test

---

## Build Errors

### "Could not find or load main class"

**Cause:** Gradle project not set up correctly.

**Fix:**
1. Ensure `build.gradle.kts` has the `java` plugin
2. Run `./gradlew clean build`
3. Check `settings.gradle.kts` exists with `rootProject.name`

### "Cannot resolve symbol" for Hytale classes

**Cause:** `HytaleServer.jar` not found by Gradle.

**Fix:**
1. Check the path in `build.gradle.kts`:
   ```kotlin
   compileOnly(files("D:/HyTale Server/Server/HytaleServer.jar"))
   ```
2. Make sure the path matches your actual server location
3. Refresh Gradle in your IDE

---

## Still Stuck?

- Check server logs in the console for specific error messages
- Open an issue on [GitHub](https://github.com/encomjp/HyTale-Api-Docs/issues)
