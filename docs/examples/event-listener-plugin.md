# Complete Event Listener Plugin Example

A fully-functional plugin that demonstrates event handling, player tracking, and data persistence.

## Overview

This plugin tracks player statistics like:
- Join/quit times
- Blocks broken/placed
- Distance traveled
- Damage taken/dealt

## Complete Plugin Code

### Plugin Main Class

```java
package com.example.playertracker;

import com.hypixel.hytale.common.plugin.PluginManifest;
import com.hypixel.hytale.server.core.plugin.Plugin;
import com.hypixel.hytale.server.core.plugin.PluginContext;
import com.hypixel.hytale.server.core.event.EventManager;
import com.hypixel.hytale.server.core.command.CommandManager;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.io.*;
import java.nio.file.Path;

/**
 * PlayerTracker - A comprehensive player statistics tracking plugin
 * 
 * Features:
 * - Tracks player join/quit times and playtime
 * - Monitors blocks broken and placed
 * - Calculates distance traveled
 * - Records damage taken and dealt
 * - Persists data across server restarts
 * - Provides statistics commands
 */
public class PlayerTrackerPlugin implements Plugin {
    
    // Store player data in memory for fast access
    // UUID -> PlayerStats mapping
    private final Map<UUID, PlayerStats> playerData = new HashMap<>();
    
    // Plugin context for accessing server APIs
    private PluginContext context;
    
    // Data storage directory
    private Path dataFolder;
    
    /**
     * Called when the plugin is loaded
     * This is where you register events and commands
     */
    @Override
    public void onEnable(PluginContext context) {
        this.context = context;
        this.dataFolder = context.getDataFolder();
        
        // Log plugin initialization
        context.getLogger().info("PlayerTracker plugin initializing...");
        
        // Create data directory if it doesn't exist
        if (!dataFolder.toFile().exists()) {
            dataFolder.toFile().mkdirs();
            context.getLogger().info("Created data directory: " + dataFolder);
        }
        
        // Register event listeners
        EventManager events = context.getEventManager();
        events.registerEvents(new PlayerEventListener(this), this);
        events.registerEvents(new BlockEventListener(this), this);
        events.registerEvents(new CombatEventListener(this), this);
        
        // Register commands
        CommandManager commands = context.getCommandManager();
        commands.register(new StatsCommand(this));
        commands.register(new LeaderboardCommand(this));
        
        // Load existing player data
        loadAllPlayerData();
        
        context.getLogger().info("PlayerTracker plugin enabled successfully!");
    }
    
    /**
     * Called when the plugin is unloaded
     * Clean up resources and save data
     */
    @Override
    public void onDisable(PluginContext context) {
        context.getLogger().info("PlayerTracker plugin shutting down...");
        
        // Save all player data
        saveAllPlayerData();
        
        // Unregister all event handlers
        context.getEventManager().unregisterAll(this);
        
        // Clear memory
        playerData.clear();
        
        context.getLogger().info("PlayerTracker plugin disabled!");
    }
    
    /**
     * Get or create player stats
     * This ensures we always have a stats object for each player
     */
    public PlayerStats getPlayerStats(UUID uuid) {
        // Return existing stats if available
        if (playerData.containsKey(uuid)) {
            return playerData.get(uuid);
        }
        
        // Create new stats for this player
        PlayerStats stats = new PlayerStats(uuid);
        playerData.put(uuid, stats);
        return stats;
    }
    
    /**
     * Save single player's data to disk
     */
    public void savePlayerData(UUID uuid) {
        PlayerStats stats = playerData.get(uuid);
        if (stats == null) {
            return; // No data to save
        }
        
        // Create file path: data/UUID.json
        File file = new File(dataFolder.toFile(), uuid.toString() + ".json");
        
        try (FileWriter writer = new FileWriter(file)) {
            // Convert stats to JSON and save
            writer.write(stats.toJSON());
            context.getLogger().debug("Saved data for player: " + uuid);
        } catch (IOException e) {
            context.getLogger().error("Failed to save data for " + uuid, e);
        }
    }
    
    /**
     * Save all player data
     * Called on server shutdown or periodic saves
     */
    public void saveAllPlayerData() {
        context.getLogger().info("Saving data for " + playerData.size() + " players...");
        
        for (UUID uuid : playerData.keySet()) {
            savePlayerData(uuid);
        }
        
        context.getLogger().info("All player data saved!");
    }
    
    /**
     * Load all existing player data from disk
     */
    private void loadAllPlayerData() {
        File dataDir = dataFolder.toFile();
        File[] files = dataDir.listFiles((dir, name) -> name.endsWith(".json"));
        
        if (files == null || files.length == 0) {
            context.getLogger().info("No existing player data found");
            return;
        }
        
        int loaded = 0;
        for (File file : files) {
            try {
                // Extract UUID from filename
                String uuidStr = file.getName().replace(".json", "");
                UUID uuid = UUID.fromString(uuidStr);
                
                // Read file content
                StringBuilder json = new StringBuilder();
                try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        json.append(line);
                    }
                }
                
                // Parse JSON and create stats object
                PlayerStats stats = PlayerStats.fromJSON(uuid, json.toString());
                playerData.put(uuid, stats);
                
                loaded++;
            } catch (Exception e) {
                context.getLogger().error("Failed to load data from " + file.getName(), e);
            }
        }
        
        context.getLogger().info("Loaded data for " + loaded + " players");
    }
    
    public PluginContext getContext() {
        return context;
    }
}
```

