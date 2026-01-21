# Entity Groups API

Manage logical collections of entities (Herds, Raids, Squads).

## Concept
An **Entity Group** is a way to tag multiple entities as "belonging together". This is useful for AI coordination or game rules.
- **Raid**: All raiders share a group. If size < 1, Raid over.
- **Herd**: Cows move together.

## Verified Classes
- `com.hypixel.hytale.server.core.entity.group.EntityGroup`

## Using Groups

### Creating a Group
Groups are usually transient (created for a specific event).

```java
// Create a named group
EntityGroup wolfPack = new EntityGroup("pack_alpha_1");

// Add members
wolfPack.add(wolf1);
wolfPack.add(wolf2);
wolfPack.add(wolf3);
```

### Group Operations
You can perform bulk logic efficiently.

```java
// Broadcase message to "squad"
if (wolfPack.contains(victimEntity)) {
    // Alert the whole pack!
    for (Entity member : wolfPack.getEntities()) {
        member.setTarget(attacker);
    }
}
```

### Cleaning Up
```java
// When the alpha dies, disband the pack?
wolfPack.clear();
```
