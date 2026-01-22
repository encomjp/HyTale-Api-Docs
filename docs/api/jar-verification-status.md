# JAR Verification Status

This document tracks which API methods have been verified against the actual `HytaleServer.jar` file.

## Verification Methodology

1. **Source**: `hytalseserver_unpacked/` directory (extracted from `HytaleServer.jar`)
2. **Tool**: Manual inspection of `.class` files, compilation tests, and runtime verification
3. **Status Levels**:
   - [VERIFIED]: Confirmed to exist in JAR with correct signature & runtime behavior
   - [PARTIAL]: Exists but has complex/unclear usage
   - [MISSING]: Does not exist in JAR
   - [UNVERIFIED]: Not yet checked against JAR

## Package Structure (VERIFIED)

### Core Packages
- [VERIFIED] `com.hypixel.hytale.server.core.*` - Core server functionality (HytaleServer, Message, etc.)
- [VERIFIED] `com.hypixel.hytale.server.core.command.system.*` - Command system
- [VERIFIED] `com.hypixel.hytale.server.core.plugin.*` - Plugin system
- [VERIFIED] `com.hypixel.hytale.event.*` - Event system classes
- [VERIFIED] `com.hypixel.hytale.common.plugin.*` - Plugin manifest and metadata

### Server Core (VERIFIED)

**Package**: `com.hypixel.hytale.server.core`

| Class | Status | Notes |
|-------|--------|-------|
| `HytaleServer` | [VERIFIED] | Singleton server access. Use `HytaleServer.get()` |
| `Message` | [VERIFIED] | Text message formatting. Use `Message.raw(String)` |
| `HytaleServer.getInstance()` | [MISSING] | Removed. Use `HytaleServer.get()` instead |

### Command System (VERIFIED)

**Package**: `com.hypixel.hytale.server.core.command.system`

| Class | Status | Notes |
|-------|--------|-------|
| `AbstractCommand` | [VERIFIED] | Base class for commands. Implement `execute(CommandContext)` |
| `CommandManager` | [VERIFIED] | Manages registration. Use `register(Command)` |
| `CommandContext` | [VERIFIED] | Passed to execute(). Has `sender()` method |
| `CommandSender` | [VERIFIED] | Interface for sender. Has `sendMessage(Message)` |

### Plugin System (VERIFIED)

**Package**: `com.hypixel.hytale.server.core.plugin`

| Class | Status | Notes |
|-------|--------|-------|
| `JavaPlugin` | [VERIFIED] | Base class for plugins. |
| `JavaPluginInit` | [VERIFIED] | Required constructor argument `JavaPlugin(JavaPluginInit)` |

### Event System (VERIFIED)

**Package**: `com.hypixel.hytale.event`

| Class | Status | Notes |
|-------|--------|-------|
| `EventBus` | [VERIFIED] | Core event bus implementation |
| `EventBusRegistry` | [VERIFIED] | Event registration system |
| `AsyncEventBusRegistry` | [VERIFIED] | Async event handling |
| `IEvent` | [VERIFIED] | Base event interface |
| `ICancellable` | [VERIFIED] | Cancellable event interface |

## Api Discrepancies Checklist

- [x] **Command Registration**: Manifest "Commands" field works for metadata but programmatic registration via `HytaleServer.get().getCommandManager().register()` is required for logic.
- [x] **Message API**: `Message.text()` does not exist. Use `Message.raw(String)` or `new Message(String)`.
- [x] **Command Execution**: `execute` method must return `CompletableFuture<Void>`, not `void`.
- [x] **Singleton Access**: `HytaleServer.get()` is the correct accessor, not `getInstance()`.