### Player Statistics Class

```java
package com.example.playertracker;

import java.util.UUID;

/**
 * Data class for storing player statistics
 * This is a simple POJO (Plain Old Java Object) for data storage
 */
public class PlayerStats {
    
    private final UUID uuid;
    
    // Join/Quit tracking
    private long firstJoin;      // Timestamp of first join
    private long lastJoin;       // Timestamp of last join
    private long totalPlaytime;  // Total playtime in milliseconds
    private long sessionStart;   // Current session start time
    
    // Block statistics
    private int blocksPlaced;
    private int blocksBroken;
    
    // Movement statistics
    private double distanceTraveled;
    private double lastX, lastY, lastZ; // Last known position
    
    // Combat statistics
    private double damageTaken;
    private double damageDealt;
    private int deaths;
    private int kills;
    
    public PlayerStats(UUID uuid) {
        this.uuid = uuid;
        this.firstJoin = System.currentTimeMillis();
        this.lastJoin = this.firstJoin;
        this.totalPlaytime = 0;
        this.sessionStart = 0;
        
        this.blocksPlaced = 0;
        this.blocksBroken = 0;
        
        this.distanceTraveled = 0.0;
        this.lastX = 0;
        this.lastY = 0;
        this.lastZ = 0;
        
        this.damageTaken = 0.0;
        this.damageDealt = 0.0;
        this.deaths = 0;
        this.kills = 0;
    }
    
    // ===== Session Management =====
    
    public void startSession() {
        this.sessionStart = System.currentTimeMillis();
        this.lastJoin = this.sessionStart;
    }
    
    public void endSession() {
        if (sessionStart > 0) {
            long sessionDuration = System.currentTimeMillis() - sessionStart;
            totalPlaytime += sessionDuration;
            sessionStart = 0;
        }
    }
    
    public long getCurrentSessionTime() {
        if (sessionStart == 0) {
            return 0;
        }
        return System.currentTimeMillis() - sessionStart;
    }
    
    // ===== Block Statistics =====
    
    public void addBlockPlaced() {
        blocksPlaced++;
    }
    
    public void addBlockBroken() {
        blocksBroken++;
    }
    
    // ===== Movement Tracking =====
    
    public void updatePosition(double x, double y, double z) {
        // Calculate distance from last position
        if (lastX != 0 || lastY != 0 || lastZ != 0) {
            double dx = x - lastX;
            double dy = y - lastY;
            double dz = z - lastZ;
            
            // Euclidean distance formula: sqrt(dx² + dy² + dz²)
            double distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            // Only add if distance is reasonable (prevent teleport counting)
            if (distance < 100.0) {
                distanceTraveled += distance;
            }
        }
        
        // Update last known position
        this.lastX = x;
        this.lastY = y;
        this.lastZ = z;
    }
    
    // ===== Combat Statistics =====
    
    public void addDamageTaken(double amount) {
        damageTaken += amount;
    }
    
    public void addDamageDealt(double amount) {
        damageDealt += amount;
    }
    
    public void addDeath() {
        deaths++;
    }
    
    public void addKill() {
        kills++;
    }
    
    // ===== Getters =====
    
    public UUID getUuid() { return uuid; }
    public long getFirstJoin() { return firstJoin; }
    public long getLastJoin() { return lastJoin; }
    public long getTotalPlaytime() { return totalPlaytime + getCurrentSessionTime(); }
    public int getBlocksPlaced() { return blocksPlaced; }
    public int getBlocksBroken() { return blocksBroken; }
    public double getDistanceTraveled() { return distanceTraveled; }
    public double getDamageTaken() { return damageTaken; }
    public double getDamageDealt() { return damageDealt; }
    public int getDeaths() { return deaths; }
    public int getKills() { return kills; }
    
    // ===== JSON Serialization =====
    
    public String toJSON() {
        return "{"
            + "\"uuid\":\"" + uuid.toString() + "\","
            + "\"firstJoin\":" + firstJoin + ","
            + "\"lastJoin\":" + lastJoin + ","
            + "\"totalPlaytime\":" + totalPlaytime + ","
            + "\"blocksPlaced\":" + blocksPlaced + ","
            + "\"blocksBroken\":" + blocksBroken + ","
            + "\"distanceTraveled\":" + distanceTraveled + ","
            + "\"damageTaken\":" + damageTaken + ","
            + "\"damageDealt\":" + damageDealt + ","
            + "\"deaths\":" + deaths + ","
            + "\"kills\":" + kills
            + "}";
    }
    
    public static PlayerStats fromJSON(UUID uuid, String json) {
        // Simple JSON parsing (in production, use a JSON library like Gson)
        PlayerStats stats = new PlayerStats(uuid);
        
        // Extract values (simplified - use proper JSON parser in production)
        stats.firstJoin = extractLong(json, "firstJoin");
        stats.lastJoin = extractLong(json, "lastJoin");
        stats.totalPlaytime = extractLong(json, "totalPlaytime");
        stats.blocksPlaced = extractInt(json, "blocksPlaced");
        stats.blocksBroken = extractInt(json, "blocksBroken");
        stats.distanceTraveled = extractDouble(json, "distanceTraveled");
        stats.damageTaken = extractDouble(json, "damageTaken");
        stats.damageDealt = extractDouble(json, "damageDealt");
        stats.deaths = extractInt(json, "deaths");
        stats.kills = extractInt(json, "kills");
        
        return stats;
    }
    
    private static long extractLong(String json, String key) {
        // Simplified extraction - use proper JSON library in production
        String search = "\"" + key + "\":";
        int start = json.indexOf(search) + search.length();
        int end = json.indexOf(",", start);
        if (end == -1) end = json.indexOf("}", start);
        return Long.parseLong(json.substring(start, end));
    }
    
    private static int extractInt(String json, String key) {
        return (int) extractLong(json, key);
    }
    
    private static double extractDouble(String json, String key) {
        String search = "\"" + key + "\":";
        int start = json.indexOf(search) + search.length();
        int end = json.indexOf(",", start);
        if (end == -1) end = json.indexOf("}", start);
        return Double.parseDouble(json.substring(start, end));
    }
}
```

