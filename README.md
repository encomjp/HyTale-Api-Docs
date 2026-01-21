# HyTale API Documentation

Community-maintained documentation for Hytale server plugins, art packs, and resource packs.

**Repository**: [github.com/encomjp/HyTale-Api-Docs](https://github.com/encomjp/HyTale-Api-Docs)

## Prerequisites

- [Node.js 18+](https://nodejs.org/) (LTS recommended)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Documentation Structure

The documentation is organized into clear, beginner-friendly sections:

```
docs/
├── getting-started/    # Setup guides (IDE, Server, First Plugin)
├── guide/              # core Plugin logic (Events, Commands, Permissions)
├── art-packs/          # Visuals (Textures, Models, Animations)
├── resource-packs/     # Audio & Text (Sounds, Localization)
├── api/                # Technical API Reference
└── reference/          # ID Lists (Entities, Sounds, Blocks)
```

## Key Features

- **Beginner Friendly**: "Hand-holding" style guides for all major topics.
- **Visual Diagrams**: Mermaid diagrams explaining complex flows (Events, Lifecycles).
- **Art & Resources**: Dedicated sections for custom content creation using industry tools like Blockbench.
- **Troubleshooting**: Common error solutions for every topic.

## Built With

- [VitePress](https://vitepress.dev/) - Static site generator
- **Mermaid** - Diagramming tool

## Contributing

Contributions welcome! Please ensure your documentation follows the existing style (simple language, visual aids) before submitting pull requests.

## License

This documentation is community-maintained and unofficial. Not affiliated with Hypixel Studios.
