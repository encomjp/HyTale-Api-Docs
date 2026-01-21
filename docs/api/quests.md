# Quests API (Objectives)

Create missions, sidebar objectives, and track player progress.

## Concept
The **Objectives System** handles the "Quest Log" or "Sidebar" you see on the HUD. It is purely visual and state-based.
- **Objective**: The main quest (e.g., "Main Story: Chapter 1").
- **Task**: A sub-goal (e.g., "Find the key").

## Verified Classes
- `com.hypixel.hytale.protocol.Objective`
- `com.hypixel.hytale.protocol.ObjectiveTask`
- `com.hypixel.hytale.protocol.packets.assets.TrackOrUpdateObjective`

## Workflow

### 1. Define the Objective
Create the quest container.

```java
// 'quest_id' must be unique per player session
Objective quest = new Objective("custom_quest_dragon");

// Title matches the header on the HUD
quest.setTitle("Slay the Dragon");
quest.setDescription("Travel to the End and defeat the beast.");
```

### 2. Add Tasks
Tasks are the checkboxes.

```java
// Task ID, Description
ObjectiveTask findPortal = new ObjectiveTask("task_portal", "Find the Stronghold");
ObjectiveTask enterPortal = new ObjectiveTask("task_enter", "Enter the End Portal");

// Add them to the quest
quest.addTask(findPortal);
quest.addTask(enterPortal);
```

### 3. Send to Player
The server must tell the client to "track" this objective.

```java
// This packet opens the HUD widget
player.sendPacket(new TrackOrUpdateObjective(quest));
```

## Updating Progress
When a player completes a step, update the specific task.

```java
// 1. Mark task as done
findPortal.setComplete(true);

// 2. Send update packet (More efficient than re-sending the whole objective)
player.sendPacket(new UpdateObjectiveTask(quest.getId(), findPortal));
```

## Cleaning Up
When the quest is done, remove it from the screen.

```java
// Remove the widget
player.sendPacket(new UntrackObjective(quest.getId()));

// Celebrate!
player.sendTitle("Quest Complete!", "You slew the dragon!");
```
