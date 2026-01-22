# Best Practices

Writing a plugin that "works" is easy. Writing one that is readable, stable, and fast is a bit harder.

Here are some industry standards to make your code better.

## 1. Keep Your Main Class Clean

Your main class (`MyPlugin.java`) should **only** handle setup and cleanup. Don't put your command logic there!

### [BAD] Bad: Everything in one file
```java
public class MyPlugin extends Plugin {
    public void onEnable(Context ctx) {
        // ... 500 lines of command logic
    }
}
```

### [GOOD] Good: Organized structure
```java
public class MyPlugin extends Plugin {
    public void onEnable(Context ctx) {
        // Register classes
        registerCommands();
        registerEvents();
    }
}
```

---

## 2. Don't Freeze the Server

The main thread runs the game. If you pause it for even 0.05 seconds (50ms), players will feel lag.

**Dangerous Operations (Move to Async):**
- Connecting to a database (MySQL, MongoDB)
- Downloading files from the internet
- Reading/Writing large files to disk
- Heavy calculations (pathfinding, complex math)

Use `runAsync` for these! (See [Scheduling](./scheduling))

---

## 3. Manager Classes

Often you need to store data, like a player's money or stats. Don't use `static` variables everywhere! Use a **Manager** class.

```java
public class EconomyManager {
    private final Map<UUID, Double> balances = new HashMap<>();
    
    public void setBalance(Player p, double amount) {
        balances.put(p.getUuid(), amount);
    }
    
    public double getBalance(Player p) {
        return balances.getOrDefault(p.getUuid(), 0.0);
    }
}
```

Then create **one** instance of this in your main class and pass it around.

```java
public class MyPlugin extends Plugin {
    private EconomyManager economy;
    
    public void onEnable(Context ctx) {
        this.economy = new EconomyManager();
        
        // Pass it to commands
        ctx.getCommandManager().register(new PayCommand(economy));
    }
}
```

---

## 4. Clean Up Your Mess

When your plugin shuts down (`onDisable`), you must clean up.

- **Cancel Tasks:** Stop any repeating loops.
- **Save Data:** Write player stats to disk/database.
- **Close Connections:** Disconnect from the database.

If you don't do this, you might lose data or cause memory leaks!

```java
@Override
public void onDisable() {
    // Stop tasks
    scheduler.cancelAll();
    
    // Save data
    economyManager.saveAll();
    
    logger.info("Goodbye!");
}
```

---

## 5. Handle Errors Gracefully

Don't let your plugin crash the server just because one thing failed.

### [BAD] Bad
```java
public void onCommand() {
    // If config is null, this crashes the entire command!
    int value = config.get("value"); 
}
```

### [GOOD] Good
```java
public void onCommand() {
    if (config == null) {
        player.sendMessage("Error: Config not loaded!");
        return;
    }
    // ...
}
```

---

## Summary Checklist

Before releasing your plugin, check these:

- [ ] **Organization:** Are commands and events in their own files?
- [ ] **Performance:** No database/web calls on the main thread?
- [ ] **Safety:** Do we check for `null` before using things?
- [ ] **Cleanup:** Does `onDisable` save everything?
- [ ] **User Friendly:** Do commands send helpful error messages?

---

**That's it!** You have completed the guide. You are now ready to build amazing things in Hytale.

Go forth and create! 🚀
