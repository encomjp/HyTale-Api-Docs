# Crafting API

Define new recipes and handle crafting events.

## Verified Classes
- `com.hypixel.hytale.protocol.CraftingRecipe`
- `com.hypixel.hytale.server.core.event.events.player.PlayerCraftEvent`

## Crafting Recipes

### 1. Shaped Recipe
Position matters (like a Pickaxe structure).

```java
CraftingRecipe recipe = new CraftingRecipe();
recipe.setResult(new ItemStack(ItemType.IRON_SWORD));

// Enable shape checking
recipe.setShaped(true);

// Define the grid (3x3 max)
// Keys like 'D', 'S' map to items
recipe.setPattern(new String[] {
    " D ",
    " D ",
    " S "
});
recipe.setKey('D', ItemType.DIAMOND);
recipe.setKey('S', ItemType.STICK);

// Register it
context.getRecipeManager().register(recipe);
```

### 2. Shapeless Recipe
Just ingredients mixed together (like Dye).

```java
CraftingRecipe soup = new CraftingRecipe();
soup.setResult(new ItemStack(ItemType.MUSHROOM_SOUP));
soup.setShaped(false);

soup.addIngredient(ItemType.BOWL);
soup.addIngredient(ItemType.MUSHROOM_RED);
soup.addIngredient(ItemType.MUSHROOM_BROWN);
```

## Crafting Events

### PlayerCraftEvent
Fired when a player takes the result item from a bench.

```java
@EventHandler
public void onCraft(PlayerCraftEvent event) {
    Player player = event.getPlayer();
    ItemStack result = event.getResult();
    
    // Permission usage
    if (result.getType() == ItemType.TNT && !player.hasPermission("craft.tnt")) {
        event.setCancelled(true);
        player.sendMessage("§cYou don't have permission to craft TNT.");
    }
    
    // Custom XP reward
    player.giveExperience(10);
}
```
