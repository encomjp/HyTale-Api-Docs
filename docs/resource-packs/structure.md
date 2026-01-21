# File Structure

Detailed guide to resource pack directory structure.

## Complete Structure

```
my-resource-pack/
├── manifest.json               # Required: pack metadata
│
├── sounds/                     # Audio files
│   ├── music/
│   │   ├── ambient.ogg        # Background music
│   │   └── combat.ogg         # Combat music
│   ├── effects/
│   │   ├── explosion.ogg      # Sound effects
│   │   └── pickup.ogg
│   └── ui/
│       ├── click.ogg          # UI sounds
│       └── hover.ogg
│
├── lang/                       # Localization
│   ├── en.json                # English (default)
│   ├── de.json                # German
│   ├── fr.json                # French
│   └── es.json                # Spanish
│
└── data/                       # Configuration data
    ├── items/
    │   └── custom_items.json
    └── recipes/
        └── custom_recipes.json
```

## Manifest Fields

```json
{
  "id": "com.example.my-pack",
  "name": "My Resource Pack",
  "version": "1.0.0",
  "description": "Description of your pack",
  "type": "resource-pack",
  "authors": ["Your Name"],
  "dependencies": [],
  "priority": 100
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier |
| `name` | Yes | Display name |
| `version` | Yes | Semantic version |
| `type` | Yes | Must be "resource-pack" |
| `description` | No | Brief description |
| `authors` | No | List of authors |
| `dependencies` | No | Required packs |
| `priority` | No | Load order (higher = later) |

## Sound Files

### Supported Formats

- **OGG Vorbis** - Recommended (good quality, small size)
- **WAV** - Uncompressed (large files)

### Organization

Group sounds by category:

```
sounds/
├── ambient/          # Environmental sounds
├── creatures/        # Entity sounds
├── music/            # Background music
├── effects/          # Sound effects
├── ui/               # Interface sounds
└── voice/            # Voice lines
```

## Language Files

### Format

JSON objects with key-value pairs:

```json
{
  "menu.play": "Play",
  "menu.settings": "Settings",
  "item.sword.name": "Iron Sword",
  "item.sword.description": "A sturdy iron blade"
}
```

### Naming Convention

Use dot notation for hierarchy:

```
category.subcategory.key
item.sword.name
ui.button.confirm
message.welcome
```

## Data Files

### Custom Items

`data/items/custom_items.json`:
```json
{
  "items": [
    {
      "id": "custom_sword",
      "name": "item.custom_sword.name",
      "type": "weapon",
      "damage": 10
    }
  ]
}
```

### Custom Recipes

`data/recipes/custom_recipes.json`:
```json
{
  "recipes": [
    {
      "id": "custom_sword_recipe",
      "result": "custom_sword",
      "ingredients": ["iron_ingot", "iron_ingot", "stick"]
    }
  ]
}
```

## Pack Priority

When multiple packs provide the same file, priority determines which is used:

```json
{
  "priority": 100    // Higher numbers load last (override earlier)
}
```

Default priority is 0. Use higher values for override packs.

## Best Practices

1. **Use unique IDs** - Avoid conflicts with other packs
2. **Version properly** - Update version when content changes
3. **Document changes** - Include a changelog
4. **Test thoroughly** - Verify all assets load correctly
5. **Optimize files** - Compress audio, minimize JSON