### Event Listeners

```java
package com.example.playertracker;

import com.hypixel.hytale.server.core.event.*;
import com.hypixel.hytale.server.core.entity.Player;
import java.util.UUID;

/**
 * PlayerEventListener - Handles player join/quit/move events
 */
public class PlayerEventListener {
    
    private final PlayerTrackerPlugin plugin;
    
    public PlayerEventListener(PlayerTrackerPlugin plugin) {
        this.plugin = plugin;
    }
    
    @EventHandler(priority = EventPriority.MONITOR)
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        UUID uuid = player.getUUID();
        
        // Get or create player stats
        PlayerStats stats = plugin.getPlayerStats(uuid);
        
        // Start tracking this session
        stats.startSession();
        
        // Log join
        plugin.getContext().getLogger().info(
            player.getName() + " joined (Total playtime: " + 
            formatTime(stats.getTotalPlaytime()) + ")"
        );
    }
    
    @EventHandler(priority = EventPriority.MONITOR)
    public void onPlayerQuit(PlayerQuitEvent event) {
        Player player = event.getPlayer();
        UUID uuid = player.getUUID();
        
        // Get stats
        PlayerStats stats = plugin.getPlayerStats(uuid);
        
        // End session and save data
        stats.endSession();
        plugin.savePlayerData(uuid);
        
        // Log quit
        plugin.getContext().getLogger().info(
            player.getName() + " quit (Session: " + 
            formatTime(stats.getCurrentSessionTime()) + ")"
        );
    }
    
    @EventHandler
    public void onPlayerMove(PlayerMoveEvent event) {
        Player player = event.getPlayer();
        Location to = event.getTo();
        
        // Update position for distance tracking
        PlayerStats stats = plugin.getPlayerStats(player.getUUID());
        stats.updatePosition(to.getX(), to.getY(), to.getZ());
    }
    
    private String formatTime(long millis) {
        long seconds = millis / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        
        return String.format("%dh %dm %ds", hours, minutes % 60, seconds % 60);
    }
}

/**
 * BlockEventListener - Handles block break/place events
 */
public class BlockEventListener {
    
    private final PlayerTrackerPlugin plugin;
    
    public BlockEventListener(PlayerTrackerPlugin plugin) {
        this.plugin = plugin;
    }
    
    @EventHandler(priority = EventPriority.MONITOR)
    public void onBlockBreak(BlockBreakEvent event) {
        // Only count if event wasn't cancelled
        if (event.isCancelled()) {
            return;
        }
        
        Player player = event.getPlayer();
        PlayerStats stats = plugin.getPlayerStats(player.getUUID());
        stats.addBlockBroken();
    }
    
    @EventHandler(priority = EventPriority.MONITOR)
    public void onBlockPlace(BlockPlaceEvent event) {
        if (event.isCancelled()) {
            return;
        }
        
        Player player = event.getPlayer();
        PlayerStats stats = plugin.getPlayerStats(player.getUUID());
        stats.addBlockPlaced();
    }
}

/**
 * CombatEventListener - Handles combat-related events
 */
public class CombatEventListener {
    
    private final PlayerTrackerPlugin plugin;
    
    public CombatEventListener(PlayerTrackerPlugin plugin) {
        this.plugin = plugin;
    }
    
    @EventHandler(priority = EventPriority.MONITOR)
    public void onEntityDamage(EntityDamageEvent event) {
        if (event.isCancelled()) {
            return;
        }
        
        Entity entity = event.getEntity();
        
        // Track damage taken by players
        if (entity instanceof Player) {
            Player player = (Player) entity;
            PlayerStats stats = plugin.getPlayerStats(player.getUUID());
            stats.addDamageTaken(event.getDamage());
        }
        
        // Track damage dealt by players
        if (event.getDamager() instanceof Player) {
            Player attacker = (Player) event.getDamager();
            PlayerStats stats = plugin.getPlayerStats(attacker.getUUID());
            stats.addDamageDealt(event.getDamage());
        }
    }
    
    @EventHandler(priority = EventPriority.MONITOR)
    public void onPlayerDeath(PlayerDeathEvent event) {
        Player player = event.getPlayer();
        PlayerStats stats = plugin.getPlayerStats(player.getUUID());
        stats.addDeath();
        
        // Track killer's kill
        Player killer = event.getKiller();
        if (killer != null) {
            PlayerStats killerStats = plugin.getPlayerStats(killer.getUUID());
            killerStats.addKill();
        }
    }
}
```

## Building and Testing

### Build Instructions

1. Create directory structure:
```
PlayerTracker/
├── src/main/java/com/example/playertracker/
│   ├── PlayerTrackerPlugin.java
│   ├── PlayerStats.java
│   ├──PlayerEventListener.java
│   ├── BlockEventListener.java
│   └── CombatEventListener.java
├── src/main/resources/
│   └── plugin.yml
└── build.gradle
```

2. Install the plugin JAR to server's `plugins/` folder

3. Start server and test:
```
# Join the server
# Break/place blocks
# Move around
# Check /stats
# Quit and rejoin - data should persist
```

## Key Learning Points

1. **Event Priority**: Use MONITOR for read-only tracking
2. **Data Persistence**: Save on quit, load on enable
3. **Memory Management**: Store data in HashMap for fast access
4. **Thread Safety**: All events run on main thread - safe to modify game state
5. **Performance**: Use efficient data structures and avoid heavy operations

---

**Complexity**: Intermediate  
**Lines of Code**: ~400  
**Features**: 5 event types, data persistence, statistics tracking
