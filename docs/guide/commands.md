# Commands

Commands allow players to interact with your plugin using chat. This guide covers creating, registering, and handling commands.

## Basic Command

### Creating a Command Class

Classes usually extend `AbstractCommand` or implement a command interface.

```java
import com.hypixel.hytale.server.core.command.system.AbstractCommand;
import com.hypixel.hytale.server.core.command.system.CommandContext;

public class HelloCommand extends AbstractCommand {
    
    public HelloCommand() {
        super("hello"); // Command name
    }
    
    // Description shown in help menus
    @Override
    public String getDescription() {
        return "Says hello to the player";
    }
    
    // This method runs when a player executes the command
    @Override
    public void execute(CommandContext context) {
        // Get the player who executed the command
        // Note: Check context.isPlayer() if console support is needed
        var player = context.getPlayer();
        
        // Send a personalized message back to the player
        player.sendMessage("Hello, " + player.getName() + "!");
    }
}
```

### Registering Commands

Register commands in your plugin's `start()` method:

```java
import com.hypixel.hytale.server.core.command.system.CommandManager;

@Override
public void start() {
    // Get the command manager (method access may vary)
    CommandManager cmdManager = this.getCommandManager(); 
    // OR HytaleServer.get().getCommandManager();
    
    // Register your command instances
    cmdManager.register(new HelloCommand());
}
```

## Command Arguments

Access command arguments from the context:

```java
@Override
public void execute(CommandContext context) {
    // Get the command arguments (everything after /give)
    String[] args = context.getArgs();
    
    if (args.length < 1) {
        context.getPlayer().sendMessage("Usage: /greet <name>");
        return;
    }
    
    String targetName = args[0];
    context.getPlayer().sendMessage("Hello " + targetName);
}
```

## Permissions

Check permissions before executing:

```java
@Override
public void execute(CommandContext context) {
    var player = context.getPlayer();
    
    if (!player.hasPermission("myplugin.admin")) {
        player.sendMessage("§cInsufficient permissions.");
        return;
    }
    
    // Admin action
}
```

## Console Commands

Handle commands from console (non-player):

```java
@Override
public void execute(CommandContext context) {
    if (!context.isPlayer()) {
        // Executed from console
        context.sendMessage("Running from console");
        return;
    }
    
    // Player execution
    var player = context.getPlayer();
}
```