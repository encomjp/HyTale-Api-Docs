import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Hytale Developer Docs',
    description: 'Documentation for Hytale server plugins, art packs, and resource packs',

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    themeConfig: {
        logo: '/logo.svg',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Getting Started', link: '/getting-started/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'Art Packs', link: '/art-packs/' },
            { text: 'Resource Packs', link: '/resource-packs/' },
            { text: 'API Reference', link: '/api/' }
        ],

        sidebar: {
            '/getting-started/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Introduction', link: '/getting-started/' }
                    ]
                },
                {
                    text: '1. Install the Server',
                    collapsed: false,
                    items: [
                        { text: 'Windows', link: '/getting-started/server-setup-windows' },
                        { text: 'Linux', link: '/getting-started/server-setup-linux' },
                        { text: 'Docker (Community)', link: '/getting-started/server-setup-docker' }
                    ]
                },
                {
                    text: '2. Set Up Your IDE',
                    collapsed: false,
                    items: [
                        { text: 'VS Code', link: '/getting-started/ide-vscode' },
                        { text: 'IntelliJ IDEA', link: '/getting-started/ide-intellij' }
                    ]
                },
                {
                    text: '3. Create Your Plugin',
                    collapsed: false,
                    items: [
                        { text: 'Project Setup', link: '/getting-started/project-setup' },
                        { text: 'Hello World', link: '/getting-started/hello-world' },
                        { text: 'Debugging', link: '/getting-started/debugging' }
                    ]
                },
                {
                    text: 'Troubleshooting',
                    collapsed: true,
                    items: [
                        { text: 'Common Issues', link: '/getting-started/common-issues' },
                        { text: 'Port Forwarding', link: '/getting-started/port-forwarding' },
                        { text: 'Using Tailscale', link: '/getting-started/tailscale' }
                    ]
                }
            ],
            '/guide/': [
                {
                    text: 'Plugin Guide',
                    items: [
                        { text: 'Overview', link: '/guide/' }
                    ]
                },
                {
                    text: '1. Plugin Basics',
                    collapsed: false,
                    items: [
                        { text: 'Manifest File', link: '/guide/manifest' },
                        { text: 'Events & Listeners', link: '/guide/events' },
                        { text: 'Commands', link: '/guide/commands' }
                    ]
                },
                {
                    text: '2. Player & World',
                    collapsed: false,
                    items: [
                        { text: 'Permissions', link: '/guide/permissions' },
                        { text: 'Configuration', link: '/guide/configuration' },
                        { text: 'Scheduling Tasks', link: '/guide/scheduling' }
                    ]
                },
                {
                    text: '3. Advanced Features',
                    collapsed: false,
                    items: [
                        { text: 'Custom UIs', link: '/guide/custom-ui' },
                        { text: 'Prefabs', link: '/guide/prefabs' }
                    ]
                },
                {
                    text: 'Best Practices',
                    collapsed: true,
                    items: [
                        { text: 'Code Style', link: '/guide/best-practices' }
                    ]
                }
            ],
            '/art-packs/': [
                {
                    text: 'Art Packs',
                    items: [
                        { text: 'Overview', link: '/art-packs/' },
                        { text: 'Creating Textures', link: '/art-packs/textures' },
                        { text: 'Custom Models', link: '/art-packs/models' },
                        { text: 'Animations', link: '/art-packs/animations' }
                    ]
                }
            ],
            '/resource-packs/': [
                {
                    text: 'Resource Packs',
                    items: [
                        { text: 'Overview', link: '/resource-packs/' },
                        { text: 'File Structure', link: '/resource-packs/structure' },
                        { text: 'Sounds & Music', link: '/resource-packs/sounds' },
                        { text: 'Localization', link: '/resource-packs/localization' }
                    ]
                }
            ],
            '/api/': [
                {
                    text: 'API Overview',
                    items: [
                        { text: 'Introduction', link: '/api/' }
                    ]
                },
                {
                    text: 'World API',
                    collapsed: false,
                    items: [
                        { text: 'World Manager', link: '/api/world/world' },
                        { text: 'Chunks', link: '/api/world/chunks' },
                        { text: 'World Gen', link: '/api/world/worldgen' },
                        { text: 'Lighting', link: '/api/world/lighting' },
                        { text: 'Fluids', link: '/api/world/fluids' },
                        { text: 'Physics', link: '/api/world/physics' },
                        { text: 'Environment', link: '/api/world/environment' },
                        { text: 'Prefabs', link: '/api/world/prefabs' },
                        { text: 'Blocks (API)', link: '/api/world/blocks' }
                    ]
                },
                {
                    text: 'Entity API',
                    collapsed: false,
                    items: [
                        { text: 'Entities', link: '/api/entity/entities' },
                        { text: 'Players', link: '/api/entity/player' },
                        { text: 'Damage', link: '/api/entity/damage' },
                        { text: 'Effects', link: '/api/entity/effects' },
                        { text: 'Interaction', link: '/api/entity/interaction' },
                        { text: 'Inventory', link: '/api/entity/inventory' },
                        { text: 'Items', link: '/api/entity/items' },
                        { text: 'Projectiles', link: '/api/entity/projectiles' },
                        { text: 'Entity Groups', link: '/api/entity/entity-groups' }
                    ]
                },
                {
                    text: 'Systems API',
                    collapsed: false,
                    items: [
                        { text: 'Events', link: '/api/systems/events' },
                        { text: 'Commands', link: '/api/systems/commands' },
                        { text: 'Permissions', link: '/api/systems/permissions-ref' },
                        { text: 'Scheduler', link: '/api/systems/scheduler' },
                        { text: 'Storage', link: '/api/systems/storage' },
                        { text: 'Networking', link: '/api/systems/networking' },
                        { text: 'I18n', link: '/api/systems/i18n' },
                        { text: 'Auth', link: '/api/systems/auth' },
                        { text: 'Access Control', link: '/api/systems/access-control' },
                        { text: 'Server Config', link: '/api/systems/server-config' },
                        { text: 'Migrations', link: '/api/systems/migrations' },
                        { text: 'Teleport', link: '/api/systems/teleport' }
                    ]
                },
                {
                    text: 'Client API',
                    collapsed: false,
                    items: [
                        { text: 'Particles', link: '/api/client/particles' },
                        { text: 'Audio', link: '/api/client/audio' },
                        { text: 'Camera', link: '/api/client/camera' },
                        { text: 'Animation', link: '/api/client/animation' },
                        { text: 'Titles', link: '/api/client/titles' }
                    ]
                },
                {
                    text: 'Core API',
                    collapsed: true,
                    items: [
                        { text: 'Registry', link: '/api/core/registry' },
                        { text: 'Tags', link: '/api/core/tags' },
                        { text: 'Modules', link: '/api/core/modules' },
                        { text: 'Math', link: '/api/core/math' },
                        { text: 'Builder Tools', link: '/api/core/builder-tools' },
                        { text: 'Components', link: '/api/core/components' }
                    ]
                },
                {
                    text: 'Reference Lists',
                    collapsed: true,
                    items: [
                        { text: 'Block IDs', link: '/reference/blocks' },
                        { text: 'Item IDs', link: '/reference/items' },
                        { text: 'Entity IDs', link: '/reference/entities' },
                        { text: 'Event Types', link: '/reference/events' },
                        { text: 'Sound IDs', link: '/reference/sounds' },
                        { text: 'Particle IDs', link: '/reference/particles' }
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/encomjp/Essentials-Lite' }
        ],

        search: {
            provider: 'local'
        },

        footer: {
            message: 'Hytale Developer Documentation',
            copyright: 'Community Documentation Project'
        },

        outline: {
            level: [2, 3]
        }
    },

    markdown: {
        lineNumbers: true
    }
})
