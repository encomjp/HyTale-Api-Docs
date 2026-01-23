# Performance & Metrics

Monitoring server health, memory, and optimizing your code.

## Monitoring Metrics
Hytale servers run on the JVM (Java Virtual Machine) but use **Netty** for high-performance networking, which manages its own "Off-Heap" memory.

### Memory Types
1.  **Heap Memory**: Where your Java objects live (`ArrayList`, `String`, `Entity`). Managed by Garbage Collector.
2.  **Direct Memory**: Where network packets and file buffers live. Managed by Netty.

### Checking Usage
```java
// Check Direct Memory (Netty)
long directMem = io.netty.util.internal.PlatformDependent.usedDirectMemory();
long directMB = directMem / 1024 / 1024;

// Check Heap Memory (Java)
long heapMem = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
long heapMB = heapMem / 1024 / 1024;

logger.info("RAM Usage - Heap: " + heapMB + "MB | Direct: " + directMB + "MB");
```

## Optimization Tips

### 1. Avoid Blocking the Main Thread
The Hytale server is logic-threaded. If you sleep or wait, the **whole server stops**.
- **Bad**: `Thread.sleep(1000)` or querying a Database.
- **Good**: Use the [Scheduler](/api/systems/scheduler) to run async.

### 2. Bulk Block Updates
Setting blocks one-by-one triggers lighting updates every time.
- **Bad**: Loop 10,000 times calling `world.setBlock()`.
- **Good**: Use `world.getChunk().setBlock()` to edit data directly, then trigger one update.

### 3. Entity Counts
Entities are expensive. They check collision, pathfinding, and AI every tick.
- Keep basic mobs (Cows, Zombies) under 100 per chunk.
- Use `Marker` entities (no AI) for static visuals.
