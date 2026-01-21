# Scheduling Tasks

Learn how to schedule delayed and repeating tasks in your plugin.

## Basic Scheduling

### Delayed Tasks

Run code after a delay:

```java
// Run after 20 ticks (1 second at 20 TPS)
context.getScheduler().runLater(() -> {
    player.sendMessage("1 second has passed!");
}, 20);

// Run after 3 seconds (60 ticks)
context.getScheduler().runLater(() -> {
    player.teleport(destination);
    player.sendMessage("Teleported!");
}, 60);
```

### Repeating Tasks

Run code repeatedly:

```java
// Run every second (20 ticks)
ScheduledTask task = context.getScheduler().runRepeating(() -> {
    updateScoreboard();
}, 20);

// Run every 5 minutes (6000 ticks)
context.getScheduler().runRepeating(() -> {
    saveAllData();
}, 6000);
```

### Cancelling Tasks

```java
// Store the task reference
ScheduledTask task = context.getScheduler().runRepeating(() -> {
    // ...
}, 20);

// Cancel later
task.cancel();
```

## Common Patterns

### Countdown Timer

```java
public void startCountdown(Player player, int seconds) {
    final int[] remaining = {seconds};
    
    ScheduledTask task = context.getScheduler().runRepeating(() -> {
        if (remaining[0] <= 0) {
            player.sendMessage("Go!");
            return;
        }
        
        player.sendMessage(remaining[0] + "...");
        remaining[0]--;
    }, 20); // Every second
    
    // Auto-cancel after countdown
    context.getScheduler().runLater(() -> {
        task.cancel();
    }, (seconds + 1) * 20);
}
```

### Delayed Teleport with Cancellation

```java
public class TeleportManager {
    private final Map<UUID, ScheduledTask> pendingTeleports = new HashMap<>();
    
    public void scheduleTeleport(Player player, Location dest, int delaySeconds) {
        // Cancel existing teleport
        cancelTeleport(player);
        
        player.sendMessage("Teleporting in " + delaySeconds + " seconds...");
        
        ScheduledTask task = context.getScheduler().runLater(() -> {
            pendingTeleports.remove(player.getUUID());
            player.teleport(dest);
            player.sendMessage("Teleported!");
        }, delaySeconds * 20);
        
        pendingTeleports.put(player.getUUID(), task);
    }
    
    public void cancelTeleport(Player player) {
        ScheduledTask task = pendingTeleports.remove(player.getUUID());
        if (task != null) {
            task.cancel();
            player.sendMessage("Teleport cancelled!");
        }
    }
    
    public boolean hasPendingTeleport(Player player) {
        return pendingTeleports.containsKey(player.getUUID());
    }
}
```

### Auto-Save

```java
@Override
public void onEnable(PluginContext context) {
    // Auto-save every 5 minutes
    context.getScheduler().runRepeating(() -> {
        saveAllData();
        context.getLogger().info("Data auto-saved");
    }, 6000); // 5 minutes in ticks
}
```

### Cleanup Old Data

```java
// Clean up expired data every hour
context.getScheduler().runRepeating(() -> {
    long now = System.currentTimeMillis();
    long oneHourAgo = now - (60 * 60 * 1000);
    
    pendingRequests.entrySet().removeIf(entry -> 
        entry.getValue().getTimestamp() < oneHourAgo
    );
    
    context.getLogger().info("Cleaned up expired requests");
}, 72000); // 1 hour in ticks
```

## Async Tasks

For blocking operations (database, file I/O, HTTP):

```java
// Run on a separate thread
CompletableFuture.runAsync(() -> {
    // This runs off the main thread
    PlayerData data = loadFromDatabase(player.getUUID());
    
    // Switch back to main thread for game operations
    context.getScheduler().runSync(() -> {
        applyPlayerData(player, data);
    });
});
```

### Async with Return Value

```java
public CompletableFuture<PlayerData> loadPlayerData(UUID uuid) {
    return CompletableFuture.supplyAsync(() -> {
        // Load from database (blocking)
        return database.loadPlayer(uuid);
    });
}

// Usage
loadPlayerData(player.getUUID())
    .thenAccept(data -> {
        context.getScheduler().runSync(() -> {
            applyData(player, data);
        });
    })
    .exceptionally(error -> {
        context.getLogger().error("Failed to load data", error);
        return null;
    });
```

## Ticks and Time

Hytale runs at 20 ticks per second (TPS):

| Time | Ticks |
|------|-------|
| 50ms | 1 |
| 1 second | 20 |
| 1 minute | 1,200 |
| 5 minutes | 6,000 |
| 1 hour | 72,000 |

## Best Practices

### Cancel on Disable

Always cancel tasks when your plugin disables:

```java
public class MyPlugin implements Plugin {
    private final List<ScheduledTask> tasks = new ArrayList<>();
    
    @Override
    public void onEnable(PluginContext context) {
        tasks.add(context.getScheduler().runRepeating(this::autoSave, 6000));
        tasks.add(context.getScheduler().runRepeating(this::cleanup, 72000));
    }
    
    @Override
    public void onDisable() {
        // Cancel all scheduled tasks
        tasks.forEach(ScheduledTask::cancel);
        tasks.clear();
    }
}
```

### Handle Offline Players

Check if player is still online in delayed tasks:

```java
context.getScheduler().runLater(() -> {
    if (!player.isOnline()) {
        return; // Player left, skip
    }
    
    player.sendMessage("Delayed message!");
}, 100);
```

### Avoid Long-Running Tasks

Keep scheduled tasks fast:

```java
// Bad: blocks the main thread
context.getScheduler().runRepeating(() -> {
    saveToDatabase(); // Slow operation!
}, 200);

// Good: run blocking operations async
context.getScheduler().runRepeating(() -> {
    CompletableFuture.runAsync(this::saveToDatabase);
}, 200);
```
