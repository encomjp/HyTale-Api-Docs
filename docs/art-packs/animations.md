# Animations

Animations bring your models to life. Walking, attacking, eating—it's all animation.

## How it Works

Animations are timelines. You set "poses" at specific times (Keyframes), and the game saves the movement between them.

```mermaid
graph LR
    Pose1[Pose A (0s)] -->|Smooth Transition| Pose2[Pose B (1s)]
    Pose2 -->|Smooth Transition| Pose3[Pose A (2s)]
```

This creates a looping animation (A -> B -> A).

---

## 1. Creating Animations

You also use **Blockbench** for this!

1. Switch to the **"Animate"** tab in Blockbench.
2. Create a new Animation (e.g., `walk`).
3. Move the time cursor involved.
4. Move your model's body parts.
5. Click **"Add Keyframe"**.

Repeat this until you have a smooth motion.

---

## 2. Animation Types

| Type | Name | When it Runs |
|------|------|--------------|
| **Idle** | `idle` | When the entity is standing still. |
| **Walk** | `walk` | When moving. |
| **Attack** | `attack` | When swinging a weapon. |
| **Death** | `death` | When health hits 0. |

Naming your animations correctly allows Hytale to automatically trigger them!

---

## 3. Controlling via Code

Sometimes you want a custom animation (like `dance`).

```java
public void makeDance(Entity entity) {
    // Force play an animation
    entity.playAnimation("dance");
}
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **Stiff Movement** | No interpolation | Make sure interpolation is set to "Linear" or "Smooth". |
| **Parts Floating** | Wrong hierarchy | Parent bones correctly (Hand attached to Arm, Arm to Body). |
| **Not Playing** | Wrong name | Check if the animation name matches your code exactly. |

---

## Summary

You have now mastered Art Packs! You can make textures, models, and animations.

Check out **Resource Packs** to change sounds and text:

→ **Next: [Resource Packs](../resource-packs/)**
