# Localization

Add multiple language support to your resource pack.

## Language Files

Create JSON files in the `lang/` directory:

```
lang/
├── en.json     # English (default)
├── de.json     # German
├── fr.json     # French
├── es.json     # Spanish
└── ja.json     # Japanese
```

## Format

Simple key-value JSON:

```json
{
  "menu.title": "My Server",
  "menu.play": "Play",
  "menu.settings": "Settings",
  "menu.quit": "Quit",
  
  "item.custom_sword.name": "Custom Sword",
  "item.custom_sword.description": "A powerful blade",
  
  "message.welcome": "Welcome to the server!",
  "message.goodbye": "See you later!"
}
```

## Language Codes

| Code | Language |
|------|----------|
| en | English |
| de | German |
| fr | French |
| es | Spanish |
| pt | Portuguese |
| it | Italian |
| ru | Russian |
| ja | Japanese |
| ko | Korean |
| zh | Chinese |

## Variables

Use placeholders for dynamic content:

```json
{
  "message.welcome": "Welcome, {player}!",
  "message.balance": "You have {amount} coins",
  "message.players": "{count} players online"
}
```

## Pluralization

Handle singular/plural forms:

```json
{
  "item.count.one": "{count} item",
  "item.count.other": "{count} items"
}
```

## Best Practices

1. **Use consistent keys** - Follow a naming convention
2. **Start with English** - Use as the fallback language
3. **Keep strings short** - UI space is limited
4. **Test all languages** - Verify nothing breaks
5. **Use native speakers** - Get accurate translations

## Adding New Languages

1. Copy `en.json` to your new language file
2. Translate all values
3. Keep the same keys
4. Test in-game

## Example: Complete Language File

`lang/en.json`:
```json
{
  "server.name": "My Awesome Server",
  
  "menu.play": "Play",
  "menu.settings": "Settings", 
  "menu.quit": "Quit Game",
  
  "ui.inventory": "Inventory",
  "ui.crafting": "Crafting",
  "ui.close": "Close",
  
  "item.sword.name": "Iron Sword",
  "item.sword.desc": "A reliable blade",
  
  "command.spawn.success": "Teleported to spawn!",
  "command.spawn.error": "Could not teleport",
  
  "error.permission": "You don't have permission",
  "error.not_found": "Not found"
}
```

`lang/de.json`:
```json
{
  "server.name": "Mein Toller Server",
  
  "menu.play": "Spielen",
  "menu.settings": "Einstellungen",
  "menu.quit": "Spiel beenden",
  
  "ui.inventory": "Inventar",
  "ui.crafting": "Handwerk",
  "ui.close": "Schliessen",
  
  "item.sword.name": "Eisenschwert",
  "item.sword.desc": "Eine zuverlässige Klinge",
  
  "command.spawn.success": "Zum Spawn teleportiert!",
  "command.spawn.error": "Teleport fehlgeschlagen",
  
  "error.permission": "Keine Berechtigung",
  "error.not_found": "Nicht gefunden"
}
```
