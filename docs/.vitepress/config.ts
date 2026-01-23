import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
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
            { text: 'API Reference', link: '/api/' },
            { text: 'Javadocs', link: '/javadocs/' }
        ],

        sidebar: {
            '/javadocs/': [
                {
                    text: 'Javadoc Index',
                    link: '/javadocs/',
                },
                {
                    text: 'Plugin & Core API',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale.server.core',
                        link: '/javadocs/com.hypixel.hytale.server.core',
                        collapsed: true,
                        items: [
                        {
                            text: 'event.events',
                            link: '/javadocs/com.hypixel.hytale.server.core.event.events',
                            collapsed: true,
                            items: [
                            {
                                text: 'ecs',
                                link: '/javadocs/com.hypixel.hytale.server.core.event.events.ecs',
                            },
                            {
                                text: 'entity',
                                link: '/javadocs/com.hypixel.hytale.server.core.event.events.entity',
                            },
                            {
                                text: 'permissions',
                                link: '/javadocs/com.hypixel.hytale.server.core.event.events.permissions',
                            },
                            {
                                text: 'player',
                                link: '/javadocs/com.hypixel.hytale.server.core.event.events.player',
                            },
                            ]
                        },
                        {
                            text: 'plugin',
                            link: '/javadocs/com.hypixel.hytale.server.core.plugin',
                            collapsed: true,
                            items: [
                            {
                                text: 'commands',
                                link: '/javadocs/com.hypixel.hytale.server.core.plugin.commands',
                            },
                            {
                                text: 'event',
                                link: '/javadocs/com.hypixel.hytale.server.core.plugin.event',
                            },
                            {
                                text: 'pages',
                                link: '/javadocs/com.hypixel.hytale.server.core.plugin.pages',
                            },
                            {
                                text: 'pending',
                                link: '/javadocs/com.hypixel.hytale.server.core.plugin.pending',
                            },
                            {
                                text: 'registry',
                                link: '/javadocs/com.hypixel.hytale.server.core.plugin.registry',
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Entities & Players',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale.server.core',
                        collapsed: true,
                        items: [
                        {
                            text: 'entity',
                            link: '/javadocs/com.hypixel.hytale.server.core.entity',
                            collapsed: true,
                            items: [
                            {
                                text: 'damage',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.damage',
                            },
                            {
                                text: 'effect',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.effect',
                            },
                            {
                                text: 'entities',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.entities',
                                collapsed: true,
                                items: [
                                {
                                    text: 'player',
                                    link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'data',
                                        link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.data',
                                    },
                                    {
                                        text: 'hud',
                                        link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.hud',
                                    },
                                    {
                                        text: 'movement',
                                        link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.movement',
                                    },
                                    {
                                        text: 'pages',
                                        link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'audio',
                                            link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages.audio',
                                        },
                                        {
                                            text: 'choices',
                                            link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages.choices',
                                        },
                                        {
                                            text: 'itemrepair',
                                            link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'windows',
                                        link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.windows',
                                    },
                                    ]
                                },
                                ]
                            },
                            {
                                text: 'group',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.group',
                            },
                            {
                                text: 'knockback',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.knockback',
                            },
                            {
                                text: 'movement',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.movement',
                            },
                            {
                                text: 'nameplate',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.nameplate',
                            },
                            {
                                text: 'reference',
                                link: '/javadocs/com.hypixel.hytale.server.core.entity.reference',
                            },
                            ]
                        },
                        {
                            text: 'modules',
                            collapsed: true,
                            items: [
                            {
                                text: 'entity',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.entity',
                                collapsed: true,
                                items: [
                                {
                                    text: 'component',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.component',
                                },
                                {
                                    text: 'damage',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.damage',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.damage.commands',
                                    },
                                    {
                                        text: 'event',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.damage.event',
                                    },
                                    ]
                                },
                                {
                                    text: 'dynamiclight',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.dynamiclight',
                                },
                                {
                                    text: 'hitboxcollision',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.hitboxcollision',
                                },
                                {
                                    text: 'item',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.item',
                                },
                                {
                                    text: 'livingentity',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.livingentity',
                                },
                                {
                                    text: 'player',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.player',
                                },
                                {
                                    text: 'repulsion',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.repulsion',
                                },
                                {
                                    text: 'stamina',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.stamina',
                                },
                                {
                                    text: 'system',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.system',
                                },
                                {
                                    text: 'teleport',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.teleport',
                                },
                                {
                                    text: 'tracker',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.tracker',
                                },
                                ]
                            },
                            {
                                text: 'entitystats',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats',
                                collapsed: true,
                                items: [
                                {
                                    text: 'asset',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.asset',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'condition',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.asset.condition',
                                    },
                                    {
                                        text: 'modifier',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.asset.modifier',
                                    },
                                    ]
                                },
                                {
                                    text: 'modifier',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.modifier',
                                },
                                ]
                            },
                            {
                                text: 'entityui',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.entityui',
                                collapsed: true,
                                items: [
                                {
                                    text: 'asset',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.entityui.asset',
                                },
                                ]
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'World & Universe',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale.server.core',
                        collapsed: true,
                        items: [
                        {
                            text: 'blocktype',
                            link: '/javadocs/com.hypixel.hytale.server.core.blocktype',
                            collapsed: true,
                            items: [
                            {
                                text: 'component',
                                link: '/javadocs/com.hypixel.hytale.server.core.blocktype.component',
                            },
                            ]
                        },
                        {
                            text: 'modules',
                            collapsed: true,
                            items: [
                            {
                                text: 'block',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.block',
                                collapsed: true,
                                items: [
                                {
                                    text: 'system',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.block.system',
                                },
                                ]
                            },
                            {
                                text: 'blockhealth',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.blockhealth',
                            },
                            {
                                text: 'blockset',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.blockset',
                                collapsed: true,
                                items: [
                                {
                                    text: 'commands',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.blockset.commands',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'prefab',
                            link: '/javadocs/com.hypixel.hytale.server.core.prefab',
                            collapsed: true,
                            items: [
                            {
                                text: 'config',
                                link: '/javadocs/com.hypixel.hytale.server.core.prefab.config',
                            },
                            {
                                text: 'event',
                                link: '/javadocs/com.hypixel.hytale.server.core.prefab.event',
                            },
                            {
                                text: 'selection',
                                link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection',
                                collapsed: true,
                                items: [
                                {
                                    text: 'buffer',
                                    link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.buffer',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'impl',
                                        link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.buffer.impl',
                                    },
                                    ]
                                },
                                {
                                    text: 'mask',
                                    link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.mask',
                                },
                                {
                                    text: 'standard',
                                    link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.standard',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'universe',
                            link: '/javadocs/com.hypixel.hytale.server.core.universe',
                            collapsed: true,
                            items: [
                            {
                                text: 'datastore',
                                link: '/javadocs/com.hypixel.hytale.server.core.universe.datastore',
                            },
                            {
                                text: 'playerdata',
                                link: '/javadocs/com.hypixel.hytale.server.core.universe.playerdata',
                            },
                            {
                                text: 'system',
                                link: '/javadocs/com.hypixel.hytale.server.core.universe.system',
                            },
                            {
                                text: 'world',
                                link: '/javadocs/com.hypixel.hytale.server.core.universe.world',
                                collapsed: true,
                                items: [
                                {
                                    text: 'accessor',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.accessor',
                                },
                                {
                                    text: 'chunk',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'environment',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.environment',
                                    },
                                    {
                                        text: 'palette',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.palette',
                                    },
                                    {
                                        text: 'section',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.section',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'blockpositions',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.section.blockpositions',
                                        },
                                        {
                                            text: 'palette',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.section.palette',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'state',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.state',
                                    },
                                    {
                                        text: 'systems',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.systems',
                                    },
                                    ]
                                },
                                {
                                    text: 'commands',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'block',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.block',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'bulk',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.block.bulk',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'world',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.world',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'perf',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.world.perf',
                                        },
                                        {
                                            text: 'tps',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.world.tps',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'worldconfig',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.worldconfig',
                                    },
                                    ]
                                },
                                {
                                    text: 'connectedblocks',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.connectedblocks',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'builtin',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.connectedblocks.builtin',
                                    },
                                    ]
                                },
                                {
                                    text: 'events',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.events',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'ecs',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.events.ecs',
                                    },
                                    ]
                                },
                                {
                                    text: 'lighting',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.lighting',
                                },
                                {
                                    text: 'map',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.map',
                                },
                                {
                                    text: 'meta',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.meta',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'state',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.meta.state',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'exceptions',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.meta.state.exceptions',
                                        },
                                        ]
                                    },
                                    ]
                                },
                                {
                                    text: 'npc',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.npc',
                                },
                                {
                                    text: 'path',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.path',
                                },
                                {
                                    text: 'spawn',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.spawn',
                                },
                                {
                                    text: 'storage',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'component',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage.component',
                                    },
                                    {
                                        text: 'provider',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage.provider',
                                    },
                                    {
                                        text: 'resources',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage.resources',
                                    },
                                    ]
                                },
                                {
                                    text: 'system',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.system',
                                },
                                {
                                    text: 'worldgen',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldgen',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'provider',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldgen.provider',
                                    },
                                    ]
                                },
                                {
                                    text: 'worldlocationcondition',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldlocationcondition',
                                },
                                {
                                    text: 'worldmap',
                                    link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'markers',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap.markers',
                                    },
                                    {
                                        text: 'provider',
                                        link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap.provider',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'chunk',
                                            link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap.provider.chunk',
                                        },
                                        ]
                                    },
                                    ]
                                },
                                ]
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Items & Inventory',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale.server.core',
                        collapsed: true,
                        items: [
                        {
                            text: 'asset.type',
                            collapsed: true,
                            items: [
                            {
                                text: 'item',
                                link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item',
                                collapsed: true,
                                items: [
                                {
                                    text: 'config',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item.config',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'container',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item.config.container',
                                    },
                                    {
                                        text: 'metadata',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item.config.metadata',
                                    },
                                    ]
                                },
                                ]
                            },
                            {
                                text: 'itemanimation',
                                link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemanimation',
                                collapsed: true,
                                items: [
                                {
                                    text: 'config',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemanimation.config',
                                },
                                ]
                            },
                            {
                                text: 'itemsound',
                                link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemsound',
                                collapsed: true,
                                items: [
                                {
                                    text: 'config',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemsound.config',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'inventory',
                            link: '/javadocs/com.hypixel.hytale.server.core.inventory',
                            collapsed: true,
                            items: [
                            {
                                text: 'container',
                                link: '/javadocs/com.hypixel.hytale.server.core.inventory.container',
                                collapsed: true,
                                items: [
                                {
                                    text: 'filter',
                                    link: '/javadocs/com.hypixel.hytale.server.core.inventory.container.filter',
                                },
                                ]
                            },
                            {
                                text: 'transaction',
                                link: '/javadocs/com.hypixel.hytale.server.core.inventory.transaction',
                            },
                            ]
                        },
                        {
                            text: 'modules.item',
                            link: '/javadocs/com.hypixel.hytale.server.core.modules.item',
                            collapsed: true,
                            items: [
                            {
                                text: 'commands',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules.item.commands',
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Commands & Permissions',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale.server.core',
                        collapsed: true,
                        items: [
                        {
                            text: 'command',
                            collapsed: true,
                            items: [
                            {
                                text: 'commands',
                                collapsed: true,
                                items: [
                                {
                                    text: 'debug',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'component',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'hitboxcollision',
                                            link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.component.hitboxcollision',
                                        },
                                        {
                                            text: 'repulsion',
                                            link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.component.repulsion',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'packs',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.packs',
                                    },
                                    {
                                        text: 'server',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.server',
                                    },
                                    {
                                        text: 'stresstest',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.stresstest',
                                    },
                                    ]
                                },
                                {
                                    text: 'player',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'camera',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.camera',
                                    },
                                    {
                                        text: 'effect',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.effect',
                                    },
                                    {
                                        text: 'inventory',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.inventory',
                                    },
                                    {
                                        text: 'stats',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.stats',
                                    },
                                    {
                                        text: 'viewradius',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.viewradius',
                                    },
                                    ]
                                },
                                {
                                    text: 'server',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.commands.server',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'auth',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.server.auth',
                                    },
                                    ]
                                },
                                {
                                    text: 'utility',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'git',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.git',
                                    },
                                    {
                                        text: 'help',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.help',
                                    },
                                    {
                                        text: 'lighting',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.lighting',
                                    },
                                    {
                                        text: 'metacommands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.metacommands',
                                    },
                                    {
                                        text: 'net',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.net',
                                    },
                                    {
                                        text: 'sleep',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.sleep',
                                    },
                                    {
                                        text: 'sound',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.sound',
                                    },
                                    {
                                        text: 'worldmap',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.worldmap',
                                    },
                                    ]
                                },
                                {
                                    text: 'world',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'chunk',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.chunk',
                                    },
                                    {
                                        text: 'entity',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.entity',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'snapshot',
                                            link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.entity.snapshot',
                                        },
                                        {
                                            text: 'stats',
                                            link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.entity.stats',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'worldgen',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.worldgen',
                                    },
                                    ]
                                },
                                ]
                            },
                            {
                                text: 'system',
                                link: '/javadocs/com.hypixel.hytale.server.core.command.system',
                                collapsed: true,
                                items: [
                                {
                                    text: 'arguments',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'system',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.system.arguments.system',
                                    },
                                    {
                                        text: 'types',
                                        link: '/javadocs/com.hypixel.hytale.server.core.command.system.arguments.types',
                                    },
                                    ]
                                },
                                {
                                    text: 'basecommands',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.system.basecommands',
                                },
                                {
                                    text: 'exceptions',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.system.exceptions',
                                },
                                {
                                    text: 'pages',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.system.pages',
                                },
                                {
                                    text: 'suggestion',
                                    link: '/javadocs/com.hypixel.hytale.server.core.command.system.suggestion',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'console',
                            link: '/javadocs/com.hypixel.hytale.server.core.console',
                            collapsed: true,
                            items: [
                            {
                                text: 'command',
                                link: '/javadocs/com.hypixel.hytale.server.core.console.command',
                            },
                            ]
                        },
                        {
                            text: 'permissions',
                            link: '/javadocs/com.hypixel.hytale.server.core.permissions',
                            collapsed: true,
                            items: [
                            {
                                text: 'commands',
                                link: '/javadocs/com.hypixel.hytale.server.core.permissions.commands',
                                collapsed: true,
                                items: [
                                {
                                    text: 'op',
                                    link: '/javadocs/com.hypixel.hytale.server.core.permissions.commands.op',
                                },
                                ]
                            },
                            {
                                text: 'provider',
                                link: '/javadocs/com.hypixel.hytale.server.core.permissions.provider',
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Networking & Protocol',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale',
                        collapsed: true,
                        items: [
                        {
                            text: 'protocol',
                            link: '/javadocs/com.hypixel.hytale.protocol',
                            collapsed: true,
                            items: [
                            {
                                text: 'io',
                                link: '/javadocs/com.hypixel.hytale.protocol.io',
                                collapsed: true,
                                items: [
                                {
                                    text: 'netty',
                                    link: '/javadocs/com.hypixel.hytale.protocol.io.netty',
                                },
                                ]
                            },
                            {
                                text: 'packets',
                                collapsed: true,
                                items: [
                                {
                                    text: 'asseteditor',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.asseteditor',
                                },
                                {
                                    text: 'assets',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.assets',
                                },
                                {
                                    text: 'auth',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.auth',
                                },
                                {
                                    text: 'buildertools',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.buildertools',
                                },
                                {
                                    text: 'camera',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.camera',
                                },
                                {
                                    text: 'connection',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.connection',
                                },
                                {
                                    text: 'entities',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.entities',
                                },
                                {
                                    text: 'interaction',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.interaction',
                                },
                                {
                                    text: 'interface_',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.interface_',
                                },
                                {
                                    text: 'inventory',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.inventory',
                                },
                                {
                                    text: 'machinima',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.machinima',
                                },
                                {
                                    text: 'player',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.player',
                                },
                                {
                                    text: 'serveraccess',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.serveraccess',
                                },
                                {
                                    text: 'setup',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.setup',
                                },
                                {
                                    text: 'window',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.window',
                                },
                                {
                                    text: 'world',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.world',
                                },
                                {
                                    text: 'worldmap',
                                    link: '/javadocs/com.hypixel.hytale.protocol.packets.worldmap',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'server.core.io',
                            link: '/javadocs/com.hypixel.hytale.server.core.io',
                            collapsed: true,
                            items: [
                            {
                                text: 'adapter',
                                link: '/javadocs/com.hypixel.hytale.server.core.io.adapter',
                            },
                            {
                                text: 'commands',
                                link: '/javadocs/com.hypixel.hytale.server.core.io.commands',
                            },
                            {
                                text: 'handlers',
                                link: '/javadocs/com.hypixel.hytale.server.core.io.handlers',
                                collapsed: true,
                                items: [
                                {
                                    text: 'game',
                                    link: '/javadocs/com.hypixel.hytale.server.core.io.handlers.game',
                                },
                                {
                                    text: 'login',
                                    link: '/javadocs/com.hypixel.hytale.server.core.io.handlers.login',
                                },
                                ]
                            },
                            {
                                text: 'netty',
                                link: '/javadocs/com.hypixel.hytale.server.core.io.netty',
                            },
                            {
                                text: 'transport',
                                link: '/javadocs/com.hypixel.hytale.server.core.io.transport',
                            },
                            ]
                        },
                        ]
                    },
                    {
                        text: 'io.netty',
                        collapsed: true,
                        items: [
                        {
                            text: 'buffer',
                            link: '/javadocs/io.netty.buffer',
                            collapsed: true,
                            items: [
                            {
                                text: 'search',
                                link: '/javadocs/io.netty.buffer.search',
                            },
                            ]
                        },
                        {
                            text: 'handler.codec',
                            collapsed: true,
                            items: [
                            {
                                text: 'marshalling',
                                link: '/javadocs/io.netty.handler.codec.marshalling',
                            },
                            {
                                text: 'protobuf',
                                link: '/javadocs/io.netty.handler.codec.protobuf',
                            },
                            {
                                text: 'quic',
                                link: '/javadocs/io.netty.handler.codec.quic',
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Math & Utilities',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale',
                        collapsed: true,
                        items: [
                        {
                            text: 'common',
                            collapsed: true,
                            items: [
                            {
                                text: 'benchmark',
                                link: '/javadocs/com.hypixel.hytale.common.benchmark',
                            },
                            {
                                text: 'collection',
                                link: '/javadocs/com.hypixel.hytale.common.collection',
                            },
                            {
                                text: 'fastutil',
                                link: '/javadocs/com.hypixel.hytale.common.fastutil',
                            },
                            {
                                text: 'map',
                                link: '/javadocs/com.hypixel.hytale.common.map',
                            },
                            {
                                text: 'plugin',
                                link: '/javadocs/com.hypixel.hytale.common.plugin',
                            },
                            {
                                text: 'semver',
                                link: '/javadocs/com.hypixel.hytale.common.semver',
                            },
                            {
                                text: 'thread',
                                link: '/javadocs/com.hypixel.hytale.common.thread',
                                collapsed: true,
                                items: [
                                {
                                    text: 'ticking',
                                    link: '/javadocs/com.hypixel.hytale.common.thread.ticking',
                                },
                                ]
                            },
                            {
                                text: 'tuple',
                                link: '/javadocs/com.hypixel.hytale.common.tuple',
                            },
                            {
                                text: 'util',
                                link: '/javadocs/com.hypixel.hytale.common.util',
                                collapsed: true,
                                items: [
                                {
                                    text: 'java',
                                    link: '/javadocs/com.hypixel.hytale.common.util.java',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'math',
                            link: '/javadocs/com.hypixel.hytale.math',
                            collapsed: true,
                            items: [
                            {
                                text: 'block',
                                link: '/javadocs/com.hypixel.hytale.math.block',
                            },
                            {
                                text: 'codec',
                                link: '/javadocs/com.hypixel.hytale.math.codec',
                            },
                            {
                                text: 'data',
                                link: '/javadocs/com.hypixel.hytale.math.data',
                            },
                            {
                                text: 'hitdetection',
                                link: '/javadocs/com.hypixel.hytale.math.hitdetection',
                                collapsed: true,
                                items: [
                                {
                                    text: 'projection',
                                    link: '/javadocs/com.hypixel.hytale.math.hitdetection.projection',
                                },
                                {
                                    text: 'view',
                                    link: '/javadocs/com.hypixel.hytale.math.hitdetection.view',
                                },
                                ]
                            },
                            {
                                text: 'iterator',
                                link: '/javadocs/com.hypixel.hytale.math.iterator',
                            },
                            {
                                text: 'matrix',
                                link: '/javadocs/com.hypixel.hytale.math.matrix',
                            },
                            {
                                text: 'random',
                                link: '/javadocs/com.hypixel.hytale.math.random',
                            },
                            {
                                text: 'range',
                                link: '/javadocs/com.hypixel.hytale.math.range',
                            },
                            {
                                text: 'raycast',
                                link: '/javadocs/com.hypixel.hytale.math.raycast',
                            },
                            {
                                text: 'shape',
                                link: '/javadocs/com.hypixel.hytale.math.shape',
                            },
                            {
                                text: 'util',
                                link: '/javadocs/com.hypixel.hytale.math.util',
                            },
                            {
                                text: 'vector',
                                link: '/javadocs/com.hypixel.hytale.math.vector',
                                collapsed: true,
                                items: [
                                {
                                    text: 'relative',
                                    link: '/javadocs/com.hypixel.hytale.math.vector.relative',
                                },
                                ]
                            },
                            ]
                        },
                        {
                            text: 'server.core.util',
                            link: '/javadocs/com.hypixel.hytale.server.core.util',
                            collapsed: true,
                            items: [
                            {
                                text: 'backup',
                                link: '/javadocs/com.hypixel.hytale.server.core.util.backup',
                            },
                            {
                                text: 'concurrent',
                                link: '/javadocs/com.hypixel.hytale.server.core.util.concurrent',
                            },
                            {
                                text: 'io',
                                link: '/javadocs/com.hypixel.hytale.server.core.util.io',
                            },
                            {
                                text: 'message',
                                link: '/javadocs/com.hypixel.hytale.server.core.util.message',
                            },
                            {
                                text: 'thread',
                                link: '/javadocs/com.hypixel.hytale.server.core.util.thread',
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Other / Internal',
                    collapsed: true,
                    items: [
                    {
                        text: 'com.hypixel.hytale',
                        link: '/javadocs/com.hypixel.hytale',
                        collapsed: true,
                        items: [
                        {
                            text: 'function',
                            link: '/javadocs/com.hypixel.hytale.function',
                            collapsed: true,
                            items: [
                            {
                                text: 'consumer',
                                link: '/javadocs/com.hypixel.hytale.function.consumer',
                            },
                            {
                                text: 'function',
                                link: '/javadocs/com.hypixel.hytale.function.function',
                            },
                            {
                                text: 'predicate',
                                link: '/javadocs/com.hypixel.hytale.function.predicate',
                            },
                            {
                                text: 'supplier',
                                link: '/javadocs/com.hypixel.hytale.function.supplier',
                            },
                            ]
                        },
                        {
                            text: 'logger',
                            link: '/javadocs/com.hypixel.hytale.logger',
                            collapsed: true,
                            items: [
                            {
                                text: 'backend',
                                link: '/javadocs/com.hypixel.hytale.logger.backend',
                            },
                            {
                                text: 'sentry',
                                link: '/javadocs/com.hypixel.hytale.logger.sentry',
                            },
                            {
                                text: 'util',
                                link: '/javadocs/com.hypixel.hytale.logger.util',
                            },
                            ]
                        },
                        {
                            text: 'plugin.early',
                            link: '/javadocs/com.hypixel.hytale.plugin.early',
                        },
                        {
                            text: 'server.core',
                            collapsed: true,
                            items: [
                            {
                                text: 'asset',
                                link: '/javadocs/com.hypixel.hytale.server.core.asset',
                                collapsed: true,
                                items: [
                                {
                                    text: 'common',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.common',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'asset',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.common.asset',
                                    },
                                    {
                                        text: 'events',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.common.events',
                                    },
                                    ]
                                },
                                {
                                    text: 'modifiers',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.modifiers',
                                },
                                {
                                    text: 'monitor',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.monitor',
                                },
                                {
                                    text: 'packet',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.packet',
                                },
                                {
                                    text: 'type',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'ambiencefx',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.ambiencefx',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.ambiencefx.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'attitude',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.attitude',
                                    },
                                    {
                                        text: 'audiocategory',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.audiocategory',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.audiocategory.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'blockbreakingdecal',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockbreakingdecal',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockbreakingdecal.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'blockhitbox',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockhitbox',
                                    },
                                    {
                                        text: 'blockparticle',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockparticle',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockparticle.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'blockset',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockset',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockset.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'blocksound',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocksound',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocksound.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'blocktick',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktick',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktick.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'blocktype',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config',
                                            collapsed: true,
                                            items: [
                                            {
                                                text: 'bench',
                                                link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config.bench',
                                            },
                                            {
                                                text: 'farming',
                                                link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config.farming',
                                            },
                                            {
                                                text: 'mountpoints',
                                                link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config.mountpoints',
                                            },
                                            ]
                                        },
                                        ]
                                    },
                                    {
                                        text: 'buildertool.config',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.buildertool.config',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'args',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.buildertool.config.args',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'camera',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.camera',
                                    },
                                    {
                                        text: 'entityeffect',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.entityeffect',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.entityeffect.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'environment',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.environment',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.environment.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'equalizereffect',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.equalizereffect',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.equalizereffect.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'fluid',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.fluid',
                                    },
                                    {
                                        text: 'fluidfx',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.fluidfx',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.fluidfx.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'gamemode',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.gamemode',
                                    },
                                    {
                                        text: 'gameplay',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.gameplay',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'respawn',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.gameplay.respawn',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'model.config',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.model.config',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'camera',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.model.config.camera',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'modelvfx',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.modelvfx',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.modelvfx.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'particle',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'commands',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle.commands',
                                        },
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle.config',
                                        },
                                        {
                                            text: 'pages',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle.pages',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'portalworld',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.portalworld',
                                    },
                                    {
                                        text: 'projectile.config',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.projectile.config',
                                    },
                                    {
                                        text: 'responsecurve',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.responsecurve',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.responsecurve.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'reverbeffect',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.reverbeffect',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.reverbeffect.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'soundevent',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundevent',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundevent.config',
                                        },
                                        {
                                            text: 'validator',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundevent.validator',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'soundset',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundset',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundset.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'tagpattern',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.tagpattern',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.tagpattern.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'trail',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.trail',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.trail.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'weather',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.weather',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.asset.type.weather.config',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'wordlist',
                                        link: '/javadocs/com.hypixel.hytale.server.core.asset.type.wordlist',
                                    },
                                    ]
                                },
                                {
                                    text: 'util',
                                    link: '/javadocs/com.hypixel.hytale.server.core.asset.util',
                                },
                                ]
                            },
                            {
                                text: 'auth',
                                link: '/javadocs/com.hypixel.hytale.server.core.auth',
                                collapsed: true,
                                items: [
                                {
                                    text: 'oauth',
                                    link: '/javadocs/com.hypixel.hytale.server.core.auth.oauth',
                                },
                                ]
                            },
                            {
                                text: 'client',
                                link: '/javadocs/com.hypixel.hytale.server.core.client',
                            },
                            {
                                text: 'codec',
                                link: '/javadocs/com.hypixel.hytale.server.core.codec',
                                collapsed: true,
                                items: [
                                {
                                    text: 'protocol',
                                    link: '/javadocs/com.hypixel.hytale.server.core.codec.protocol',
                                },
                                ]
                            },
                            {
                                text: 'cosmetics',
                                link: '/javadocs/com.hypixel.hytale.server.core.cosmetics',
                                collapsed: true,
                                items: [
                                {
                                    text: 'commands',
                                    link: '/javadocs/com.hypixel.hytale.server.core.cosmetics.commands',
                                },
                                ]
                            },
                            {
                                text: 'meta',
                                link: '/javadocs/com.hypixel.hytale.server.core.meta',
                            },
                            {
                                text: 'modules',
                                link: '/javadocs/com.hypixel.hytale.server.core.modules',
                                collapsed: true,
                                items: [
                                {
                                    text: 'accesscontrol',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'ban',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol.ban',
                                    },
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol.commands',
                                    },
                                    {
                                        text: 'provider',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol.provider',
                                    },
                                    ]
                                },
                                {
                                    text: 'camera',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.camera',
                                },
                                {
                                    text: 'collision',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.collision',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.collision.commands',
                                    },
                                    ]
                                },
                                {
                                    text: 'debug',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.debug',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.debug.commands',
                                    },
                                    ]
                                },
                                {
                                    text: 'i18n',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.commands',
                                    },
                                    {
                                        text: 'event',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.event',
                                    },
                                    {
                                        text: 'generator',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.generator',
                                    },
                                    {
                                        text: 'parser',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.parser',
                                    },
                                    ]
                                },
                                {
                                    text: 'interaction',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'blocktrack',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.blocktrack',
                                    },
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.commands',
                                    },
                                    {
                                        text: 'components',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.components',
                                    },
                                    {
                                        text: 'interaction',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction',
                                        collapsed: true,
                                        items: [
                                        {
                                            text: 'config',
                                            link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config',
                                            collapsed: true,
                                            items: [
                                            {
                                                text: 'client',
                                                link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.client',
                                            },
                                            {
                                                text: 'data',
                                                link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.data',
                                            },
                                            {
                                                text: 'none',
                                                link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.none',
                                                collapsed: true,
                                                items: [
                                                {
                                                    text: 'simple',
                                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple',
                                                },
                                                ]
                                            },
                                            {
                                                text: 'selector',
                                                link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector',
                                            },
                                            {
                                                text: 'server',
                                                link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.server',
                                                collapsed: true,
                                                items: [
                                                {
                                                    text: 'combat',
                                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat',
                                                },
                                                ]
                                            },
                                            ]
                                        },
                                        {
                                            text: 'operation',
                                            link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.operation',
                                        },
                                        {
                                            text: 'util',
                                            link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.util',
                                        },
                                        ]
                                    },
                                    {
                                        text: 'suppliers',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.suppliers',
                                    },
                                    {
                                        text: 'system',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.system',
                                    },
                                    ]
                                },
                                {
                                    text: 'migrations',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.migrations',
                                },
                                {
                                    text: 'physics',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.physics',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'component',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.physics.component',
                                    },
                                    {
                                        text: 'systems',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.physics.systems',
                                    },
                                    {
                                        text: 'util',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.physics.util',
                                    },
                                    ]
                                },
                                {
                                    text: 'prefabspawner',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.prefabspawner',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.prefabspawner.commands',
                                    },
                                    ]
                                },
                                {
                                    text: 'projectile',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'component',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.component',
                                    },
                                    {
                                        text: 'config',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.config',
                                    },
                                    {
                                        text: 'interaction',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.interaction',
                                    },
                                    {
                                        text: 'system',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.system',
                                    },
                                    ]
                                },
                                {
                                    text: 'serverplayerlist',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.serverplayerlist',
                                },
                                {
                                    text: 'singleplayer',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.singleplayer',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.singleplayer.commands',
                                    },
                                    ]
                                },
                                {
                                    text: 'splitvelocity',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.splitvelocity',
                                },
                                {
                                    text: 'time',
                                    link: '/javadocs/com.hypixel.hytale.server.core.modules.time',
                                    collapsed: true,
                                    items: [
                                    {
                                        text: 'commands',
                                        link: '/javadocs/com.hypixel.hytale.server.core.modules.time.commands',
                                    },
                                    ]
                                },
                                ]
                            },
                            {
                                text: 'receiver',
                                link: '/javadocs/com.hypixel.hytale.server.core.receiver',
                            },
                            {
                                text: 'registry',
                                link: '/javadocs/com.hypixel.hytale.server.core.registry',
                            },
                            {
                                text: 'task',
                                link: '/javadocs/com.hypixel.hytale.server.core.task',
                            },
                            {
                                text: 'ui',
                                link: '/javadocs/com.hypixel.hytale.server.core.ui',
                                collapsed: true,
                                items: [
                                {
                                    text: 'browser',
                                    link: '/javadocs/com.hypixel.hytale.server.core.ui.browser',
                                },
                                {
                                    text: 'builder',
                                    link: '/javadocs/com.hypixel.hytale.server.core.ui.builder',
                                },
                                ]
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    text: 'Libraries & Dependencies',
                    collapsed: true,
                    items: [
                    {
                        text: 'com',
                        collapsed: true,
                        items: [
                        {
                            text: 'github.luben.zstd',
                            link: '/javadocs/com.github.luben.zstd',
                            collapsed: true,
                            items: [
                            {
                                text: 'util',
                                link: '/javadocs/com.github.luben.zstd.util',
                            },
                            ]
                        },
                        {
                            text: 'google.common.flogger',
                            link: '/javadocs/com.google.common.flogger',
                            collapsed: true,
                            items: [
                            {
                                text: 'backend',
                                link: '/javadocs/com.google.common.flogger.backend',
                                collapsed: true,
                                items: [
                                {
                                    text: 'system',
                                    link: '/javadocs/com.google.common.flogger.backend.system',
                                },
                                ]
                            },
                            {
                                text: 'context',
                                link: '/javadocs/com.google.common.flogger.context',
                            },
                            {
                                text: 'parameter',
                                link: '/javadocs/com.google.common.flogger.parameter',
                            },
                            {
                                text: 'parser',
                                link: '/javadocs/com.google.common.flogger.parser',
                            },
                            {
                                text: 'util',
                                link: '/javadocs/com.google.common.flogger.util',
                            },
                            ]
                        },
                        ]
                    },
                    {
                        text: 'io.sentry',
                        link: '/javadocs/io.sentry',
                        collapsed: true,
                        items: [
                        {
                            text: 'backpressure',
                            link: '/javadocs/io.sentry.backpressure',
                        },
                        {
                            text: 'cache',
                            link: '/javadocs/io.sentry.cache',
                            collapsed: true,
                            items: [
                            {
                                text: 'tape',
                                link: '/javadocs/io.sentry.cache.tape',
                            },
                            ]
                        },
                        {
                            text: 'clientreport',
                            link: '/javadocs/io.sentry.clientreport',
                        },
                        {
                            text: 'config',
                            link: '/javadocs/io.sentry.config',
                        },
                        {
                            text: 'exception',
                            link: '/javadocs/io.sentry.exception',
                        },
                        {
                            text: 'featureflags',
                            link: '/javadocs/io.sentry.featureflags',
                        },
                        {
                            text: 'hints',
                            link: '/javadocs/io.sentry.hints',
                        },
                        {
                            text: 'instrumentation.file',
                            link: '/javadocs/io.sentry.instrumentation.file',
                        },
                        {
                            text: 'internal',
                            link: '/javadocs/io.sentry.internal',
                            collapsed: true,
                            items: [
                            {
                                text: 'debugmeta',
                                link: '/javadocs/io.sentry.internal.debugmeta',
                            },
                            {
                                text: 'eventprocessor',
                                link: '/javadocs/io.sentry.internal.eventprocessor',
                            },
                            {
                                text: 'gestures',
                                link: '/javadocs/io.sentry.internal.gestures',
                            },
                            {
                                text: 'modules',
                                link: '/javadocs/io.sentry.internal.modules',
                            },
                            {
                                text: 'viewhierarchy',
                                link: '/javadocs/io.sentry.internal.viewhierarchy',
                            },
                            ]
                        },
                        {
                            text: 'logger',
                            link: '/javadocs/io.sentry.logger',
                        },
                        {
                            text: 'opentelemetry',
                            link: '/javadocs/io.sentry.opentelemetry',
                        },
                        {
                            text: 'profilemeasurements',
                            link: '/javadocs/io.sentry.profilemeasurements',
                        },
                        {
                            text: 'profiling',
                            link: '/javadocs/io.sentry.profiling',
                        },
                        {
                            text: 'protocol',
                            link: '/javadocs/io.sentry.protocol',
                            collapsed: true,
                            items: [
                            {
                                text: 'profiling',
                                link: '/javadocs/io.sentry.protocol.profiling',
                            },
                            ]
                        },
                        {
                            text: 'rrweb',
                            link: '/javadocs/io.sentry.rrweb',
                        },
                        {
                            text: 'transport',
                            link: '/javadocs/io.sentry.transport',
                        },
                        {
                            text: 'util',
                            link: '/javadocs/io.sentry.util',
                            collapsed: true,
                            items: [
                            {
                                text: 'network',
                                link: '/javadocs/io.sentry.util.network',
                            },
                            {
                                text: 'runtime',
                                link: '/javadocs/io.sentry.util.runtime',
                            },
                            {
                                text: 'thread',
                                link: '/javadocs/io.sentry.util.thread',
                            },
                            ]
                        },
                        {
                            text: 'vendor',
                            link: '/javadocs/io.sentry.vendor',
                            collapsed: true,
                            items: [
                            {
                                text: 'gson',
                                collapsed: true,
                                items: [
                                {
                                    text: 'internal.bind.util',
                                    link: '/javadocs/io.sentry.vendor.gson.internal.bind.util',
                                },
                                {
                                    text: 'stream',
                                    link: '/javadocs/io.sentry.vendor.gson.stream',
                                },
                                ]
                            },
                            ]
                        },
                        ]
                    },
                    {
                        text: 'it.unimi.dsi.fastutil',
                        link: '/javadocs/it.unimi.dsi.fastutil',
                        collapsed: true,
                        items: [
                        {
                            text: 'booleans',
                            link: '/javadocs/it.unimi.dsi.fastutil.booleans',
                        },
                        {
                            text: 'bytes',
                            link: '/javadocs/it.unimi.dsi.fastutil.bytes',
                        },
                        {
                            text: 'chars',
                            link: '/javadocs/it.unimi.dsi.fastutil.chars',
                        },
                        {
                            text: 'doubles',
                            link: '/javadocs/it.unimi.dsi.fastutil.doubles',
                        },
                        {
                            text: 'floats',
                            link: '/javadocs/it.unimi.dsi.fastutil.floats',
                        },
                        {
                            text: 'ints',
                            link: '/javadocs/it.unimi.dsi.fastutil.ints',
                        },
                        {
                            text: 'io',
                            link: '/javadocs/it.unimi.dsi.fastutil.io',
                        },
                        {
                            text: 'longs',
                            link: '/javadocs/it.unimi.dsi.fastutil.longs',
                        },
                        {
                            text: 'objects',
                            link: '/javadocs/it.unimi.dsi.fastutil.objects',
                        },
                        ]
                    },
                    {
                        text: 'org.checkerframework.checker.nullness.compatqual',
                        link: '/javadocs/org.checkerframework.checker.nullness.compatqual',
                    },
                    ]
                },
            ],
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
                        { text: 'Your First Plugin', link: '/getting-started/first-plugin' },
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
                        { text: 'Overview', link: '/art-packs/' }
                    ]
                },
                {
                    text: '1. Textures',
                    collapsed: false,
                    items: [
                        { text: 'Creating Textures', link: '/art-packs/textures' }
                    ]
                },
                {
                    text: '2. 3D Models',
                    collapsed: false,
                    items: [
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
                        { text: 'File Structure', link: '/resource-packs/structure' }
                    ]
                },
                {
                    text: '1. Audio',
                    collapsed: false,
                    items: [
                        { text: 'Sounds & Music', link: '/resource-packs/sounds' }
                    ]
                },
                {
                    text: '2. Languages',
                    collapsed: false,
                    items: [
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
                        { text: 'Plugins', link: '/api/systems/plugins' },
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
            { icon: 'github', link: 'https://github.com/encomjp/HyTale-Api-Docs' }
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
}))
