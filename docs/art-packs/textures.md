# Creating Textures

Learn how to create custom textures for your Hytale art packs.

## Tools

### Recommended Software

| Tool | Price | Best For |
|------|-------|----------|
| **Aseprite** | $20 | Pixel art, animations |
| **GIMP** | Free | General image editing |
| **Photoshop** | Subscription | Professional editing |
| **Piskel** | Free (web) | Quick pixel art |
| **Paint.NET** | Free | Simple edits |

## Block Textures

### Basic Block Texture

Create a square PNG at your desired resolution:

1. Open your image editor
2. Create new file: 32x32 pixels
3. Design your texture
4. Save as PNG with transparency if needed

### Multi-Sided Blocks

For blocks with different sides, create separate textures:

```
textures/blocks/
├── custom_block_top.png
├── custom_block_bottom.png
└── custom_block_side.png
```

Or use a texture atlas (single image with all sides):

```
| Top    | Bottom |
| Front  | Back   |
| Left   | Right  |
```

## Item Textures

### Standard Items

Create a 32x32 PNG with transparent background:

1. Design your item
2. Use transparency for empty space
3. Save as PNG

### Handheld Items

Items held by players may need specific orientations:

```
textures/items/
├── sword_custom.png           # Inventory icon
└── sword_custom_handheld.png  # In-hand model
```

## Transparency

### When to Use

- Item backgrounds (always)
- Decorations (leaves, flowers)
- Partial blocks (fences, stairs)

### How to Add

In GIMP/Photoshop:
1. Select the background
2. Delete it
3. Ensure layer has alpha channel
4. Export as PNG-24 with transparency

### Standard Resolutions

Hytale uses a mix of resolutions to achieve its unique aesthetic:

- **Blocks**: Typically **32x32** pixels. This maintains a slightly coarser, classic voxel look for terrain and building materials.
- **Characters & Mobs**: Typically **64x64** pixels. This allows for more expressive faces, detailed clothing, and distinct visual features.
- **Items**: Often **32x32**, but can vary based on the item type (e.g. detailed weapons might be higher).

::: tip Consistency
You can use higher resolutions (like 128x), but sticking to 32x (blocks) and 64x (entities) ensures your assets blend seamlessly with the vanilla game style.
:::

## Texture Tips

### Consistent Style

Keep a consistent art style across all textures:

- Same color palette
- Same level of detail
- Same shading direction
- Same outline thickness (if using outlines)

### Color Palette

Create a limited color palette for consistency:

```
Base colors:    5-8 main colors
Shades:         2-3 shades per color
Highlights:     1-2 per color
```

### Avoiding Tiling Issues

For repeating textures (like blocks):

1. Make edges seamless
2. Test by tiling the image
3. Avoid obvious patterns that repeat

## Animated Textures

Create frame-by-frame animations:

```
textures/blocks/
└── water.png        # Strip of frames (32x128 = 4 frames)
```

Animation metadata (`water.json`):
```json
{
  "animation": {
    "frametime": 2,
    "frames": [0, 1, 2, 3, 2, 1]
  }
}
```

## Replacing Default Textures

Match the exact filename of the texture you want to replace:

```
# Find default texture name
textures/blocks/stone.png

# Your replacement
textures/blocks/stone.png  (same name, your design)
```

## Creating Variations

Add variety with random textures:

```
textures/blocks/
├── grass.png
├── grass_1.png
├── grass_2.png
└── grass_3.png
```

## Exporting

### Export Settings

- **Format**: PNG
- **Color Mode**: RGB with Alpha
- **Bit Depth**: 8-bit (PNG-24)
- **Interlacing**: None

### File Size

Keep textures optimized:
- Use PNG optimization tools
- Remove metadata
- Choose appropriate resolution

## Quality Checklist

Before finalizing textures:

- [ ] Correct dimensions (power of 2)
- [ ] Transparency working correctly
- [ ] No white edges around transparent areas
- [ ] Consistent style with other textures
- [ ] Seamless tiling (for blocks)
- [ ] Filename matches target asset
