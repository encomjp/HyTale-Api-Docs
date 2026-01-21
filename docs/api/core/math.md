# Math API

Vector math utilities used throughout the engine.

## Verified Classes
- `com.hypixel.hytale.math.vector.Vector3d` (Doubles)
- `com.hypixel.hytale.math.vector.Vector3i` (Integers)
- `com.hypixel.hytale.math.vector.VectorBoxUtil`

## Vectors
Hytale uses its own math library, not AWT or JOML.

### Vector3d
Used for precise world coordinates and velocity.

```java
Vector3d v1 = new Vector3d(1.0, 2.0, 3.0);
Vector3d v2 = new Vector3d(0.5, 0.0, 0.5);

// Add
Vector3d v3 = v1.add(v2);

// Multiply/Scale
Vector3d scaled = v1.mul(2.0);

// Distance
double dist = v1.distance(v2);

// Normalization (Direction)
Vector3d dir = v1.normalize();
```

### Vector3i
Used for block coordinates.

```java
Vector3i pos = new Vector3i(10, 64, 10);
Vector3i up = pos.add(0, 1, 0);
```

## Utilities

### Bounding Boxes
Check for intersections using `VectorBoxUtil`.

```java
// Check if two boxes overlap
boolean overlap = VectorBoxUtil.intersects(box1Min, box1Max, box2Min, box2Max);
```

### Spheres
Simple distance checks optimized.

```java
// Check if point is inside sphere radius
boolean inside = VectorSphereUtil.contains(center, radius, point);
```
