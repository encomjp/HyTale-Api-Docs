# Prefabs

Prefabs are Hytale's way of saving structures. Think of them like "Copy & Paste" for buildings, trees, or entire dungeons.

You build something in-game, save it as a file, and then your plugin can paste it anywhere!

## How It Works

1. **Build** your structure in a special "Editing World".
2. **Select** it with a tool.
3. **Save** it to a `.json` file.
4. **Paste** it using your plugin (or the brush tool).

---

## Step 1: The Editing World

You can't just build prefabs anywhere. You need a dedicated **Editing World**.

Run this command:
```
/editprefab new my_prefabs
```

This creates an empty void world where you can build without distractions.

::: tip World Name vs Prefab Name
`my_prefabs` is the name of the **world**. You can save hundreds of different prefabs (houses, trees, rocks) inside this one world.
:::

---

## Step 2: Build & Select

Build your structure. Let's say you built a small house.

Now, you need to tell Hytale "this is the thing I want to save".

1. Open the Creative Menu and search for **"Selection Brush"**.
2. Equip it.
3. **Left-click** one corner of your house (bottom-left).
4. **Right-click** the opposite corner (top-right).

You should see a box appear around your house.

---

## Step 3: Save the Prefab

With your selection box active, save it:

```
/prefab save my_cool_house
```

Success! You just created `my_cool_house.json`.

---

## Step 4: Testing It

Now let's see if it works.

1. Move away from your house.
2. Search for the **"Paste Brush"** in the Creative Menu.
3. Press **E** (Open Inventory) while holding the brush to see settings.
4. In the top-right dropdown, select **"Server"**.
5. Find `my_cool_house` in the list.
6. Click anywhere in the world to paste it!

---

## Managing Prefabs

### List All Prefabs
```
/prefab list
```

### Delete a Prefab
```
/prefab delete my_cool_house
```

### Edit an Existing Prefab
If you closed the server and want to edit your house again:
```
/editprefab load my_prefabs
```
(Remember to load the *world*, not the prefab file!)

---

## Using Prefabs in Plugins

Now that you have a prefab, you probably want to spawn it with code (like generating a dungeon).

```java
public void spawnHouse(Location location) {
    // 1. Get the prefab
    Prefab prefab = context.getPrefabManager().get("my_cool_house");
    
    if (prefab == null) {
        context.getLogger().error("Prefab not found!");
        return;
    }
    
    // 2. Paste it
    prefab.paste(location);
}
```

::: warning Path
By default, custom prefabs are saved in the server's root `prefabs/` folder or your plugin's resources. Make sure your plugin can find them!
:::

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Can't select area** | Make sure you are using the **Selection Brush**, not the Paste Brush. |
| **"Prefab not found"** | Did you save it? Check `/prefab list`. |
| **Entities missing** | Some complex entities (like NPCs) might not save correctly in basic prefabs. |
| **Pasted in wrong direction** | The direction you face when **saving** determines the "front" of the prefab. |

---

## Next Steps

You've learned the basics!

- **[Best Practices](./best-practices)** - Write better code
