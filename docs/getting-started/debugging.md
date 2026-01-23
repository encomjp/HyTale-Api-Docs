# Debugging Guide

Things go wrong. Here is how to fix them.

## Reading the Logs
Logs are located in the `logs/` folder of your server. The latest log is always `server.log` (in the server root).

**Log Format:**
`[Time] [Thread/LEVEL] [Logger]: Message`

Example:
`[12:00:00] [Server thread/INFO] [HytaleServer]: Loading plugins...`

## Common Errors

### `MissingPluginDependencyException`
**Error:**
```
com.hypixel.hytale.server.core.plugin.MissingPluginDependencyException: Plugin 'MyPlugin' requires 'EconomyLib'
```
**Cause:** Your `manifest.json` lists a dependency that isn't installed.
**Fix:** Download the missing plugin or remove it from your `dependencies` list.

### `NoClassDefFoundError`
**Error:** `java.lang.NoClassDefFoundError: com/hypixel/hytale/...`
**Cause:** You compiled your plugin against a different version of the server than you are running.
**Fix:**
1. Run the **Hytale Downloader** to update your server.
2. Re-import the `HytaleServer.jar` in your Gradle project.
3. Rebuild your plugin.

### `Address already in use`
**Error:** `java.net.BindException: Address already in use: bind`
**Cause:** The server is already running!
**Fix:** Check your task manager and kill any stuck `java.exe` processes, or close the other server window.

## Debugging with IntelliJ
You can attach a debugger to a running server to step through code.

1. Add the following VM arguments when starting the server:
   `-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005`
2. In IntelliJ, create a **Remote JVM Debug** configuration.
3. Set port to `5005`.
4. Run the Debug configuration to connect.
