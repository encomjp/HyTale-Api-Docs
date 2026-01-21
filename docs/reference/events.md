# Events Reference

Complete list of all events available in the Hytale server API. Subscribe to these events to react to game actions.

## Usage

```java
@EventHandler
public void onPlayerJoin(PlayerConnectEvent event) {
    // Handle player connection
}
```

## Player Events

| Event | Description |
|-------|-------------|
| `PlayerConnectEvent` | Fired when a player connects to the server |
| `PlayerDisconnectEvent` | Fired when a player disconnects |
| `PlayerReadyEvent` | Fired when a player is fully loaded and ready |
| `PlayerSetupConnectEvent` | Fired during player connection setup |
| `PlayerSetupDisconnectEvent` | Fired during player disconnection cleanup |
| `PlayerChatEvent` | Fired when a player sends a chat message (async) |
| `PlayerMouseButtonEvent` | Fired when a player clicks mouse buttons |
| `PlayerMouseMotionEvent` | Fired when a player moves their mouse |
| `PlayerCraftEvent` | Fired when a player crafts an item *(DEPRECATED)* |
| `PlayerInteractEvent` | Fired when a player interacts *(DEPRECATED)* |
| `PlayerRefEvent` | Player reference event |
| `AddPlayerToWorldEvent` | Fired when a player is added to a world |
| `RemovePlayerFromWorldEvent` | Fired when a player is removed from a world |
| `DrainPlayerFromWorldEvent` | Fired when draining a player from world |

## World Events

| Event | Description |
|-------|-------------|
| `WorldEvent` | Base world event |
| `AddWorldEvent` | Fired when a world is added |
| `RemoveWorldEvent` | Fired when a world is removed |
| `StartWorldEvent` | Fired when a world starts |
| `WorldPathChangedEvent` | Fired when world path changes |
| `AllWorldsLoadedEvent` | Fired when all worlds are loaded |
| `PrepareUniverseEvent` | Universe preparation *(DEPRECATED)* |

## Chunk Events

| Event | Description |
|-------|-------------|
| `ChunkEvent` | Base chunk event |
| `ChunkPreLoadProcessEvent` | Fired before chunk load processing |
| `ChunkSaveEvent` | Fired when a chunk is saved |
| `ChunkUnloadEvent` | Fired when a chunk is unloaded |

## Entity Events

| Event | Description |
|-------|-------------|
| `EntityEvent` | Base entity event |
| `EntityRemoveEvent` | Fired when an entity is removed |
| `LivingEntityInventoryChangeEvent` | Fired when a living entity's inventory changes |
| `LivingEntityUseBlockEvent` | Fired when entity uses a block *(DEPRECATED)* |
| `LoadedNPCEvent` | Fired when an NPC is loaded |
| `AllNPCsLoadedEvent` | Fired when all NPCs are loaded |

## Block Events (ECS)

| Event | Description |
|-------|-------------|
| `BreakBlockEvent` | Fired when a block is broken |
| `PlaceBlockEvent` | Fired when a block is placed |
| `UseBlockEvent` | Fired when a block is used |
| `UseBlockEvent.Pre` | Fired before block use |
| `UseBlockEvent.Post` | Fired after block use |
| `DamageBlockEvent` | Fired when a block takes damage |

## Item Events (ECS)

| Event | Description |
|-------|-------------|
| `DropItemEvent` | Fired when an item is dropped |
| `DropItemEvent.Drop` | Item drop sub-event |
| `DropItemEvent.PlayerRequest` | Player drop request sub-event |
| `InteractivelyPickupItemEvent` | Fired when an item is picked up |
| `ItemContainerChangeEvent` | Fired when item container changes |
| `SwitchActiveSlotEvent` | Fired when active slot is switched |

## Crafting Events

| Event | Description |
|-------|-------------|
| `CraftRecipeEvent` | Fired when a recipe is crafted |
| `CraftRecipeEvent.Pre` | Fired before crafting |
| `CraftRecipeEvent.Post` | Fired after crafting |
| `TreasureChestOpeningEvent` | Fired when opening a treasure chest |

## Combat Events

| Event | Description |
|-------|-------------|
| `Damage` | Damage event |

## Game Mode Events

| Event | Description |
|-------|-------------|
| `ChangeGameModeEvent` | Fired when game mode changes |

## Discovery Events

