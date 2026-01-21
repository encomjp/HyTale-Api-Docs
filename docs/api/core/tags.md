# Tags API

Group blocks, items, and entities/fluids using Tag Patterns.

## Verified Classes
- `com.hypixel.hytale.protocol.TagPattern`
- `com.hypixel.hytale.server.core.inventory.container.filter.TagFilter`

## What are Tags?
Tags are a way to group content. For example, `tag:wood` might include `oak_log`, `birch_log`, `spruce_plank`, etc.

## Using Tags

### Checking Block Tags
Check if a block belongs to a specific group (e.g. "Is this any kind of wool?").

```java
// Check if block matches a specific tag pattern
if (block.getType().hasTag("wool")) {
    // This is wool (red, blue, green...)
}
```

### Tag Patterns
You can define complex patterns for matching.

```java
// Match all logs except oak
TagPattern pattern = new TagPattern("tag:log", "!oak_log"); 
```

### Tag Filters
Used in inventories to allow/deny items.

```java
// Create a filter that only accepts swords
TagFilter swordFilter = new TagFilter("tag:sword");

// Check item
if (swordFilter.test(itemStack)) {
    // Accepted
}
```

## Defining Tags
Tags are typically defined in `.json` files in `assets/tags/`.

```json
{
    "name": "my_mod:magic_items",
    "values": [
        "my_mod:wand",
        "my_mod:staff",
        "hytale:book"
    ]
}
```
