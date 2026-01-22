# Debugging Guide

Complete guide to debugging Hytale plugins effectively.

## Remote Debugging Setup

### IntelliJ IDEA Setup

**1. Configure Remote Debug**

```
Run → Edit Configurations → Add New → Remote JVM Debug

Settings:
- Name: Hytale Server Debug
- Host: localhost
- Port: 5005
- Command line: -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005
```

**2. Start Server with Debug Flags**

```powershell
# Windows PowerShell
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 `
     -jar HytaleServer.jar -assets "../Assets.zip"
```

```bash
# Linux
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
     -jar HytaleServer.jar -assets "../Assets.zip"
```

**3. Attach Debugger**

In IntelliJ: `Run → Debug 'Hytale Server Debug'`

### VS Code Setup

**1. Create launch.json**

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "name": "Attach to Hytale",
            "request": "attach",
            "hostName": "localhost",
            "port": 5005
        }
    ]
}
```

**2. Start Debugging**

Press F5 or Run → Start Debugging

## Breakpoint Strategies

### Conditional Breakpoints

```java
@EventHandler
public void onBlockBreak(BlockBreakEvent event) {
    // Set breakpoint on next line with condition:
    // Condition: event.getPlayer().getName().equals("YourName")
    Block block = event.getBlock();
    
    // Debugger will only stop when YOU break a block
    doSomething(block);
}
```

### Log Points (No Stopping)

Instead of stopping execution, log values:

```java
// Right-click breakpoint → More → Log
// Expression: "Player: " + event.getPlayer().getName() + " broke: " + event.getBlock().getType()
```

## Logging Best Practices

### Logging Levels

```java
public class MyPlugin implements Plugin {
    private PluginLogger logger;
    
    @Override
    public void onEnable(PluginContext context) {
        this.logger = context.getLogger();
        
        // TRACE - Very detailed, typically disabled in production
        logger.trace("Checking player data for UUID: " + uuid);
        
        // DEBUG - Detailed info for debugging, disabled in production
        logger.debug("Loading configuration file: " + configFile);
        
        // INFO - General informational messages
        logger.info("Plugin enabled successfully!");
        
        // WARN - Warning messages, potential issues
        logger.warn("Configuration missing, using defaults");
        
        // ERROR - Error messages, recoverable issues
        logger.error("Failed to load player data", exception);
        
        // FATAL - Severe errors, unrecoverable
        // (Usually not used in plugins, server-level only)
    }
}
```

### Structured Logging

```java
// [BAD] - Hard to search/filter
logger.info("Player Steve broke stone at 100,64,200");

// [GOOD] - Structured and searchable
logger.info("Block broken", 
    "player", player.getName(),
    "block", block.getType(),
    "location", String.format("(%d,%d,%d)", x, y, z)
);

// Even better - Use consistent prefixes
logger.info("[BlockTracker] Player: {}, Block: {}, Loc: ({},{},{})",
    player.getName(), block.getType(), x, y, z
);
```

### Performance-Conscious Logging

```java
// [BAD] - String concatenation always happens
logger.debug("Expensive operation: " + expensiveMethod());

// [GOOD] - Only execute if debug is enabled
if (logger.isDebugEnabled()) {
    logger.debug("Expensive operation: " + expensiveMethod());
}

// BEST - Use parameterization (lazy evaluation)
logger.debug("Expensive operation: {}", () -> expensiveMethod());
```

## Stack Trace Analysis

### Reading Stack Traces

```
java.lang.NullPointerException: Cannot invoke "Player.getName()" because "player" is null
    at com.example.MyPlugin.onBlockBreak(MyPlugin.java:45)
    at com.hypixel.hytale.event.EventBus.fire(EventBus.java:123)
    at com.hypixel.hytale.server.WorldManager.breakBlock(WorldManager.java:456)
```

**Reading from bottom to top**:
1. `WorldManager.breakBlock` - Server code breaks block
2. `EventBus.fire` - Event system calls handlers
3. `MyPlugin.onBlockBreak:45` - **YOUR CODE** - Error here!

**Line 45 is the problem**: `player` is null

### Common Stack Trace Patterns

