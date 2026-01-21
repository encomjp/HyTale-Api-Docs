# Titles & UI API

Display large on-screen titles, action bars, and manage UI elements.

## Verified Classes
- `com.hypixel.hytale.protocol.packets.interface_.ShowEventTitle`
- `com.hypixel.hytale.server.core.util.EventTitleUtil`

## Titles

Titles are large text overlays in the center of the screen, useful for announcements, round starts, or welcome messages.

### Show Title
```java
// param1: Title (Big text)
// param2: Subtitle (Smaller text below)
player.sendTitle("VICTORY", "Red Team Wins!");
```

### Timed Titles
Control fully how long the title stays. Time is in **ticks** (20 ticks = 1 second).

```java
// FadeIn: 10 ticks (0.5s)
// Stay:   60 ticks (3.0s)
// FadeOut: 10 ticks (0.5s)
player.sendTitle("Alert", "Intruder Detected", 10, 60, 10);
```

### Clear Title
Immediately remove any title on screen.
```java
player.clearTitle();
```

## Action Bar
Text displayed in the small area just above the hotbar. Excellent for low-distraction info (mana, ammo, cooldowns).

```java
player.sendActionBar("Mana: [|||||.....] 50/100");
```

## Examples

### Countdown
Using the Scheduler API to update a title.

```java
public void startCountdown(Player player) {
    // Show "3"
    player.sendTitle("3", "");
    
    // Schedule "2" in 1 second (20 ticks)
    scheduler.runLater(() -> player.sendTitle("2", ""), 20);
    
    // Schedule "1" in 2 seconds (40 ticks)
    scheduler.runLater(() -> player.sendTitle("1", ""), 40);
    
    // Schedule "GO!" in 3 seconds (60 ticks)
    scheduler.runLater(() -> player.sendTitle("GO!", ""), 60);
}
```
