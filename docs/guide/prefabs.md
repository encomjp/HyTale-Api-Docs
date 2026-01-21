# Prefabs Guide

Prefabs are reusable structures in Hytale—think of them as "templates" for buildings, dungeons, or any other construction you want to save and reuse.

## Key Concepts

- **Prefab Editing Worlds**: Special worlds where you build and edit prefabs
- **Prefabs as Files**: Saved as JSON files, making them portable and shareable
- **Multiple Prefabs per World**: One editing world can contain many different prefabs

## Creating Your First Prefab

### Step 1: Open a Prefab Editing World

Create a new editing world to work in:

```
/editprefab new my_structures
```

This creates a world named `my_structures`. The world name is **not** the prefab name—worlds can hold multiple prefabs.

### Step 2: Build Your Structure

Construct whatever you want to save. This could be a house, a dungeon room, a tree, or anything else.

### Step 3: Select the Area

Use the **Selection Brush** tool to highlight the region containing your structure.

### Step 4: Save as Prefab

Save the selected area:

```
/prefab save
```

You'll be prompted to name your prefab.

### Step 5: Exit the Editing World

When finished:

```
/editprefab exit
```

### Step 6: Use Your Prefab

To paste your prefab elsewhere:
1. Equip the **Paste Brush**
2. Press `E` to open the prefab selector
3. Look under the "server" dropdown (top right)
4. Select your prefab

You can also browse prefabs with:

```
/prefab list
```

## Commands Reference

### `/prefab` - Manage Prefab Files

| Subcommand | Description |
|------------|-------------|
| `save` | Write the current prefab to disk |
| `load` | Load a prefab from disk into the game |
| `delete` | Remove a prefab file permanently |
| `list` | Show all available prefabs |

::: tip
Add `--help` to any command for detailed options, e.g., `/prefab save --help`
:::

### `/editprefab` - Edit Prefab Structures

| Subcommand | Description |
|------------|-------------|
| `new <name>` | Create a fresh editing world |
| `load` | Open an existing prefab for editing |
| `exit` | Leave the current editing world |
| `select` | Highlight a prefab within 200 blocks |
| `save` | Save using current or selected area |
| `saveui` | Open the save interface for the world |
| `saveas` | Save selection as a new prefab file |
| `setbox` | Adjust the prefab's bounding box |
| `info` | Display details about selected prefab |
| `tp` | Open teleport menu for the editing world |
| `modified` | List all unsaved prefabs in this world |
| `kill` | Remove all entities from selected prefab |

## Tips & Best Practices

### Organizing Prefabs

- Use descriptive names: `village_house_small`, `dungeon_entrance_stone`
- Group related prefabs in themed editing worlds
- Keep backup copies before major edits

### Testing Prefabs

After creating a prefab, test it by:
1. Pasting it in a regular world
2. Checking for missing blocks or entity issues
3. Verifying lighting and ambient effects

### Sharing Prefabs

Prefab files are stored as JSON. You can:
- Share them with other server operators
- Include them in resource packs
- Version control them with Git

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Prefab not appearing in list | Check you saved with `/prefab save`, not just `/editprefab save` |
| Selection not working | Ensure you're using the Selection Brush tool |
| Can't find "server" dropdown | Make sure you're using the Paste Brush, press `E` |
| Entities missing after paste | Some entities may need to be re-spawned manually |

::: warning Known Limitations
- Very large prefabs may cause performance issues
- Some entity states may not persist through save/load
- Always test prefabs after creation
:::