#### NullPointerException
```
Cause: Trying to use a null object
Fix: Add null check before using

if (player != null) {
    player.getName();
}
```

#### ClassCastException
```
Cause: Wrong type cast
Fix: Check type before casting

if (entity instanceof Player) {
    Player player = (Player) entity;
}
```

#### ConcurrentModificationException
```
Cause: Modifying collection while iterating
Fix: Use iterator's remove or copy collection

// [BAD]
for (Player p : players) {
    if (p.isOffline()) {
        players.remove(p); // CRASH!
    }
}

// [GOOD]
players.removeIf(Player::isOffline);
```

## Common Debugging Scenarios

### Event Not Firing

**Checklist**:
1. [CHECK] Is event handler registered? Check `onEnable()`
2. [CHECK] Is method public? `public void onEvent...`
3. [CHECK] Has `@EventHandler` annotation?
4. [CHECK] Correct event type? Check imports
5. [CHECK] Event might be cancelled by another plugin?

**Debug**:
```java
@EventHandler(priority = EventPriority.MONITOR)
public void debugEvent(PlayerJoinEvent event) {
    // Use MONITOR to run last, even if cancelled
    logger.info("PlayerJoinEvent fired! Cancelled: " + event.isCancelled());
}
```

### Commands Not Working

**Checklist**:
1. [CHECK] Command registered in `onEnable()`?
2. [CHECK] Correct command name?
3. [CHECK] Player has permission?
4. [CHECK] Check for typos in command syntax

**Debug**:
```java
@Override
public void onEnable(PluginContext context) {
    CommandManager cmd = context.getCommandManager();
    
    MyCommand command = new MyCommand();
    cmd.register(command);
    
    // Verify registration
    logger.info("Registered command: " + command.getName());
    logger.info("Aliases: " + Arrays.toString(command.getAliases()));
}
```

### Data Not Persisting

**Debug data saving**:
```java
public void savePlayerData(UUID uuid) {
    File file = new File(dataFolder, uuid + ".json");
    
    logger.debug("Saving to: " + file.getAbsolutePath());
    logger.debug("File exists: " + file.exists());
    logger.debug("Can write: " + file.canWrite());
    
    try {
        FileWriter writer = new FileWriter(file);
        writer.write(data.toJSON());
        writer.close();
        
        logger.info("Successfully saved data for: " + uuid);
        
        // Verify file was written
        long fileSize = file.length();
        logger.debug("File size: " + fileSize + " bytes");
        
    } catch (IOException e) {
        logger.error("Failed to save data!", e);
        logger.error("File path: " + file.getAbsolutePath());
        logger.error("Parent dir exists: " + file.getParentFile().exists());
    }
}
```

## Memory Leak Detection

### Finding Leaks

**Symptom**: Server slows down over time, eventually crashes with OutOfMemoryError

**Common causes**:
1. Not removing players from maps on quit
2. Infinite repeating tasks
3. Large collections growing unbounded

**Detection**:
```java
// Log collection sizes periodically
scheduler.runRepeating(() -> {
    logger.info("Active players in cache: " + playerCache.size());
    logger.info("Pending tasks: " + tasks.size());
    logger.info("Loaded chunks: " + world.getLoadedChunks().size());
    
    // Warn if suspiciously large
    if (playerCache.size() > 1000) {
        logger.warn("Player cache is very large! Possible memory leak!");
    }
    
    return false;
}, 6000); // Every 5 minutes
```

### Heap Dump Analysis

When server crashes with OutOfMemoryError:

```bash
# Start server with heap dump on OOM
java -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/path/to/dumps \
     -jar HytaleServer.jar
```

Analyze dump with:
- VisualVM
- MAT (Eclipse Memory Analyzer)
- JProfiler

## Plugin Conflict Debugging

### Identify Conflicts

```java
@EventHandler(priority = EventPriority.MONITOR)
public void logEventChain(PlayerJoinEvent event) {
    // Log all plugins that handled this event
    logger.info("=== PlayerJoinEvent Processing ===");
    logger.info("Final join message: " + event.getJoinMessage());
    logger.info("Was cancelled: " + event.isCancelled());
    
    // Check which plugin cancelled it
    if (event.isCancelled()) {
        logger.warn("Event was cancelled by another plugin!");
    }
}
```

