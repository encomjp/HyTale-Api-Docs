# Effects API

Apply visual and status effects.

## Verified Classes
- `com.hypixel.hytale.protocol.EntityEffect`
- `com.hypixel.hytale.protocol.packets.camera.CameraShakeEffect`

## Status Effects (Potions)

Apply functional effects like Speed, Poison, or Regeneration.

```java
// Type, Duration (ticks), Amplifier (strength)
// Amplifier 0 = Level 1, Amplifier 1 = Level 2
EntityEffect speed = new EntityEffect("speed", 200, 1); // Speed II for 10s
player.addEffect(speed);
```

### Clearing Effects
```java
if (player.hasEffect("poison")) {
    player.removeEffect("poison");
}
```

## Camera Effects

### Camera Shake
Simulate impact, explosions, or earthquakes.

```java
// Intensity: 0.0 - 1.0
// Duration: Ticks
CameraShakeEffect shake = new CameraShakeEffect(0.5f, 20, CameraShakeEffect.Type.EXPLOSION);
player.sendPacket(shake);
```

## Environmental Effects

### Reverb (Echo)
Change how audio sounds in a region (Cave, Hallway, Underwater).

```java
ReverbEffect reverb = new ReverbEffect("cave");
// Can be sent to player or applied to a region
player.sendPacket(new UpdateReverbEffects(reverb));
```
