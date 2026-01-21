# Interaction API

Handle block placement, entity clicks, and standard "Use Item" events.

## Concepts
Interaction in Hytale is split between:
- **Block Interaction**: Placing, breaking, interacting (Opening Door).
- **Entity Interaction**: Right-clicking mobs/players (Trading, Healing).

## Block Placement Logic
You can intercept or override how blocks are placed.

### Custom Placement Rules
Check if a block *can* be placed here.

```java
boolean valid = BlockPlaceUtils.canPlace(world, position, BlockType.STONE);

if (!valid) {
    player.sendMessage("Cannot place here!");
}
```

### Harvesting (Drops)
When breaking a block, you might want to simulate standard drops (e.g. Diamond Ore dropping Diamonds, not Ore).

```java
// Calculate the 'natural' drops for this block + tool combo
// This handles Fortune, Silk Touch, etc.
List<ItemStack> drops = BlockHarvestUtils.getDrops(block, player.getHeldItem());

// Drop them naturally
world.dropItems(position, drops);
```

## Entity Interaction
Intercept when a player right-clicks an entity.

```java
@EventHandler
public void onInteractEntity(PlayerInteractEntityEvent event) {
    Entity target = event.getTarget();
    
    // Example: Riding a Cow
    if (target.getType() == EntityType.COW) {
        
        // Cancel default behavior (Milking?)
        event.setCancelled(true);
        
        // Mount the entity
        target.addPassenger(event.getPlayer());
    }
}
```
