# Resource Packs Overview

Resource packs bundle game assets for distribution to players connecting to your server.

## What Are Resource Packs?

Resource packs contain:

- **Sounds** - Music and sound effects
- **Configurations** - Game settings and data
- **Localization** - Translated text
- **Combined assets** - Art and data together

## Resource Pack Structure

```
my-resource-pack/
├── manifest.json           # Pack metadata
├── sounds/
│   ├── music/             # Background music
│   └── effects/           # Sound effects
├── lang/
│   ├── en.json            # English translations
│   └── de.json            # German translations
└── data/
    └── config.json        # Game configurations
```

## Manifest File

```json
{
  "id": "com.example.my-resource-pack",
  "name": "My Resource Pack",
  "version": "1.0.0",
  "description": "Custom sounds and translations",
  "type": "resource-pack"
}
```

## Installation

Place resource packs in the server directory:

```
Server/
└── resource-packs/
    └── my-resource-pack/
        ├── manifest.json
        └── sounds/
```

Or as a ZIP file:
```
Server/
└── resource-packs/
    └── my-resource-pack.zip
```

## Distribution

Resource packs can be:

1. **Pre-installed** - Included with server setup
2. **Downloaded** - Sent to clients on connect
3. **Optional** - Players choose to install

## Next Steps

- [File Structure](./structure) - Detailed directory layout
- [Sounds & Music](./sounds) - Adding custom audio
- [Localization](./localization) - Multiple language support
