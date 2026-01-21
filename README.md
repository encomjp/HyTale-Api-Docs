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

```
docs/
├── getting-started/    Setup guides and tutorials
├── guide/              Plugin development guides
├── api/                API reference documentation
├── reference/          ID lists (entities, events, sounds)
├── art-packs/          Art pack creation guides
└── resource-packs/     Resource pack guides
```

## Topics Covered

**Getting Started**
- Server installation (Windows, Linux, Docker)
- IDE setup (VS Code, IntelliJ IDEA)
- Project configuration (Gradle, Maven)
- Hello World plugin tutorial

**Plugin Development**
- Events and listeners
- Custom commands
- Permissions system
- Configuration files
- Prefabs

**Reference Data**
- 500+ Entity IDs
- Event types
- Sound IDs
- Block and Item IDs

## Built With

- [VitePress](https://vitepress.dev/) - Static site generator
- Markdown with custom containers

## Contributing

Contributions welcome! Please ensure your documentation follows the existing style before submitting pull requests.

## License

This documentation is community-maintained and unofficial. Not affiliated with Hypixel Studios.
