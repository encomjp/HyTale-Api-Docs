# Permission Groups API

Manage ranks, roles, and group inheritance.

## Concept
Instead of assigning permissions (`kick`, `ban`) to every single user, you assign them to **Groups** (e.g., `Mod`). Users assigned to the group inherit its permissions.

## Managing Groups

### Creating Ranks
You can manage groups via code, though usually this is done via config files (`permissions.json`).

```java
PermissionsModule perms = server.getModule(PermissionsModule.class);

// Create a new group "VIP"
if (!perms.hasGroup("vip")) {
    perms.createGroup("vip");
}
```

### Inheritance (Parent/Child)
Groups can inherit from others. This is critical for keeping your permissions DRY (Don't Repeat Yourself).
- **Hierarchy**: `Admin` -> `Mod` -> `Member`.
- `Admin` has everything `Mod` has, plus more.

```java
// Admin inherits Mod
perms.getGroup("admin").addParent("mod");
```

### Assigning to Players
Adding a user to a group automatically grants them all permissions + inherited permissions.

```java
PermissionUser user = perms.getUser(player.getUUID());

// Grant rank
user.addGroup("vip");

// Check (includes inheritance!)
if (user.hasPermission("vip.perk.flight")) {
    player.setAllowFlight(true);
}
```
