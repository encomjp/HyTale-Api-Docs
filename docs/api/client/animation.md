# Animation API

Trigger animations on entities and items.

## Verified Classes
- `com.hypixel.hytale.protocol.packets.entities.PlayAnimation`

## Entity Animations

Models in Hytale have named animations defined in their `.model` files (e.g. `walk`, `attack_A`, `death`).

### Playing an Animation
You can force an entity to play an animation sequence.

```java
// "attack_swipe" must exist in the model's json
server.sendToAll(new PlayAnimation(entity.getId(), "attack_swipe"));
```

### Blending
Animations can transition smoothly.

```java
// Blend over 0.5 seconds
server.sendToAll(new PlayAnimation(entity.getId(), "emote_wave", 0.5f)); 
```

## Animation States (State Machine)

Instead of manually playing `walk`, entities typically use a **State Machine**. You set the state variable, and the client handles the loop.

```java
// Valid states: IDLE, LOCOMOTION, JUMP, FALL
entity.setAnimationState("LOCOMOTION"); 
// Client sees velocity > 0 ? Run : Walk
```

## Item Animations

First-person animations for holding items.

```java
ItemPlayerAnimations config = new ItemPlayerAnimations();
config.setAttack("swing_heavy"); // Slower swing for hammers
config.setHold("hold_two_handed"); // Hold with both hands
```
