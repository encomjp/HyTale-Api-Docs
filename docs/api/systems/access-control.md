# Access Control API

Manage bans, kicks, and whitelists.

> [!TIP]
> **Best Practice**: Use this API instead of simple "kick" commands to ensure proper logging and unification with Hytale's backend services.

## Verified Classes
- `com.hypixel.hytale.server.core.modules.accesscontrol.AccessControlModule`

## Managing Access

### Banning Players
Bans persist across restarts (saved to `banned-players.json` typically).

```java
AccessControlModule access = server.getModule(AccessControlModule.class);

// Ban by UUID (Safe for name changes)
// Duration: Java Time API
access.ban(
    player.getUUID(), 
    "Hacking / Fly", 
    Duration.ofDays(30)
);

// Check if banned
if (access.isBanned(uuid)) {
    // Logic
}
```

### Whitelist Modes
When enabled, only added players can join. Useful for maintenance or closed betas.

```java
// Enable whitelist
access.setWhitelistEnabled(true);

// Add player
access.addToWhitelist(uuid);

// Kick non-whitelisted players immediately?
// Usually happens automatically on next login attempt
```

### Kicking
Immediate disconnection.

```java
// The string message is shown on the disconnect screen
player.kick("§cServer restarting for updates!");
```
