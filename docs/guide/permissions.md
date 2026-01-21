# Permissions

Permissions control which players can access specific features of your plugin. This guide covers checking permissions and integrating with the server's permission system.

## Checking Permissions

### Basic Permission Check

```java
if (player.hasPermission("myplugin.admin")) {
    // Player has the permission
    player.sendMessage("Welcome, admin!");
}
```

### In Commands

```java
@Override
public void execute(CommandContext context) {
    Player player = context.getPlayer();
    
    if (!player.hasPermission("myplugin.teleport")) {
        player.sendMessage("You don't have permission to teleport!");
        return;
    }
    
    // Execute teleport
}
```

### Command Permission Property

Define required permission in the command:

```java
@Override
public String getPermission() {
    return "myplugin.mycommand";
}
```

The server automatically checks this before calling `execute()`.

## Permission Naming

Use a consistent naming scheme:

```
pluginname.feature
pluginname.feature.subfeature
pluginname.admin
```

Examples:
```
essentials.spawn
essentials.warp.create
essentials.warp.delete
essentials.admin
```

## Permission Hierarchy

Structure permissions hierarchically:

| Permission | Grants Access To |
|------------|------------------|
| `myplugin.*` | All plugin permissions |
| `myplugin.warp.*` | All warp-related permissions |
| `myplugin.warp.use` | Using warps |
| `myplugin.warp.create` | Creating warps |
| `myplugin.warp.delete` | Deleting warps |

## Server Permissions File

Players are granted permissions in `permissions.json`:

```json
{
  "players": {
    "PlayerName": {
      "permissions": [
        "myplugin.spawn",
        "myplugin.warp.use"
      ],
      "groups": ["default"]
    },
    "AdminPlayer": {
      "permissions": ["*"],
      "groups": ["admin"]
    }
  },
  "groups": {
    "default": {
      "permissions": [
        "myplugin.spawn",
        "myplugin.help"
      ]
    },
    "moderator": {
      "permissions": [
        "myplugin.warp.*",
        "myplugin.kick"
      ],
      "inherit": ["default"]
    },
    "admin": {
      "permissions": ["*"]
    }
  }
}
```

## Wildcard Permissions

The `*` permission grants access to everything:

```java
// This will return true for admins with "*" permission
player.hasPermission("any.permission.here")
```

Partial wildcards:
```
myplugin.*        // All myplugin permissions
myplugin.warp.*   // All warp permissions
```

## Negating Permissions

Prefix with `-` to deny:

```json
{
  "permissions": [
    "myplugin.*",
    "-myplugin.admin"
  ]
}
```

This grants all `myplugin` permissions except `myplugin.admin`.

## Permission-Based Features

### Show Different Messages

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    Player player = event.getPlayer();
    
    if (player.hasPermission("myplugin.vip")) {
        broadcastMessage("VIP " + player.getName() + " has joined!");
    } else {
        broadcastMessage(player.getName() + " has joined!");
    }
}
```

### Feature Toggles

```java
public void handleTeleport(Player player, Location destination) {
    // Check for instant teleport permission
    if (player.hasPermission("myplugin.teleport.instant")) {
        player.teleport(destination);
        return;
    }
    
    // Normal players get a delay
    player.sendMessage("Teleporting in 3 seconds...");
    scheduleDelayedTeleport(player, destination, 3);
}
```

### Command Subpermissions

```java
@Override
public void execute(CommandContext context) {
    Player player = context.getPlayer();
    String subcommand = context.getArgs()[0];
    
    switch (subcommand) {
        case "create":
            if (!player.hasPermission("myplugin.warp.create")) {
                player.sendMessage("No permission!");
                return;
            }
            handleCreate(player);
            break;
            
        case "delete":
            if (!player.hasPermission("myplugin.warp.delete")) {
                player.sendMessage("No permission!");
                return;
            }
            handleDelete(player);
            break;
    }
}
```

## Best Practices

### Document Permissions

Create a reference for server admins:

| Permission | Description | Default |
|------------|-------------|---------|
| `myplugin.spawn` | Use /spawn command | Everyone |
| `myplugin.spawn.instant` | No teleport delay | OP only |
| `myplugin.warp.use` | Use warps | Everyone |
| `myplugin.warp.create` | Create warps | OP only |
| `myplugin.admin` | Admin commands | OP only |

### Default Permissions

Handle missing permissions gracefully:

```java
// Bad: assumes permission exists
boolean canUse = player.hasPermission("myplugin.feature");

// Good: explicit default
boolean canUse = player.hasPermission("myplugin.feature");
if (!hasExplicitPermission(player, "myplugin.feature")) {
    canUse = true; // Default to allowed
}
```

### Check Early

Check permissions at the start of command execution:

```java
@Override
public void execute(CommandContext context) {
    // Check permission first
    if (!context.getPlayer().hasPermission("myplugin.admin")) {
        context.getPlayer().sendMessage("No permission!");
        return;
    }
    
    // Now do the actual work
    String[] args = context.getArgs();
    // ... rest of command logic
}
```

## Example: Role-Based Access

```java
public class RoleManager {
    
    public boolean canModify(Player player, Location location) {
        // Admins can modify anywhere
        if (player.hasPermission("myplugin.admin")) {
            return true;
        }
        
        // Moderators can modify in specific zones
        if (player.hasPermission("myplugin.moderator")) {
            return isModeratorZone(location);
        }
        
        // Regular players can only modify their own areas
        if (player.hasPermission("myplugin.build")) {
            return isOwnedBy(player, location);
        }
        
        return false;
    }
}
```