| Event | Description |
|-------|-------------|
| `DiscoverInstanceEvent` | Fired when an instance is discovered |
| `DiscoverInstanceEvent.Display` | Display sub-event |
| `DiscoverZoneEvent` | Fired when a zone is discovered |
| `DiscoverZoneEvent.Display` | Display sub-event |

## World Generation Events

| Event | Description |
|-------|-------------|
| `GenerateSchemaEvent` | Fired during schema generation |
| `PrefabPasteEvent` | Fired when a prefab is pasted |
| `MoonPhaseChangeEvent` | Fired when moon phase changes |

## Asset Events

| Event | Description |
|-------|-------------|
| `AssetMonitorEvent` | Asset monitoring event |
| `AssetStoreMonitorEvent` | Asset store monitoring |
| `CommonAssetMonitorEvent` | Common asset monitoring |
| `AssetPackRegisterEvent` | Fired when an asset pack is registered |
| `AssetPackUnregisterEvent` | Fired when an asset pack is unregistered |
| `AssetStoreEvent` | Asset store event |
| `RegisterAssetStoreEvent` | Fired when registering asset store |
| `RemoveAssetStoreEvent` | Fired when removing asset store |
| `AssetsEvent` | Base assets event |
| `GenerateAssetsEvent` | Fired during asset generation |
| `LoadedAssetsEvent` | Fired when assets are loaded |
| `RemovedAssetsEvent` | Fired when assets are removed |
| `LoadAssetEvent` | Fired when loading an asset |
| `SendCommonAssetsEvent` | Fired when sending common assets (async) |

## Editor Events

| Event | Description |
|-------|-------------|
| `EditorClientEvent` | Base editor client event |
| `AssetEditorActivateButtonEvent` | Editor button activation |
| `AssetEditorAssetCreatedEvent` | Asset created in editor |
| `AssetEditorClientDisconnectEvent` | Editor client disconnect |
| `AssetEditorSelectAssetEvent` | Asset selected in editor |
| `AssetEditorUpdateWeatherPreviewLockEvent` | Weather preview lock update |
| `AssetEditorFetchAutoCompleteDataEvent` | Autocomplete data fetch (async) |
| `AssetEditorRequestDataSetEvent` | Dataset request (async) |

## Plugin Events

| Event | Description |
|-------|-------------|
| `PluginEvent` | Base plugin event |
| `PluginSetupEvent` | Fired during plugin setup |

## Server Events

| Event | Description |
|-------|-------------|
| `BootEvent` | Fired during server boot |
| `ShutdownEvent` | Fired during server shutdown |
| `GenerateDefaultLanguageEvent` | Fired when generating default language |
| `GenerateServerStateEvent` | Fired when generating server state |
| `MessagesUpdated` | Fired when messages are updated |
| `SingleplayerRequestAccessEvent` | Fired for singleplayer access request |
| `WindowCloseEvent` | Fired when window closes |

## Async Events (IAsyncEvent)

These events run asynchronously and should be handled carefully:

| Event | Description |
|-------|-------------|
| `AssetEditorFetchAutoCompleteDataEvent` | Fetch autocomplete data |
| `AssetEditorRequestDataSetEvent` | Request dataset |
| `PlayerChatEvent` | Player chat message |
| `SendCommonAssetsEvent` | Send common assets |

## ECS Events

Base event types for the Entity Component System:

| Event | Description |
|-------|-------------|
| `EcsEvent` | Base ECS event |
| `CancellableEcsEvent` | Cancellable ECS event |

## Event Hierarchy

```
Event
├── PlayerEvent
│   ├── PlayerConnectEvent
│   ├── PlayerDisconnectEvent
│   ├── PlayerReadyEvent
│   └── PlayerChatEvent (IAsyncEvent)
├── WorldEvent
│   ├── AddWorldEvent
│   ├── RemoveWorldEvent
│   └── StartWorldEvent
├── EntityEvent
│   ├── EntityRemoveEvent
│   └── LivingEntityInventoryChangeEvent
├── ChunkEvent
│   ├── ChunkSaveEvent
│   └── ChunkUnloadEvent
├── EcsEvent
│   └── CancellableEcsEvent
│       ├── BreakBlockEvent
│       ├── PlaceBlockEvent
│       ├── UseBlockEvent
│       └── CraftRecipeEvent
└── PluginEvent
    └── PluginSetupEvent
```
