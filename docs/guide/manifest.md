# Manifest File

The `manifest.json` file is required for every plugin. It provides metadata that the server uses to load and manage your plugin.

## Location

The manifest must be included in your JAR file. When using Gradle, place it in `src/main/resources/manifest.json`.

## Complete Example

```json
{
  "id": "com.example.my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "A description of what this plugin does",
  "authors": ["Your Name", "Another Author"],
  "entrypoint": "com.example.MyPlugin",
  "dependencies": [
    {
      "id": "com.example.other-plugin",
      "version": ">=1.0.0"
    }
  ],
  "softDependencies": ["com.example.optional-plugin"]
}
```

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (reverse domain notation recommended) |
| `name` | string | Human-readable plugin name |
| `version` | string | Semantic version (e.g., "1.0.0") |
| `entrypoint` | string | Fully qualified class name of your main plugin class |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Brief description of the plugin |
| `authors` | string[] | List of plugin authors |
| `dependencies` | object[] | Required plugins that must load first |
| `softDependencies` | string[] | Optional plugins to load before this one if present |

## Plugin ID Guidelines

The plugin ID should be unique across all plugins. Use reverse domain notation:

```
com.yourname.plugin-name
org.organization.plugin-name
de.europeanpepe.essentials-lite
```

Avoid:
- Generic names like `utils` or `core`
- Names that might conflict with other plugins
- Special characters other than dots and hyphens

## Dependencies

Dependencies ensure other plugins load before yours. Each dependency object has:

```json
{
  "id": "com.example.required-plugin",
  "version": ">=1.0.0"
}
```

If a dependency is missing or has an incompatible version, your plugin will not load.

### Version Specifiers

| Specifier | Meaning |
|-----------|---------|
| `1.0.0` | Exactly version 1.0.0 |
| `>=1.0.0` | Version 1.0.0 or higher |
| `>1.0.0` | Higher than 1.0.0 |
| `<2.0.0` | Lower than 2.0.0 |
| `*` | Any version |

## Soft Dependencies

Soft dependencies are optional. If the plugin exists, it loads first. If not, your plugin still loads:

```json
"softDependencies": ["com.example.optional-plugin"]
```

Check for soft dependencies at runtime:

```java
public void onEnable(PluginContext context) {
    if (context.getPluginManager().isPluginLoaded("com.example.optional-plugin")) {
        // Enable optional integration
        context.getLogger().info("Optional plugin found, enabling integration");
        setupOptionalIntegration();
    }
}
```

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 -> 2.0.0): Breaking changes
- **MINOR** (1.0.0 -> 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 -> 1.0.1): Bug fixes

## Including Manifest in Gradle

Make sure your `build.gradle.kts` includes the manifest:

```kotlin
tasks.jar {
    from("src/main/resources") {
        include("manifest.json")
    }
}
```

Or if using the standard resources directory, Gradle includes it automatically.

::: warning Important
The `entrypoint` class must implement `Plugin` and have a public no-argument constructor.
:::

## Validation

Common manifest errors:

| Error | Solution |
|-------|----------|
| `Missing required field: id` | Add the `id` field |
| `Invalid entrypoint` | Check class name and package path |
| `Dependency not found` | Install required dependency or remove it |
| `Version mismatch` | Update dependency version specifier |
