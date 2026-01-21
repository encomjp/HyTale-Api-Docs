# Scheduler API

Run code asynchronously, with delays, or on repeating intervals.

> [!IMPORTANT]
> **Threading Rule**: The Hytale server is logic-threaded. **Never** access the World or Entities from an async thread. Use the scheduler to return to the main thread.

## Verified Classes
- `com.hypixel.hytale.server.core.task.TaskRegistry`
- `com.hypixel.hytale.server.core.task.TaskRegistration`

## Running Tasks

### Immediate (Next Tick)
Safe way to run logic "very soon".

```java
scheduler.runTask(() -> {
    player.sendMessage("Process complete.");
});
```

### Delayed Task
Run once after a specific delay (in ticks).
*20 ticks = 1 second.*

```java
// Run after 3 seconds (60 ticks)
scheduler.runLater(() -> {
    player.teleport(spawn);
}, 60);
```

### Repeating Task
Run continuously at a set interval. Useful for timers, regen, or checks.

```java
// Args: Delay, Interval
// Run immediately (0 delay), then every 1 second (20 ticks)
TaskToken task = scheduler.runRepeating(() -> {
    player.sendActionBar("Time: " + System.currentTimeMillis());
}, 0, 20);
```

### Async Task
Run heavy calculations (Database, Web Request, Pathfinding) off the main thread to prevent lag.

```java
scheduler.runAsync(() -> {
    // 1. Heavy lifting (OFF MAIN THREAD)
    // Safe: Java logic, Database, Network
    // UNSAFE: player.teleport(), world.setBlock()
    PlayerData data = database.loadPlayer(player.getUUID());
    
    // 2. Return to Main Thread to apply
    scheduler.runTask(() -> {
        // Safe again
        applyData(player, data);
    });
});
```

## Cancelling Tasks
Keep the `TaskToken` returned when scheduling to cancel it later.

```java
TaskToken timer = scheduler.runRepeating(...);

// Stop the timer
timer.cancel();
```