### Load Order Issues

If Plugin B depends on Plugin A:

```yaml
# plugin.yml for Plugin B
name: PluginB
depend:
  - PluginA  # Load after PluginA
```

## Testing in Development

### Unit Testing Setup

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class MyPluginTest {
    
    private MyPlugin plugin;
    private PluginContext mockContext;
    private PluginLogger mockLogger;
    
    @BeforeEach
    public void setup() {
        plugin = new MyPlugin();
        
        // Mock dependencies
        mockContext = mock(PluginContext.class);
        mockLogger = mock(PluginLogger.class);
        
        when(mockContext.getLogger()).thenReturn(mockLogger);
    }
    
    @Test
    public void testPluginEnable() {
        plugin.onEnable(mockContext);
        
        // Verify logger was called
        verify(mockLogger).info(contains("enabled"));
    }
    
    @Test
    public void testPlayerStats() {
        UUID uuid = UUID.randomUUID();
        PlayerStats stats = plugin.getPlayerStats(uuid);
        
        assertNotNull(stats);
        assertEquals(uuid, stats.getUuid());
        assertEquals(0, stats.getBlocksBroken());
    }
}
```

### Integration Testing

```java
// Create test server instance
public class IntegrationTest {
    
    private TestServer server;
    private MyPlugin plugin;
    
    @BeforeEach
    public void setupServer() {
        server = new TestServer();
        plugin = new MyPlugin();
        
        server.getPluginManager().load(plugin);
        server.start();
    }
    
    @Test
    public void testPlayerJoin() {
        TestPlayer player = server.joinPlayer("TestPlayer");
        
        // Verify stats were created
        PlayerStats stats = plugin.getPlayerStats(player.getUUID());
        assertNotNull(stats);
        
        player.breakBlock(new Location(server.getWorld(), 0, 64, 0));
        
        assertEquals(1, stats.getBlocksBroken());
    }
    
    @AfterEach
    public void shutdownServer() {
        server.stop();
    }
}
```

## Performance Profiling

### JVM Profiling

```bash
# Start with profiling enabled
java -agentpath:/path/to/yourkit/bin/libyjpagent.so \
     -jar HytaleServer.jar
```

### Simple Timing

```java
public class PerformanceTimer {
    private final Map<String, Long> timers = new HashMap<>();
    
    public void start(String name) {
        timers.put(name, System.nanoTime());
    }
    
    public void end(String name) {
        Long start = timers.remove(name);
        if (start != null) {
            long elapsed = System.nanoTime() - start;
            double ms = elapsed / 1_000_000.0;
            
            logger.debug("{} took {}ms", name, String.format("%.2f", ms));
            
            if (ms > 50) {
                logger.warn("{} is slow! Took {}ms", name, String.format("%.2f", ms));
            }
        }
    }
}

// Usage
timer.start("database-query");
PlayerData data = database.query(...);
timer.end("database-query");
```

## Troubleshooting Checklist

### Plugin Won't Load

- [ ] Check server logs for error messages
- [ ] Verify plugin.yml exists and is valid
- [ ] Check Java version compatibility
- [ ] Ensure all dependencies are loaded
- [ ] Verify JAR file isn't corrupted

### Events Not Working

- [ ] Event handler is public
- [ ] Has @EventHandler annotation
- [ ] Listener is registered in onEnable()
- [ ] Event import is correct
- [ ] Check event priority and cancellation

### Commands Not Responding

- [ ] Command registered in onEnable()
- [ ] Check command name/aliases
- [ ] Verify player permissions
- [ ] Check console for errors
- [ ] Test from console (if applicable)

### Data Loss

- [ ] Verify save() is called on quit
- [ ] Check file permissions
- [ ] Ensure directory exists
- [ ] Check for exceptions in logs
- [ ] Verify JSON/data format

---

**Tools Mentioned**:
- IntelliJ IDEA (Debugger)  
- VS Code (Java Debug Extension)
- VisualVM (Memory/CPU Profiler)
- JProfiler (Advanced Profiler)
- JUnit 5 (Testing)
- Mockito (Mocking)
