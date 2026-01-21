# System Modules API

Understanding the core Hytale architecture.

## Concept: The Module System
Hytale's server is built on a "Module" architecture. Unlike Spigot where everything is in `Bukkit.class`, functionality is split into focused Modules.
- **Why?** It isolates systems. The `PhysicsModule` doesn't need to know about `ChatModule`.
- **For You**: As a plugin developer, you often interact with these modules to access low-level features.

## Verified Core Modules
- `EntityModule`: Spawning, tracking, and migrating entities.
- `BlockModule`: Block state management and updates.
- `FlyCameraModule`: Handling player camera states.
- `DamageModule`: Calculating damage and resistance logic.

## Interacting with Modules

### Accessing a Module
Modules are singletons stored in the Server context.

```java
// 1. Get the module registry (Context)
Server server = context.getServer();

// 2. Retrieve the specific module
EntityModule entityModule = server.getModule(EntityModule.class);

// 3. Use internal methods
// (Careful! These methods might bypass standard event checks)
entityModule.forceMigration(oldEntity); 
```

## Creating Custom Modules
*Advanced Use Only*
You can register your own Module to hook into the server's main tick loop.

```java
public class MyCustomPhysicsModule extends Module {
    @Override
    public void onTick() {
        // Runs every server tick (50ms)
        // High performance cost if abused!
    }
}
```
