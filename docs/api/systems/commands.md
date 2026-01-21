# Commands API

Register and handle server commands.

The Hytale server uses a robust command system allowing for arguments, tab completion, permission checks, and aliases.

## Verified Interfaces
- `com.hypixel.hytale.server.core.command.Command`
- `com.hypixel.hytale.server.core.command.CommandContext`

## 1. Defining a Command

Implement the `Command` interface.

```java
public class HeilCommand implements Command {
    
    // The main command keyword (e.g. /heal)
    @Override
    public String getName() {
        return "heal";
    }
    
    // Help text shown in /help
    @Override
    public String getDescription() {
        return "Restores health to full.";
    }
    
    // Usage hint shown on error
    @Override
    public String getUsage() {
        return "/heal [player]";
    }
    
    // Required permission node
    @Override
    public String getPermission() {
        return "server.heal"; 
    }

    // Actual logic
    @Override
    public void execute(CommandContext ctx) {
        // implementation...
    }
}
```

## 2. Execution Logic

The `CommandContext` provides everything you need: sender, arguments, and helper methods.

```java
@Override
public void execute(CommandContext ctx) {
    // 1. Check if sender is a player (could be Console!)
    if (!ctx.isPlayer()) {
        ctx.sendMessage("§cThis command is for players only.");
        return;
    }
    
    Player sender = ctx.getPlayer();
    String[] args = ctx.getArgs();
    
    // 2. Handle arguments
    Player target;
    
    if (args.length > 0) {
        // Case: /heal <other>
        // Check permission for healing others
        if (!sender.hasPermission("server.heal.others")) {
            sender.sendMessage("§cYou cannot heal others.");
            return;
        }
        
        // Find target
        target = ctx.getServer().getPlayer(args[0]);
        if (target == null) {
            sender.sendMessage("§cPlayer not found.");
            return;
        }
    } else {
        // Case: /heal (self)
        target = sender;
    }
    
    // 3. Perform action
    target.setHealth(target.getMaxHealth());
    target.sendMessage("§aYou have been healed.");
    
    if (target != sender) {
        sender.sendMessage("§aHealed " + target.getName());
    }
}
```

## 3. Registering Commands

Don't forget to register your command class in your main plugin class!

```java
@Override
public void onEnable(PluginContext context) {
    CommandManager manager = context.getCommandManager();
    
    // Register instances
    manager.register(new HealCommand());
}
```

## 4. Tab Completion

Improve user experience by suggesting arguments.

```java
@Override
public List<String> tabComplete(CommandContext ctx) {
    String[] args = ctx.getArgs();
    
    // Completing first argument? Suggest player names.
    if (args.length == 1) {
        String input = args[0].toLowerCase();
        
        return ctx.getServer().getOnlinePlayers().stream()
            .map(Player::getName)
            .filter(name -> name.toLowerCase().startsWith(input)) // Filter matching
            .collect(Collectors.toList());
    }
    
    return Collections.emptyList();
}
```

## Advanced: Subcommands Pattern

For complex commands like `/plot claim`, `/plot auto`, `/plot home`.

**Why use this pattern?** It keeps your code organized. Instead of one massive `execute` method with 50 if-statements, you map keywords to small methods.

```java
public class PlotCommand implements Command {
    // Map keyword -> handler
    private final Map<String, BiConsumer<CommandContext, String[]>> subcommands = new HashMap<>();
    
    public PlotCommand() {
        subcommands.put("claim", this::handleClaim);
        subcommands.put("auto", this::handleAuto);
    }
    
    @Override
    public void execute(CommandContext ctx) {
        if (ctx.getArgCount() == 0) {
            ctx.sendMessage("Usage: /plot <claim|auto>");
            return;
        }
        
        // Dispatch to handler
        String sub = ctx.getArg(0).toLowerCase();
        if (subcommands.containsKey(sub)) {
            // Pass logic to handler
            subcommands.get(sub).accept(ctx, ctx.getArgs());
        } else {
            ctx.sendMessage("§cUnknown subcommand.");
        }
    }
    
    private void handleClaim(CommandContext ctx, String[] args) {
        // Claim logic here
    }
}
```
