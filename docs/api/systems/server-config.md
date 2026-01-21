# Server Configuration API

Access and modify server settings programmatically.

## Verified Classes
- `com.hypixel.hytale.server.core.HytaleServerConfig`
- `com.hypixel.hytale.server.core.asset.type.gameplay.GameplayConfig`
- `com.hypixel.hytale.server.core.asset.type.gameplay.CombatConfig`

## Server Config

The global configuration for the server instance.

```java
HytaleServerConfig config = context.getServer().getConfig();

// Basic Info
String name = config.getServerName();
int maxPlayers = config.getMaxPlayers();
String motd = config.getMotd(); // Message of the Day
```

## Gameplay Config

Access via `config.getGameplay()`. These settings control core game mechanics.

### Combat Settings
```java
CombatConfig combat = config.getGameplay().getCombat();

// Enable/Disable global PvP
boolean pvpEnabled = combat.isPvpEnabled();

// Global damage scaling
double multiplier = combat.getDamageMultiplier();
```

### Death Settings
Control what happens when a player dies.

```java
DeathConfig death = config.getGameplay().getDeath();

// ItemsLossMode: NONE (Keep Inv), ALL (Drop all), RANDOM
if (death.getItemsLossMode() == DeathConfig.ItemsLossMode.NONE) {
    // Keep Inventory is ON
}
```

## Runtime Changes

Some settings can be changed dynamically without restarting.

```java
// World GameRules
world.setGameRule("doDaylightCycle", false); // Freeze time
world.setGameRule("mobGriefing", false);     // Creeper explosions don't break blocks
```
