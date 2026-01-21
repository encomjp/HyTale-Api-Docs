# Items API

Create, modify, and manage items and their metadata.

## Verified Classes
- `com.hypixel.hytale.protocol.ItemBase` (Base class for all items)
- `com.hypixel.hytale.protocol.ItemType` (Enum of all item IDs)
- `com.hypixel.hytale.protocol.ItemStack` (Utility wrapper for Type + Count)

## Creating Items

### Basic ItemStack
Items are usually handled as `ItemStack` objects, which bundle a type and a quantity.

```java
// Create a single iron sword
ItemStack sword = new ItemStack(ItemType.IRON_SWORD);

// Create a stack of 64 oak logs
ItemStack wood = new ItemStack(ItemType.OAK_LOG, 64);
```

## Item Meta

Each item has metadata attached to it (DisplayName, Lore, Attributes).

```java
// 1. Get the meta
ItemMeta meta = sword.getMeta();

// 2. Modify properties
meta.setDisplayName("§bExcalibur");
meta.setLore(Arrays.asList(
    "§7A legendary blade found",
    "§7in the depths of Orbis.",
    "",
    "§6Damage: 9000"
));

// Make it unbreakable
meta.setUnbreakable(true);

// 3. Apply it back
sword.setMeta(meta);
```

## Custom Items (Resource Packs)

Hytale allows you to define completely new items in JSON (via Resource Packs).
You can refer to these registered items by their string ID.

```java
// "myplugin:super_stick" refers to a JSON file in your assets
ItemType myItem = ItemType.register("myplugin:super_stick");

ItemStack customStack = new ItemStack(myItem);
```

## Advanced Item Features

### Animations
Items can play different animations depending on context (first-person).
*Verified Class: `com.hypixel.hytale.protocol.ItemAnimation`*

```java
ItemAnimation anim = new ItemAnimation("eating", 1.0f); // Name, speed
// Apply to item config or packet
```

### Tools & Weapons
Specific item types have hardcoded behaviors.
- `ItemTool`: Mining speeds, harvest levels.
- `ItemWeapon`: Attack speeds, damage values.

### Custom Sounds
Override the default sounds an item makes when used or hitting a block.

```java
// "my_custom_swing" must be defined in sounds.json
ItemSoundEvent sound = new ItemSoundEvent("my_custom_swing");
sword.setSound(sound);
```

## Example: God Sword

```java
public ItemStack createGodSword() {
    ItemStack sword = new ItemStack(ItemType.DIAMOND_SWORD);
    ItemMeta meta = sword.getMeta();
    
    meta.setDisplayName("§cGod Slayer");
    meta.setLore(Collections.singletonList("§7One-hits everything."));
    meta.setUnbreakable(true);
    
    // Add glowing effect (if supported via enchantment glow or similar)
    meta.setEnchanted(true);
    
    sword.setMeta(meta);
    return sword;
}
```
