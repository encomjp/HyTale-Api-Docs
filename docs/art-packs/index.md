# Art Packs Overview

Art packs let you customize the visual appearance of your Hytale server with custom textures, models, and visual effects.

## What Are Art Packs?

Art packs are collections of visual assets that replace or add to the default game graphics. They can include:

- **Block textures** - Custom block appearances
- **Item textures** - Custom item icons
- **Entity models** - Character and creature models
- **UI elements** - Custom interface graphics
- **Particle effects** - Visual effects

## Art Pack Structure

```
my-art-pack/
├── manifest.json           # Pack metadata
├── textures/
│   ├── blocks/            # Block textures
│   │   └── custom_block.png
│   ├── items/             # Item textures
│   │   └── custom_item.png
│   └── ui/                # UI elements
├── models/
│   └── entities/          # Entity models
└── particles/             # Particle effects
```

## Manifest File

Every art pack needs a `manifest.json`:

```json
{
  "id": "com.example.my-art-pack",
  "name": "My Art Pack",
  "version": "1.0.0",
  "description": "Custom textures for my server",
  "type": "art-pack"
}
```

## Getting Started

1. **Create folder structure** - Set up the directories shown above
2. **Add textures** - Create or import your texture files
3. **Create manifest** - Define your pack metadata
4. **Package** - Zip the contents (or use as folder)
5. **Install** - Place in the server's art packs directory

## Texture Requirements

### File Formats

- **PNG** - Recommended for textures (supports transparency)
- **JPEG** - For photos/backgrounds (no transparency)

### Texture Sizes

Textures should be power-of-2 dimensions:

| Size | Use Case |
|------|----------|
| 16x16 | Low-res blocks/items |
| 32x32 | Standard blocks/items |
| 64x64 | High-res blocks/items |
| 128x128 | Very detailed textures |
| 256x256+ | UI elements, backgrounds |

### Naming Convention

Match the asset you want to replace:

```
textures/blocks/stone.png        # Replaces stone block
textures/blocks/dirt.png         # Replaces dirt block
textures/items/sword_iron.png    # Replaces iron sword
```

## Installing Art Packs

Place art packs in the server's assets directory:

```
Server/
├── mods/
└── art-packs/
    └── my-art-pack/
        ├── manifest.json
        └── textures/
```

Or package as a ZIP file:

```
Server/
└── art-packs/
    └── my-art-pack.zip
```

## Next Steps

- [Creating Textures](./textures) - Detailed texture creation guide
- [Custom Models](./models) - 3D model creation
- [Animations](./animations) - Animated textures and effects
