# Permissions Reference

Technical details on the permission system.

## PermissionHolder

Both `Player` and `Console` implement `PermissionHolder`.

```java
public interface PermissionHolder {
    boolean hasPermission(String node);
    void addPermission(String node);
    void removePermission(String node);
}
```

## Checking Permissions

Always check permissions before performing administrative actions.

```java
if (sender.hasPermission("myplugin.admin")) {
    // Allowed
} else {
    sender.sendMessage("§cInsufficient permissions.");
}
```

## Wildcards

The system typically supports simple wildcards.
- `myplugin.*` grants `myplugin.admin`, `myplugin.user`, etc.
