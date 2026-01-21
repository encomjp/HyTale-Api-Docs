# Authentication API

Handle player sessions, permissions, and OAuth.

## Verified Classes
- `com.hypixel.hytale.server.core.auth.PlayerAuthentication`
- `com.hypixel.hytale.server.core.auth.AuthConfig`

## Player Authentication
Access the authentication state of a connected player.

```java
PlayerAuthentication auth = player.getAuthentication();

// Check if authenticated
if (auth.isAuthenticated()) {
    // Player is logged in via Hytale services
}
```

## Auth Modes
The server supports different authentication modes (Offline/Online).

```java
AuthConfig config = context.getServer().getAuthConfig();

if (config.isOnlineMode()) {
    // Validating against Hypixel servers
} else {
    // Dev mode / Offline
}
```

## Session Data
You can access specific session grants or tokens (useful for proprietary backend integration).

```java
// Get the session ID/Token
String token = auth.getSessionToken();
```
