# API Reference Overview

Complete reference documentation for the Hytale server API.

## Core APIs

| API | Description |
|-----|-------------|
| [Player API](./entity/player) | Player management and interaction |
| [World API](./world/world) | World management and dimensions |
| [Blocks API](./world/blocks) | Block manipulation and data |
| [Items API](./entity/items) | Item creation and metadata |
| [Inventory API](./entity/inventory) | Inventories and GUIs |
| [Particles API](./client/particles) | Visual effects and sounds |
| [Events API](./systems/events) | Event system and handlers |
| [Commands API](./systems/commands) | Command registration and handling |
| [Networking API](./systems/networking) | Packet interception and handling |
| [Permissions Ref](./systems/permissions-ref) | Technical permissions reference |
| [Entities API](./entity/entities) | Living entities, effects, and UI |
| [Chat API](./chat) | Messages, formatting, and chat events |
| [Titles API](./client/titles) | Titles, action bars, and UI elements |
| [Scheduler API](./systems/scheduler) | Tasks, async operations, and delays |
| [Server Config](./systems/server-config) | Server and gameplay configuration |
| [Crafting API](./crafting) | Recipes, benches, and crafting events |
| [Teleport API](./systems/teleport) | Player and entity teleportation |
| [Damage API](./entity/damage) | Damage causes, modifiers, and events |
| [Chunks API](./world/chunks) | Chunk access, tracking, and operations |
| [Audio API](./client/audio) | Sounds, ambience, and music |
| [Physics API](./world/physics) | Entity physics, velocity, and collisions |
| [Animation API](./client/animation) | Entity and item animations |
| [Storage API](./systems/storage) | Saving worlds, players, and data |
| [Effects API](./entity/effects) | Status effects, camera shake, and visuals |
| [Component API](./core/components) | Entity Component System (ECS) |
| [Registry API](./core/registry) | Registering assets, commands, and packets |
| [Camera API](./client/camera) | Controlling perspectives and camera shake |
| [World Gen API](./world/worldgen) | Structures (Schemas) and generation events |
| [Environment API](./world/environment) | Atmosphere, lighting, and music |
| [Tags API](./core/tags) | Grouping blocks and items |
| [Math API](./core/math) | Vectors and bounding box utilities |
| [Auth API](./systems/auth) | Player authentication and sessions |
| [Fluids API](./world/fluids) | Water, lava, and fluid physics |
| [Lighting API](./world/lighting) | Dynamic lights and engine control |
| [Interaction API](./entity/interaction) | Block placement and usage events |
| [Projectiles API](./entity/projectiles) | Custom arrows and physics |
| [I18n API](./systems/i18n) | Localization and translation keys |
| [Performance API](./performance) | Metrics, profiling, and memory |
| [Modules API](./core/modules) | Core system architecture |
| [Builder Tools API](./core/builder-tools) | Native clipboard, copy/paste, and selection |
| [Access Control API](./systems/access-control) | Bans, kicks, and whitelisting |
| [Migrations API](./systems/migrations) | Data upgrades and versioning |
| [Permission Groups API](./permissions-groups) | Ranks, roles, and inheritance |
| [Entity Groups API](./entity/entity-groups) | logical grouping of entities |
| [Quests API](./quests) | Objectives, missions, and HUD tracking |
| [Prefabs & Entities](./world/prefabs) | Spawning and managing entities |

## Package Structure

```
hytale.server/
├── plugin/
│   ├── Plugin              # Main plugin interface
│   ├── PluginContext       # Plugin runtime context
│   ├── PluginManager       # Plugin lifecycle management
│   └── PluginLogger        # Logging utilities
│
├── player/
│   ├── Player              # Player entity
│   ├── PlayerManager       # Player registry
│   └── Inventory           # Player inventory
│
├── world/
│   ├── World               # World instance
│   ├── Block               # Block data
│   ├── BlockType           # Block type registry
│   └── Location            # 3D position
│
├── event/
│   ├── Event               # Base event class
│   ├── EventManager        # Event registration/firing
│   ├── EventHandler        # Handler annotation
│   └── player/             # Player events
│       ├── PlayerJoinEvent
│       ├── PlayerQuitEvent
│       └── PlayerChatEvent
│
└── command/
    ├── Command             # Command interface
    ├── CommandManager      # Command registration
    └── CommandContext      # Execution context
```

## Getting API Access

Access APIs through `PluginContext`:

```java
@Override
public void onEnable(PluginContext context) {
    // Event management
    EventManager events = context.getEventManager();
    
    // Command management
    CommandManager commands = context.getCommandManager();
    
    // Plugin management
    PluginManager plugins = context.getPluginManager();
    
    // Logging
    PluginLogger logger = context.getLogger();
    
    // Data storage
    Path dataFolder = context.getDataFolder();
    
    // Task scheduling
    Scheduler scheduler = context.getScheduler();
}
```

## Common Patterns

### Getting Players

```java
// Get player by name
Player player = context.getServer().getPlayer("PlayerName");

// Get all online players
Collection<Player> players = context.getServer().getOnlinePlayers();

// Check if player exists
if (player != null && player.isOnline()) {
    // Player is online
}
```

### Getting Worlds

```java
// Get default world
World world = context.getServer().getDefaultWorld();

// Get world by name
World netherWorld = context.getServer().getWorld("nether");

// Get player's current world
World playerWorld = player.getWorld();
```

### Working with Locations

```java
// Create a location
Location loc = new Location(world, 100, 64, -50);

// Get player location
Location playerLoc = player.getLocation();

// Distance calculation
double distance = loc.distance(playerLoc);

// Teleport player
player.teleport(loc);
```

## Exploring the API

Decompile `HytaleServer.jar` to explore available APIs:

```bash
# Using JD-GUI or similar tool
java -jar jd-gui.jar HytaleServer.jar
```

::: tip Package Structure
The actual packages in HytaleServer.jar are under `com.hypixel.hytale.server.core`. The simplified names used in this documentation (like `hytale.server.plugin`) are for clarity. Always verify the exact package paths in your HytaleServer.jar.
:::

Key packages to explore:
- `com.hypixel.hytale.server.core.plugin` - Plugin system (JavaPlugin, PluginManager)
- `com.hypixel.hytale.server.core.event` - Event system
- `com.hypixel.hytale.server.core.command` - Command handling
- `com.hypixel.hytale.server.core.entity` - Entity management
- `com.hypixel.hytale.common.plugin` - Plugin manifest and utilities
