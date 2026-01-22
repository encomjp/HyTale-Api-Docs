# Asset Structure Reference

Reference guide for the unpacked Hytale Assets.zip structure.

## Overview

The assets are organized into three main directories:
- **Common**: Shared game assets (22,913 files) - textures, models, sounds, UI
- **Server**: Server-side assets (34,717 files) - world gen, prefabs, game logic
- **Cosmetics**: Player cosmetic items (36 files)

## Common Assets

Player-facing content shared between client and server.

### Visual Assets

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Common/BlockTextures` | 678 | Block texture files |
| `/Common/Blocks` | 2,293 | Block definitions and models |
| `/Common/Characters` | 2,653 | Player and NPC character assets |
| `/Common/Items` | 1,020 | Item models and textures |
| `/Common/Icons` | 3,714 | UI and inventory icons |
| `/Common/Particles` | 342 | Particle effect definitions |
| `/Common/Sky` | 44 | Sky box and atmospheric effects |
| `/Common/VFX` | 6 | Visual effects configurations |
| `/Common/Trails` | 33 | Entity movement trails |
| `/Common/ScreenEffects` | 8 | Full-screen shader effects |

### Audio Assets

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Common/Music` | 333 | Background music tracks |
| `/Common/Sounds` | 3,770 | Sound effects (SFX) |

### UI & Localization

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Common/UI` | 587 | User interface layouts and sprites |
| `/Common/Languages` | 22 | Localization strings |
| `/Common/NotificationIcons` | 1 | Achievement/notification icons |

### Game Data

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Common/NPC` | 5,999 | NPC definitions and behaviors |
| `/Common/Resources` | 329 | Harvestable resource definitions |
| `/Common/TintGradients` | 221 | Color gradient definitions for blocks/items |
| `/Common/Cosmetics` | 860 | Cosmetic item assets |

## Server Assets

Server-side game logic and world generation.

### World & Generation

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Server/World` | 13,249 | Block states, biomes, structure schemas |
| `/Server/HytaleGenerator` | 202 | Procedural generation configs |
| `/Server/Environments` | 113 | Environment/biome definitions |
| `/Server/Instances` | 202 | Dungeon/instance templates |
| `/Server/Weathers` | 85 | Weather system configs |

### Entities & Prefabs

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Server/Prefabs` | 7,762 | Entity and structure prefabs |
| `/Server/PrefabList` | 77 | Prefab collection definitions |
| `/Server/Entity` | 256 | Entity behavior definitions |
| `/Server/NPC` | 1,449 | Server-side NPC logic |

### Items & Loot

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Server/Item` | 6,057 | Item properties and stats |
| `/Server/Drops` | 669 | Loot table definitions |
| `/Server/Projectiles` | 86 | Projectile behavior |
| `/Server/ProjectileConfigs` | 112 | Projectile physics configs |

### Gameplay Systems

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Server/GameplayConfigs` | 5 | Core gameplay parameters |
| `/Server/Camera` | 110 | Camera behavior definitions |
| `/Server/Farming` | 5 | Farming system configs |
| `/Server/BarterShops` | 2 | Shop/trading configs |
| `/Server/Objective` | 19 | Quest/objective definitions |
| `/Server/MacroCommands` | 8 | Scripted command macros |

### Technical Assets

| Directory | Count | Description |
|-----------|-------|-------------|
| `/Server/Audio` | 1,473 | Server-side audio triggers |
| `/Server/Particles` | 2,269 | Server-side particle spawning |
| `/Server/Models` | 432 | Server-side model references |
| `/Server/BlockTypeList` | 12 | Block category definitions |
| `/Server/TagPatterns` | 4 | Tag pattern matching rules |
| `/Server/ResponseCurves` | 12 | Animation/response curves |
| `/Server/ScriptedBrushes` | 37 | World editing brushes |
| `/Server/PortalTypes` | 5 | Portal definitions |
| `/Server/Languages` | 3 | Server-side localization |
| `/Server/WordLists` | 1 | Random name generation lists |

## Cosmetics

Pre-order and special cosmetic items.

## Using Assets in Plugins

### Referencing Assets

Assets are referenced by their paths within the structure:

```java
// Block reference
String blockId = "hytale:blocks/stone";

// Sound reference
String soundId = "hytale:sounds/block/stone/break";

// Particle reference
String particleId = "hytale:particles/smoke";
```

### Asset Naming Convention

Format: `namespace:category/subcategory/asset_name`

- **namespace**: Usually `hytale` for vanilla assets
- **category**: Asset type (blocks, items, sounds, etc.)
- **subcategory**: Optional grouping
- **asset_name**: The specific asset identifier

### Common Asset Patterns

#### Blocks
```
hytale:blocks/<block_name>
hytale:block_textures/<texture_name>
```

#### Items
```
hytale:items/<item_name>
hytale:icons/<icon_name>
```

#### Sounds
```
hytale:sounds/<category>/<sound_name>
hytale:music/<track_name>
```

#### Particles
```
hytale:particles/<particle_effect>
```

## manifest.json

The root manifest file identifies the asset pack:

```json
{
  "Group": "Hytale",
  "Name": "Hytale"
}
```

## File Formats

Common file types found in assets:
- `.png` - Textures and images
- `.json` - Data definitions
- `.ogg` / `.wav` - Audio files
- `.prefab` - Entity/structure templates
- `.schema` - World structure schemas

## Verification

These paths and counts were verified from the actual `Assets.zip` unpacked on **2026-01-22**.

- **Total Files**: ~57,666 files
- **Source**: `assets_unpacked/` directory
- **Original**: `../Assets.zip` (3.3 GB)
