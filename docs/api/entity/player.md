# Player API

The central interface for interacting with connected players. 

This API allows you to manipulate player state, send messages, handle permissions, and manage inventories.

## Verified Classes
- `com.hypixel.hytale.server.core.entity.entities.player.Player`
- `com.hypixel.hytale.server.core.entity.entities.player.PlayerJoinEvent`
- `com.hypixel.hytale.server.core.entity.entities.player.PlayerLeaveEvent`

## Player Interface

The `Player` interface is your main entry point.

```java
public interface Player {
    // Identity
    String getName();               // The player's display name
    UUID getUUID();                 // The unique, persistent ID (use this for storage!)
    
    // Location
    Location getLocation();         // Gets a copy of the current location
    World getWorld();               // Gets the world the player is currently in
    void teleport(Location location); // Instantly moves the player
    
    // Communication
    void sendMessage(String message);
    void sendActionBar(String message);
    void sendTitle(String title, String subtitle);
    
    // Permissions
    boolean hasPermission(String permission); // Check if player has a specific node
    
    // State
    boolean isOnline();             // Check if connection is still active
    boolean isFlying();             // Check flight ability
    void setFlying(boolean flying); // Toggle creative flight
    
    // Health
    double getHealth();
    double getMaxHealth();
    void setHealth(double health);
    void damage(double amount);
    
    // Inventory
    Inventory getInventory();       // Access player's items
}
```

## Getting Players

You can retrieve player objects from the server context.

### By Name
*Best for commands where a user types a name.*
```java
Player player = context.getServer().getPlayer("PlayerName");
if (player != null) {
    // Player is online
    player.sendMessage("Found you!");
} else {
    // Player is offline or doesn't exist
}
```

### By UUID
*Best for data storage (databases, configs) as names can theoretically change.*
```java
UUID uuid = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
Player player = context.getServer().getPlayer(uuid);
```

### All Online Players
*Useful for broadcasts or global operations.*
```java
for (Player player : context.getServer().getOnlinePlayers()) {
    player.sendMessage("Hello everyone!");
}
```

## Player Identity

> [!IMPORTANT]
> Always use **UUID** when saving player data (stats, money, homes). Player names are for display usage only.

```java
String name = player.getName();        // "Steve"
UUID uuid = player.getUUID();          // "123e4567-..."
```

## Location & Movement

### Get Location
`getLocation()` typically returns a **copy** of the location. Modifying the returned object won't move the player until you call `teleport()`.

```java
Location loc = player.getLocation();
double x = loc.getX();
double y = loc.getY();
double z = loc.getZ();
```

### Teleport
Teleportation is instant.

```java
// Teleport to specific coordinates
// Note: Location constructor takes (World, x, y, z)
Location dest = new Location(world, 100.5, 64.0, 200.5); // .5 centers on block
player.teleport(dest);

// Teleport to another player to simulate "tpa"
player.teleport(otherPlayer.getLocation());
```

### Flight
Manage creative-mode flight.

```java
if (player.hasPermission("server.fly")) {
    player.setFlying(true);
    player.sendMessage("Flight enabled!");
}
```

## Communication

### Messages
Standard chat box messages.

```java
// Supports standard color codes if your server handles them
player.sendMessage("&cAlert: &fServer restarting!");
```

### Action Bar
Text displayed just above the hotbar. Useful for non-intrusive status updates.

```java
// Will replace any existing action bar text
player.sendActionBar("Mining Progress: [|||||.....] 50%");
```

### Titles
Large text displayed in the center of the screen.
*Timing: 20 ticks = 1 second.*

```java
// Arguments: Title, Subtitle, FadeIn, Stay, FadeOut
player.sendTitle("VICTORY!", "You won the match", 10, 60, 10);
```

## Permissions
The permission system is string-based. Nodes are hierarchical (dot-separated).

```java
// Simple check
if (!player.hasPermission("admin.ban")) {
    player.sendMessage("§cYou do not have permission to ban players.");
    return;
}

// Hierarchical check (often handled by permission plugins)
// "admin.*" usually grants "admin.ban"
```

## Health & Damage

```java
// Heal player fully
player.setHealth(player.getMaxHealth());

// Deal damage (respects armor usually)
player.damage(5.0); 

// 'Kill' the player
player.setHealth(0);
```

## Inventory
See the [Inventory API](./inventory) for full details.

```java
Inventory inv = player.getInventory();

// Give an item
inv.addItem(new ItemStack(ItemType.DIAMOND_SWORD));

// Check hand
if (inv.getItemInMainHand().getType() == ItemType.MAP) {
    player.sendMessage("You are holding a map!");
}
```

## Example: Welcome System

A simple system that welcomes users on join.

```java
public class WelcomeListener {
    // Use a Set to track session data (cleared on restart)
    // For persistent data, see the Storage API
    private final Set<UUID> welcomed = new HashSet<>();
    
    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        
        // Check if we've seen this UUID this session
        if (welcomed.contains(player.getUUID())) {
            player.sendMessage("Welcome back, " + player.getName() + "!");
        } else {
            // First time this session
            player.sendTitle("Welcome!", "Enjoy your stay on Hytale Server");
            player.sendMessage("Type /help to get started!");
            
            // Play a sound (see Audio API)
            player.playSound("ui.toast.challenge_complete", 1.0f, 1.0f);
            
            welcomed.add(player.getUUID());
        }
    }
}
```
