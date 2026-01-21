# Inventory API

Manage player inventories, containers, and custom GUIs.

## Verified Classes
- `com.hypixel.hytale.server.core.inventory.Inventory`
- `com.hypixel.hytale.protocol.ItemStack`

## Managing Player Inventory

### Accessing Inventory
You can get a player's inventory to read or modify their items.

```java
@EventHandler
public void onJoin(PlayerJoinEvent event) {
    // Get the main inventory object
    Inventory inv = event.getPlayer().getInventory();
    
    // Completely empty it (good for lobby joins)
    inv.clear();
}
```

### Adding Items
Safely add items, checking for space.

```java
ItemStack sword = new ItemStack(ItemType.IRON_SWORD, 1);

// check canFit() first to avoid losing items
if (inv.canFit(sword)) {
    inv.addItem(sword);
    player.sendMessage("Sword received!");
} else {
    player.sendMessage("§cYour inventory is full!");
    // Drop item on ground instead?
    player.getWorld().dropItem(player.getLocation(), sword);
}
```

### Checking Contents

```java
// Check if player has at least 1 diamond
if (inv.contains(ItemType.DIAMOND)) {
    // Remove 1 diamond (cost)
    inv.removeItem(ItemType.DIAMOND, 1);
}
```

## Inventory Types & Slots
Hytale inventories are divided into sections. While index mapping may vary, generally:
- **Hotbar**: Slots 0-8 (Quick access)
- **Main**: Slots 9-35 (Storage)
- **Armor**: Specific named slots or indices
- **Offhand**: Separate slot

## Custom UIs (Containers)
Create custom menus (GUIs) for shops, selectors, or settings.

```java
// Create a 3-row inventory (27 slots) with a title
Inventory menu = Inventory.create(27, "Teleport Selector");

// Slot 13 is the center of a 3-row inventory
ItemStack icon = new ItemStack(ItemType.COMPASS);
ItemMeta meta = icon.getMeta();
meta.setDisplayName("§eSpawn");
icon.setMeta(meta);

menu.setItem(13, icon);

// Show to player
player.openInventory(menu);
```

### Handling GUI Clicks
Listen to `InventoryClickEvent` (name may vary slightly in final API).

```java
@EventHandler
public void onMenuClick(InventoryClickEvent event) {
    // Check if it's our custom menu
    if (event.getTitle().equals("Teleport Selector")) {
        event.setCancelled(true); // Prevent taking the item
        
        if (event.getSlot() == 13) {
            player.teleport(spawnLocation);
            player.closeInventory();
        }
    }
}
```
