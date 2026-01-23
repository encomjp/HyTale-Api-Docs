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
                    link: '/javadocs/'
                },
                {
                    text: 'Plugin & Core API',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.server.core', link: '/javadocs/com.hypixel.hytale.server.core' },
                        { text: 'com.hypixel.hytale.server.core.event.events', link: '/javadocs/com.hypixel.hytale.server.core.event.events' },
                        { text: 'com.hypixel.hytale.server.core.event.events.ecs', link: '/javadocs/com.hypixel.hytale.server.core.event.events.ecs' },
                        { text: 'com.hypixel.hytale.server.core.event.events.entity', link: '/javadocs/com.hypixel.hytale.server.core.event.events.entity' },
                        { text: 'com.hypixel.hytale.server.core.event.events.permissions', link: '/javadocs/com.hypixel.hytale.server.core.event.events.permissions' },
                        { text: 'com.hypixel.hytale.server.core.event.events.player', link: '/javadocs/com.hypixel.hytale.server.core.event.events.player' },
                        { text: 'com.hypixel.hytale.server.core.plugin', link: '/javadocs/com.hypixel.hytale.server.core.plugin' },
                        { text: 'com.hypixel.hytale.server.core.plugin.commands', link: '/javadocs/com.hypixel.hytale.server.core.plugin.commands' },
                        { text: 'com.hypixel.hytale.server.core.plugin.event', link: '/javadocs/com.hypixel.hytale.server.core.plugin.event' },
                        { text: 'com.hypixel.hytale.server.core.plugin.pages', link: '/javadocs/com.hypixel.hytale.server.core.plugin.pages' },
                        { text: 'com.hypixel.hytale.server.core.plugin.pending', link: '/javadocs/com.hypixel.hytale.server.core.plugin.pending' },
                        { text: 'com.hypixel.hytale.server.core.plugin.registry', link: '/javadocs/com.hypixel.hytale.server.core.plugin.registry' },
                    ]
                },
                {
                    text: 'Entities & Players',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.server.core.entity', link: '/javadocs/com.hypixel.hytale.server.core.entity' },
                        { text: 'com.hypixel.hytale.server.core.entity.damage', link: '/javadocs/com.hypixel.hytale.server.core.entity.damage' },
                        { text: 'com.hypixel.hytale.server.core.entity.effect', link: '/javadocs/com.hypixel.hytale.server.core.entity.effect' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.data', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.data' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.hud', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.hud' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.movement', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.movement' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.pages', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.pages.audio', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages.audio' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.pages.choices', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages.choices' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair' },
                        { text: 'com.hypixel.hytale.server.core.entity.entities.player.windows', link: '/javadocs/com.hypixel.hytale.server.core.entity.entities.player.windows' },
                        { text: 'com.hypixel.hytale.server.core.entity.group', link: '/javadocs/com.hypixel.hytale.server.core.entity.group' },
                        { text: 'com.hypixel.hytale.server.core.entity.knockback', link: '/javadocs/com.hypixel.hytale.server.core.entity.knockback' },
                        { text: 'com.hypixel.hytale.server.core.entity.movement', link: '/javadocs/com.hypixel.hytale.server.core.entity.movement' },
                        { text: 'com.hypixel.hytale.server.core.entity.nameplate', link: '/javadocs/com.hypixel.hytale.server.core.entity.nameplate' },
                        { text: 'com.hypixel.hytale.server.core.entity.reference', link: '/javadocs/com.hypixel.hytale.server.core.entity.reference' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.component', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.component' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.damage', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.damage' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.damage.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.damage.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.damage.event', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.damage.event' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.dynamiclight', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.dynamiclight' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.hitboxcollision', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.hitboxcollision' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.item', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.item' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.livingentity', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.livingentity' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.player', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.player' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.repulsion', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.repulsion' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.stamina', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.stamina' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.system', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.system' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.teleport', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.teleport' },
                        { text: 'com.hypixel.hytale.server.core.modules.entity.tracker', link: '/javadocs/com.hypixel.hytale.server.core.modules.entity.tracker' },
                        { text: 'com.hypixel.hytale.server.core.modules.entitystats', link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats' },
                        { text: 'com.hypixel.hytale.server.core.modules.entitystats.asset', link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.asset' },
                        { text: 'com.hypixel.hytale.server.core.modules.entitystats.asset.condition', link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.asset.condition' },
                        { text: 'com.hypixel.hytale.server.core.modules.entitystats.asset.modifier', link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.asset.modifier' },
                        { text: 'com.hypixel.hytale.server.core.modules.entitystats.modifier', link: '/javadocs/com.hypixel.hytale.server.core.modules.entitystats.modifier' },
                        { text: 'com.hypixel.hytale.server.core.modules.entityui', link: '/javadocs/com.hypixel.hytale.server.core.modules.entityui' },
                        { text: 'com.hypixel.hytale.server.core.modules.entityui.asset', link: '/javadocs/com.hypixel.hytale.server.core.modules.entityui.asset' },
                    ]
                },
                {
                    text: 'World & Universe',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.server.core.blocktype', link: '/javadocs/com.hypixel.hytale.server.core.blocktype' },
                        { text: 'com.hypixel.hytale.server.core.blocktype.component', link: '/javadocs/com.hypixel.hytale.server.core.blocktype.component' },
                        { text: 'com.hypixel.hytale.server.core.modules.block', link: '/javadocs/com.hypixel.hytale.server.core.modules.block' },
                        { text: 'com.hypixel.hytale.server.core.modules.block.system', link: '/javadocs/com.hypixel.hytale.server.core.modules.block.system' },
                        { text: 'com.hypixel.hytale.server.core.modules.blockhealth', link: '/javadocs/com.hypixel.hytale.server.core.modules.blockhealth' },
                        { text: 'com.hypixel.hytale.server.core.modules.blockset', link: '/javadocs/com.hypixel.hytale.server.core.modules.blockset' },
                        { text: 'com.hypixel.hytale.server.core.modules.blockset.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.blockset.commands' },
                        { text: 'com.hypixel.hytale.server.core.prefab', link: '/javadocs/com.hypixel.hytale.server.core.prefab' },
                        { text: 'com.hypixel.hytale.server.core.prefab.config', link: '/javadocs/com.hypixel.hytale.server.core.prefab.config' },
                        { text: 'com.hypixel.hytale.server.core.prefab.event', link: '/javadocs/com.hypixel.hytale.server.core.prefab.event' },
                        { text: 'com.hypixel.hytale.server.core.prefab.selection', link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection' },
                        { text: 'com.hypixel.hytale.server.core.prefab.selection.buffer', link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.buffer' },
                        { text: 'com.hypixel.hytale.server.core.prefab.selection.buffer.impl', link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.buffer.impl' },
                        { text: 'com.hypixel.hytale.server.core.prefab.selection.mask', link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.mask' },
                        { text: 'com.hypixel.hytale.server.core.prefab.selection.standard', link: '/javadocs/com.hypixel.hytale.server.core.prefab.selection.standard' },
                        { text: 'com.hypixel.hytale.server.core.universe', link: '/javadocs/com.hypixel.hytale.server.core.universe' },
                        { text: 'com.hypixel.hytale.server.core.universe.datastore', link: '/javadocs/com.hypixel.hytale.server.core.universe.datastore' },
                        { text: 'com.hypixel.hytale.server.core.universe.playerdata', link: '/javadocs/com.hypixel.hytale.server.core.universe.playerdata' },
                        { text: 'com.hypixel.hytale.server.core.universe.system', link: '/javadocs/com.hypixel.hytale.server.core.universe.system' },
                        { text: 'com.hypixel.hytale.server.core.universe.world', link: '/javadocs/com.hypixel.hytale.server.core.universe.world' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.accessor', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.accessor' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.environment', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.environment' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.palette', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.palette' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.section', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.section' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.section.blockpositions', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.section.blockpositions' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.section.palette', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.section.palette' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.state', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.state' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.chunk.systems', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.chunk.systems' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands.block', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.block' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands.block.bulk', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.block.bulk' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands.world', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.world' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands.world.perf', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.world.perf' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands.world.tps', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.world.tps' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.commands.worldconfig', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.commands.worldconfig' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.connectedblocks', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.connectedblocks' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.connectedblocks.builtin', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.connectedblocks.builtin' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.events', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.events' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.events.ecs', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.events.ecs' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.lighting', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.lighting' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.map', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.map' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.meta', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.meta' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.meta.state', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.meta.state' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.meta.state.exceptions', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.meta.state.exceptions' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.npc', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.npc' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.path', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.path' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.spawn', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.spawn' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.storage', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.storage.component', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage.component' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.storage.provider', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage.provider' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.storage.resources', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.storage.resources' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.system', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.system' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldgen', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldgen' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldgen.provider', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldgen.provider' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldlocationcondition', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldlocationcondition' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldmap', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldmap.markers', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap.markers' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldmap.provider', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap.provider' },
                        { text: 'com.hypixel.hytale.server.core.universe.world.worldmap.provider.chunk', link: '/javadocs/com.hypixel.hytale.server.core.universe.world.worldmap.provider.chunk' },
                    ]
                },
                {
                    text: 'Items & Inventory',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.server.core.asset.type.item', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.item.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.item.config.container', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item.config.container' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.item.config.metadata', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.item.config.metadata' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.itemanimation', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemanimation' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.itemanimation.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemanimation.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.itemsound', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemsound' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.itemsound.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.itemsound.config' },
                        { text: 'com.hypixel.hytale.server.core.inventory', link: '/javadocs/com.hypixel.hytale.server.core.inventory' },
                        { text: 'com.hypixel.hytale.server.core.inventory.container', link: '/javadocs/com.hypixel.hytale.server.core.inventory.container' },
                        { text: 'com.hypixel.hytale.server.core.inventory.container.filter', link: '/javadocs/com.hypixel.hytale.server.core.inventory.container.filter' },
                        { text: 'com.hypixel.hytale.server.core.inventory.transaction', link: '/javadocs/com.hypixel.hytale.server.core.inventory.transaction' },
                        { text: 'com.hypixel.hytale.server.core.modules.item', link: '/javadocs/com.hypixel.hytale.server.core.modules.item' },
                        { text: 'com.hypixel.hytale.server.core.modules.item.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.item.commands' },
                    ]
                },
                {
                    text: 'Commands & Permissions',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.server.core.command.commands.debug', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.debug.component.hitboxcollision', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.component.hitboxcollision' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.debug.component.repulsion', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.component.repulsion' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.debug.packs', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.packs' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.debug.server', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.server' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.debug.stresstest', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.debug.stresstest' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.player', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.player.camera', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.camera' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.player.effect', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.effect' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.player.inventory', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.inventory' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.player.stats', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.stats' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.player.viewradius', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.player.viewradius' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.server', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.server' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.server.auth', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.server.auth' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.git', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.git' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.help', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.help' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.lighting', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.lighting' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.metacommands', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.metacommands' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.net', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.net' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.sleep', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.sleep' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.sound', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.sound' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.utility.worldmap', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.utility.worldmap' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.world', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.world.chunk', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.chunk' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.world.entity', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.entity' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.world.entity.snapshot', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.entity.snapshot' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.world.entity.stats', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.entity.stats' },
                        { text: 'com.hypixel.hytale.server.core.command.commands.world.worldgen', link: '/javadocs/com.hypixel.hytale.server.core.command.commands.world.worldgen' },
                        { text: 'com.hypixel.hytale.server.core.command.system', link: '/javadocs/com.hypixel.hytale.server.core.command.system' },
                        { text: 'com.hypixel.hytale.server.core.command.system.arguments.system', link: '/javadocs/com.hypixel.hytale.server.core.command.system.arguments.system' },
                        { text: 'com.hypixel.hytale.server.core.command.system.arguments.types', link: '/javadocs/com.hypixel.hytale.server.core.command.system.arguments.types' },
                        { text: 'com.hypixel.hytale.server.core.command.system.basecommands', link: '/javadocs/com.hypixel.hytale.server.core.command.system.basecommands' },
                        { text: 'com.hypixel.hytale.server.core.command.system.exceptions', link: '/javadocs/com.hypixel.hytale.server.core.command.system.exceptions' },
                        { text: 'com.hypixel.hytale.server.core.command.system.pages', link: '/javadocs/com.hypixel.hytale.server.core.command.system.pages' },
                        { text: 'com.hypixel.hytale.server.core.command.system.suggestion', link: '/javadocs/com.hypixel.hytale.server.core.command.system.suggestion' },
                        { text: 'com.hypixel.hytale.server.core.console', link: '/javadocs/com.hypixel.hytale.server.core.console' },
                        { text: 'com.hypixel.hytale.server.core.console.command', link: '/javadocs/com.hypixel.hytale.server.core.console.command' },
                        { text: 'com.hypixel.hytale.server.core.permissions', link: '/javadocs/com.hypixel.hytale.server.core.permissions' },
                        { text: 'com.hypixel.hytale.server.core.permissions.commands', link: '/javadocs/com.hypixel.hytale.server.core.permissions.commands' },
                        { text: 'com.hypixel.hytale.server.core.permissions.commands.op', link: '/javadocs/com.hypixel.hytale.server.core.permissions.commands.op' },
                        { text: 'com.hypixel.hytale.server.core.permissions.provider', link: '/javadocs/com.hypixel.hytale.server.core.permissions.provider' },
                    ]
                },
                {
                    text: 'Networking & Protocol',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.protocol', link: '/javadocs/com.hypixel.hytale.protocol' },
                        { text: 'com.hypixel.hytale.protocol.io', link: '/javadocs/com.hypixel.hytale.protocol.io' },
                        { text: 'com.hypixel.hytale.protocol.io.netty', link: '/javadocs/com.hypixel.hytale.protocol.io.netty' },
                        { text: 'com.hypixel.hytale.protocol.packets.asseteditor', link: '/javadocs/com.hypixel.hytale.protocol.packets.asseteditor' },
                        { text: 'com.hypixel.hytale.protocol.packets.assets', link: '/javadocs/com.hypixel.hytale.protocol.packets.assets' },
                        { text: 'com.hypixel.hytale.protocol.packets.auth', link: '/javadocs/com.hypixel.hytale.protocol.packets.auth' },
                        { text: 'com.hypixel.hytale.protocol.packets.buildertools', link: '/javadocs/com.hypixel.hytale.protocol.packets.buildertools' },
                        { text: 'com.hypixel.hytale.protocol.packets.camera', link: '/javadocs/com.hypixel.hytale.protocol.packets.camera' },
                        { text: 'com.hypixel.hytale.protocol.packets.connection', link: '/javadocs/com.hypixel.hytale.protocol.packets.connection' },
                        { text: 'com.hypixel.hytale.protocol.packets.entities', link: '/javadocs/com.hypixel.hytale.protocol.packets.entities' },
                        { text: 'com.hypixel.hytale.protocol.packets.interaction', link: '/javadocs/com.hypixel.hytale.protocol.packets.interaction' },
                        { text: 'com.hypixel.hytale.protocol.packets.interface_', link: '/javadocs/com.hypixel.hytale.protocol.packets.interface_' },
                        { text: 'com.hypixel.hytale.protocol.packets.inventory', link: '/javadocs/com.hypixel.hytale.protocol.packets.inventory' },
                        { text: 'com.hypixel.hytale.protocol.packets.machinima', link: '/javadocs/com.hypixel.hytale.protocol.packets.machinima' },
                        { text: 'com.hypixel.hytale.protocol.packets.player', link: '/javadocs/com.hypixel.hytale.protocol.packets.player' },
                        { text: 'com.hypixel.hytale.protocol.packets.serveraccess', link: '/javadocs/com.hypixel.hytale.protocol.packets.serveraccess' },
                        { text: 'com.hypixel.hytale.protocol.packets.setup', link: '/javadocs/com.hypixel.hytale.protocol.packets.setup' },
                        { text: 'com.hypixel.hytale.protocol.packets.window', link: '/javadocs/com.hypixel.hytale.protocol.packets.window' },
                        { text: 'com.hypixel.hytale.protocol.packets.world', link: '/javadocs/com.hypixel.hytale.protocol.packets.world' },
                        { text: 'com.hypixel.hytale.protocol.packets.worldmap', link: '/javadocs/com.hypixel.hytale.protocol.packets.worldmap' },
                        { text: 'com.hypixel.hytale.server.core.io', link: '/javadocs/com.hypixel.hytale.server.core.io' },
                        { text: 'com.hypixel.hytale.server.core.io.adapter', link: '/javadocs/com.hypixel.hytale.server.core.io.adapter' },
                        { text: 'com.hypixel.hytale.server.core.io.commands', link: '/javadocs/com.hypixel.hytale.server.core.io.commands' },
                        { text: 'com.hypixel.hytale.server.core.io.handlers', link: '/javadocs/com.hypixel.hytale.server.core.io.handlers' },
                        { text: 'com.hypixel.hytale.server.core.io.handlers.game', link: '/javadocs/com.hypixel.hytale.server.core.io.handlers.game' },
                        { text: 'com.hypixel.hytale.server.core.io.handlers.login', link: '/javadocs/com.hypixel.hytale.server.core.io.handlers.login' },
                        { text: 'com.hypixel.hytale.server.core.io.netty', link: '/javadocs/com.hypixel.hytale.server.core.io.netty' },
                        { text: 'com.hypixel.hytale.server.core.io.transport', link: '/javadocs/com.hypixel.hytale.server.core.io.transport' },
                        { text: 'io.netty.buffer', link: '/javadocs/io.netty.buffer' },
                        { text: 'io.netty.buffer.search', link: '/javadocs/io.netty.buffer.search' },
                        { text: 'io.netty.handler.codec.marshalling', link: '/javadocs/io.netty.handler.codec.marshalling' },
                        { text: 'io.netty.handler.codec.protobuf', link: '/javadocs/io.netty.handler.codec.protobuf' },
                        { text: 'io.netty.handler.codec.quic', link: '/javadocs/io.netty.handler.codec.quic' },
                    ]
                },
                {
                    text: 'Math & Utilities',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale.common.benchmark', link: '/javadocs/com.hypixel.hytale.common.benchmark' },
                        { text: 'com.hypixel.hytale.common.collection', link: '/javadocs/com.hypixel.hytale.common.collection' },
                        { text: 'com.hypixel.hytale.common.fastutil', link: '/javadocs/com.hypixel.hytale.common.fastutil' },
                        { text: 'com.hypixel.hytale.common.map', link: '/javadocs/com.hypixel.hytale.common.map' },
                        { text: 'com.hypixel.hytale.common.plugin', link: '/javadocs/com.hypixel.hytale.common.plugin' },
                        { text: 'com.hypixel.hytale.common.semver', link: '/javadocs/com.hypixel.hytale.common.semver' },
                        { text: 'com.hypixel.hytale.common.thread', link: '/javadocs/com.hypixel.hytale.common.thread' },
                        { text: 'com.hypixel.hytale.common.thread.ticking', link: '/javadocs/com.hypixel.hytale.common.thread.ticking' },
                        { text: 'com.hypixel.hytale.common.tuple', link: '/javadocs/com.hypixel.hytale.common.tuple' },
                        { text: 'com.hypixel.hytale.common.util', link: '/javadocs/com.hypixel.hytale.common.util' },
                        { text: 'com.hypixel.hytale.common.util.java', link: '/javadocs/com.hypixel.hytale.common.util.java' },
                        { text: 'com.hypixel.hytale.math', link: '/javadocs/com.hypixel.hytale.math' },
                        { text: 'com.hypixel.hytale.math.block', link: '/javadocs/com.hypixel.hytale.math.block' },
                        { text: 'com.hypixel.hytale.math.codec', link: '/javadocs/com.hypixel.hytale.math.codec' },
                        { text: 'com.hypixel.hytale.math.data', link: '/javadocs/com.hypixel.hytale.math.data' },
                        { text: 'com.hypixel.hytale.math.hitdetection', link: '/javadocs/com.hypixel.hytale.math.hitdetection' },
                        { text: 'com.hypixel.hytale.math.hitdetection.projection', link: '/javadocs/com.hypixel.hytale.math.hitdetection.projection' },
                        { text: 'com.hypixel.hytale.math.hitdetection.view', link: '/javadocs/com.hypixel.hytale.math.hitdetection.view' },
                        { text: 'com.hypixel.hytale.math.iterator', link: '/javadocs/com.hypixel.hytale.math.iterator' },
                        { text: 'com.hypixel.hytale.math.matrix', link: '/javadocs/com.hypixel.hytale.math.matrix' },
                        { text: 'com.hypixel.hytale.math.random', link: '/javadocs/com.hypixel.hytale.math.random' },
                        { text: 'com.hypixel.hytale.math.range', link: '/javadocs/com.hypixel.hytale.math.range' },
                        { text: 'com.hypixel.hytale.math.raycast', link: '/javadocs/com.hypixel.hytale.math.raycast' },
                        { text: 'com.hypixel.hytale.math.shape', link: '/javadocs/com.hypixel.hytale.math.shape' },
                        { text: 'com.hypixel.hytale.math.util', link: '/javadocs/com.hypixel.hytale.math.util' },
                        { text: 'com.hypixel.hytale.math.vector', link: '/javadocs/com.hypixel.hytale.math.vector' },
                        { text: 'com.hypixel.hytale.math.vector.relative', link: '/javadocs/com.hypixel.hytale.math.vector.relative' },
                        { text: 'com.hypixel.hytale.server.core.util', link: '/javadocs/com.hypixel.hytale.server.core.util' },
                        { text: 'com.hypixel.hytale.server.core.util.backup', link: '/javadocs/com.hypixel.hytale.server.core.util.backup' },
                        { text: 'com.hypixel.hytale.server.core.util.concurrent', link: '/javadocs/com.hypixel.hytale.server.core.util.concurrent' },
                        { text: 'com.hypixel.hytale.server.core.util.io', link: '/javadocs/com.hypixel.hytale.server.core.util.io' },
                        { text: 'com.hypixel.hytale.server.core.util.message', link: '/javadocs/com.hypixel.hytale.server.core.util.message' },
                        { text: 'com.hypixel.hytale.server.core.util.thread', link: '/javadocs/com.hypixel.hytale.server.core.util.thread' },
                    ]
                },
                {
                    text: 'Other / Internal',
                    collapsed: true,
                    items: [
                        { text: 'com.hypixel.hytale', link: '/javadocs/com.hypixel.hytale' },
                        { text: 'com.hypixel.hytale.function', link: '/javadocs/com.hypixel.hytale.function' },
                        { text: 'com.hypixel.hytale.function.consumer', link: '/javadocs/com.hypixel.hytale.function.consumer' },
                        { text: 'com.hypixel.hytale.function.function', link: '/javadocs/com.hypixel.hytale.function.function' },
                        { text: 'com.hypixel.hytale.function.predicate', link: '/javadocs/com.hypixel.hytale.function.predicate' },
                        { text: 'com.hypixel.hytale.function.supplier', link: '/javadocs/com.hypixel.hytale.function.supplier' },
                        { text: 'com.hypixel.hytale.logger', link: '/javadocs/com.hypixel.hytale.logger' },
                        { text: 'com.hypixel.hytale.logger.backend', link: '/javadocs/com.hypixel.hytale.logger.backend' },
                        { text: 'com.hypixel.hytale.logger.sentry', link: '/javadocs/com.hypixel.hytale.logger.sentry' },
                        { text: 'com.hypixel.hytale.logger.util', link: '/javadocs/com.hypixel.hytale.logger.util' },
                        { text: 'com.hypixel.hytale.plugin.early', link: '/javadocs/com.hypixel.hytale.plugin.early' },
                        { text: 'com.hypixel.hytale.server.core.asset', link: '/javadocs/com.hypixel.hytale.server.core.asset' },
                        { text: 'com.hypixel.hytale.server.core.asset.common', link: '/javadocs/com.hypixel.hytale.server.core.asset.common' },
                        { text: 'com.hypixel.hytale.server.core.asset.common.asset', link: '/javadocs/com.hypixel.hytale.server.core.asset.common.asset' },
                        { text: 'com.hypixel.hytale.server.core.asset.common.events', link: '/javadocs/com.hypixel.hytale.server.core.asset.common.events' },
                        { text: 'com.hypixel.hytale.server.core.asset.modifiers', link: '/javadocs/com.hypixel.hytale.server.core.asset.modifiers' },
                        { text: 'com.hypixel.hytale.server.core.asset.monitor', link: '/javadocs/com.hypixel.hytale.server.core.asset.monitor' },
                        { text: 'com.hypixel.hytale.server.core.asset.packet', link: '/javadocs/com.hypixel.hytale.server.core.asset.packet' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.ambiencefx', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.ambiencefx' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.ambiencefx.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.ambiencefx.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.attitude', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.attitude' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.audiocategory', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.audiocategory' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.audiocategory.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.audiocategory.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockbreakingdecal', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockbreakingdecal' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockbreakingdecal.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockbreakingdecal.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockhitbox', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockhitbox' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockparticle', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockparticle' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockparticle.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockparticle.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockset', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockset' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blockset.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blockset.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocksound', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocksound' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocksound.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocksound.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktick', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktick' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktick.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktick.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktype', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktype.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktype.config.bench', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config.bench' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktype.config.farming', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config.farming' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.blocktype.config.mountpoints', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.blocktype.config.mountpoints' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.buildertool.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.buildertool.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.buildertool.config.args', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.buildertool.config.args' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.camera', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.camera' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.entityeffect', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.entityeffect' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.entityeffect.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.entityeffect.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.environment', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.environment' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.environment.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.environment.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.equalizereffect', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.equalizereffect' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.equalizereffect.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.equalizereffect.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.fluid', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.fluid' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.fluidfx', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.fluidfx' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.fluidfx.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.fluidfx.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.gamemode', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.gamemode' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.gameplay', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.gameplay' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.gameplay.respawn', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.gameplay.respawn' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.model.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.model.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.model.config.camera', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.model.config.camera' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.modelvfx', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.modelvfx' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.modelvfx.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.modelvfx.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.particle', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.particle.commands', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle.commands' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.particle.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.particle.pages', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.particle.pages' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.portalworld', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.portalworld' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.projectile.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.projectile.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.responsecurve', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.responsecurve' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.responsecurve.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.responsecurve.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.reverbeffect', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.reverbeffect' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.reverbeffect.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.reverbeffect.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.soundevent', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundevent' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.soundevent.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundevent.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.soundevent.validator', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundevent.validator' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.soundset', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundset' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.soundset.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.soundset.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.tagpattern', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.tagpattern' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.tagpattern.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.tagpattern.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.trail', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.trail' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.trail.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.trail.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.weather', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.weather' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.weather.config', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.weather.config' },
                        { text: 'com.hypixel.hytale.server.core.asset.type.wordlist', link: '/javadocs/com.hypixel.hytale.server.core.asset.type.wordlist' },
                        { text: 'com.hypixel.hytale.server.core.asset.util', link: '/javadocs/com.hypixel.hytale.server.core.asset.util' },
                        { text: 'com.hypixel.hytale.server.core.auth', link: '/javadocs/com.hypixel.hytale.server.core.auth' },
                        { text: 'com.hypixel.hytale.server.core.auth.oauth', link: '/javadocs/com.hypixel.hytale.server.core.auth.oauth' },
                        { text: 'com.hypixel.hytale.server.core.client', link: '/javadocs/com.hypixel.hytale.server.core.client' },
                        { text: 'com.hypixel.hytale.server.core.codec', link: '/javadocs/com.hypixel.hytale.server.core.codec' },
                        { text: 'com.hypixel.hytale.server.core.codec.protocol', link: '/javadocs/com.hypixel.hytale.server.core.codec.protocol' },
                        { text: 'com.hypixel.hytale.server.core.cosmetics', link: '/javadocs/com.hypixel.hytale.server.core.cosmetics' },
                        { text: 'com.hypixel.hytale.server.core.cosmetics.commands', link: '/javadocs/com.hypixel.hytale.server.core.cosmetics.commands' },
                        { text: 'com.hypixel.hytale.server.core.meta', link: '/javadocs/com.hypixel.hytale.server.core.meta' },
                        { text: 'com.hypixel.hytale.server.core.modules', link: '/javadocs/com.hypixel.hytale.server.core.modules' },
                        { text: 'com.hypixel.hytale.server.core.modules.accesscontrol', link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol' },
                        { text: 'com.hypixel.hytale.server.core.modules.accesscontrol.ban', link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol.ban' },
                        { text: 'com.hypixel.hytale.server.core.modules.accesscontrol.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.accesscontrol.provider', link: '/javadocs/com.hypixel.hytale.server.core.modules.accesscontrol.provider' },
                        { text: 'com.hypixel.hytale.server.core.modules.camera', link: '/javadocs/com.hypixel.hytale.server.core.modules.camera' },
                        { text: 'com.hypixel.hytale.server.core.modules.collision', link: '/javadocs/com.hypixel.hytale.server.core.modules.collision' },
                        { text: 'com.hypixel.hytale.server.core.modules.collision.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.collision.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.debug', link: '/javadocs/com.hypixel.hytale.server.core.modules.debug' },
                        { text: 'com.hypixel.hytale.server.core.modules.debug.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.debug.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.i18n', link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n' },
                        { text: 'com.hypixel.hytale.server.core.modules.i18n.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.i18n.event', link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.event' },
                        { text: 'com.hypixel.hytale.server.core.modules.i18n.generator', link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.generator' },
                        { text: 'com.hypixel.hytale.server.core.modules.i18n.parser', link: '/javadocs/com.hypixel.hytale.server.core.modules.i18n.parser' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.blocktrack', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.blocktrack' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.components', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.components' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.client', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.client' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.data', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.data' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.none', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.none' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.server', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.server' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.operation', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.operation' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.interaction.util', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.interaction.util' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.suppliers', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.suppliers' },
                        { text: 'com.hypixel.hytale.server.core.modules.interaction.system', link: '/javadocs/com.hypixel.hytale.server.core.modules.interaction.system' },
                        { text: 'com.hypixel.hytale.server.core.modules.migrations', link: '/javadocs/com.hypixel.hytale.server.core.modules.migrations' },
                        { text: 'com.hypixel.hytale.server.core.modules.physics', link: '/javadocs/com.hypixel.hytale.server.core.modules.physics' },
                        { text: 'com.hypixel.hytale.server.core.modules.physics.component', link: '/javadocs/com.hypixel.hytale.server.core.modules.physics.component' },
                        { text: 'com.hypixel.hytale.server.core.modules.physics.systems', link: '/javadocs/com.hypixel.hytale.server.core.modules.physics.systems' },
                        { text: 'com.hypixel.hytale.server.core.modules.physics.util', link: '/javadocs/com.hypixel.hytale.server.core.modules.physics.util' },
                        { text: 'com.hypixel.hytale.server.core.modules.prefabspawner', link: '/javadocs/com.hypixel.hytale.server.core.modules.prefabspawner' },
                        { text: 'com.hypixel.hytale.server.core.modules.prefabspawner.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.prefabspawner.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.projectile', link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile' },
                        { text: 'com.hypixel.hytale.server.core.modules.projectile.component', link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.component' },
                        { text: 'com.hypixel.hytale.server.core.modules.projectile.config', link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.config' },
                        { text: 'com.hypixel.hytale.server.core.modules.projectile.interaction', link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.interaction' },
                        { text: 'com.hypixel.hytale.server.core.modules.projectile.system', link: '/javadocs/com.hypixel.hytale.server.core.modules.projectile.system' },
                        { text: 'com.hypixel.hytale.server.core.modules.serverplayerlist', link: '/javadocs/com.hypixel.hytale.server.core.modules.serverplayerlist' },
                        { text: 'com.hypixel.hytale.server.core.modules.singleplayer', link: '/javadocs/com.hypixel.hytale.server.core.modules.singleplayer' },
                        { text: 'com.hypixel.hytale.server.core.modules.singleplayer.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.singleplayer.commands' },
                        { text: 'com.hypixel.hytale.server.core.modules.splitvelocity', link: '/javadocs/com.hypixel.hytale.server.core.modules.splitvelocity' },
                        { text: 'com.hypixel.hytale.server.core.modules.time', link: '/javadocs/com.hypixel.hytale.server.core.modules.time' },
                        { text: 'com.hypixel.hytale.server.core.modules.time.commands', link: '/javadocs/com.hypixel.hytale.server.core.modules.time.commands' },
                        { text: 'com.hypixel.hytale.server.core.receiver', link: '/javadocs/com.hypixel.hytale.server.core.receiver' },
                        { text: 'com.hypixel.hytale.server.core.registry', link: '/javadocs/com.hypixel.hytale.server.core.registry' },
                        { text: 'com.hypixel.hytale.server.core.task', link: '/javadocs/com.hypixel.hytale.server.core.task' },
                        { text: 'com.hypixel.hytale.server.core.ui', link: '/javadocs/com.hypixel.hytale.server.core.ui' },
                        { text: 'com.hypixel.hytale.server.core.ui.browser', link: '/javadocs/com.hypixel.hytale.server.core.ui.browser' },
                        { text: 'com.hypixel.hytale.server.core.ui.builder', link: '/javadocs/com.hypixel.hytale.server.core.ui.builder' },
                    ]
                },
                {
                    text: 'Libraries & Dependencies',
                    collapsed: true,
                    items: [
                        { text: 'com.github.luben.zstd', link: '/javadocs/com.github.luben.zstd' },
                        { text: 'com.github.luben.zstd.util', link: '/javadocs/com.github.luben.zstd.util' },
                        { text: 'com.google.common.flogger', link: '/javadocs/com.google.common.flogger' },
                        { text: 'com.google.common.flogger.backend', link: '/javadocs/com.google.common.flogger.backend' },
                        { text: 'com.google.common.flogger.backend.system', link: '/javadocs/com.google.common.flogger.backend.system' },
                        { text: 'com.google.common.flogger.context', link: '/javadocs/com.google.common.flogger.context' },
                        { text: 'com.google.common.flogger.parameter', link: '/javadocs/com.google.common.flogger.parameter' },
                        { text: 'com.google.common.flogger.parser', link: '/javadocs/com.google.common.flogger.parser' },
                        { text: 'com.google.common.flogger.util', link: '/javadocs/com.google.common.flogger.util' },
                        { text: 'io.sentry', link: '/javadocs/io.sentry' },
                        { text: 'io.sentry.backpressure', link: '/javadocs/io.sentry.backpressure' },
                        { text: 'io.sentry.cache', link: '/javadocs/io.sentry.cache' },
                        { text: 'io.sentry.cache.tape', link: '/javadocs/io.sentry.cache.tape' },
                        { text: 'io.sentry.clientreport', link: '/javadocs/io.sentry.clientreport' },
                        { text: 'io.sentry.config', link: '/javadocs/io.sentry.config' },
                        { text: 'io.sentry.exception', link: '/javadocs/io.sentry.exception' },
                        { text: 'io.sentry.featureflags', link: '/javadocs/io.sentry.featureflags' },
                        { text: 'io.sentry.hints', link: '/javadocs/io.sentry.hints' },
                        { text: 'io.sentry.instrumentation.file', link: '/javadocs/io.sentry.instrumentation.file' },
                        { text: 'io.sentry.internal', link: '/javadocs/io.sentry.internal' },
                        { text: 'io.sentry.internal.debugmeta', link: '/javadocs/io.sentry.internal.debugmeta' },
                        { text: 'io.sentry.internal.eventprocessor', link: '/javadocs/io.sentry.internal.eventprocessor' },
                        { text: 'io.sentry.internal.gestures', link: '/javadocs/io.sentry.internal.gestures' },
                        { text: 'io.sentry.internal.modules', link: '/javadocs/io.sentry.internal.modules' },
                        { text: 'io.sentry.internal.viewhierarchy', link: '/javadocs/io.sentry.internal.viewhierarchy' },
                        { text: 'io.sentry.logger', link: '/javadocs/io.sentry.logger' },
                        { text: 'io.sentry.opentelemetry', link: '/javadocs/io.sentry.opentelemetry' },
                        { text: 'io.sentry.profilemeasurements', link: '/javadocs/io.sentry.profilemeasurements' },
                        { text: 'io.sentry.profiling', link: '/javadocs/io.sentry.profiling' },
                        { text: 'io.sentry.protocol', link: '/javadocs/io.sentry.protocol' },
                        { text: 'io.sentry.protocol.profiling', link: '/javadocs/io.sentry.protocol.profiling' },
                        { text: 'io.sentry.rrweb', link: '/javadocs/io.sentry.rrweb' },
                        { text: 'io.sentry.transport', link: '/javadocs/io.sentry.transport' },
                        { text: 'io.sentry.util', link: '/javadocs/io.sentry.util' },
                        { text: 'io.sentry.util.network', link: '/javadocs/io.sentry.util.network' },
                        { text: 'io.sentry.util.runtime', link: '/javadocs/io.sentry.util.runtime' },
                        { text: 'io.sentry.util.thread', link: '/javadocs/io.sentry.util.thread' },
                        { text: 'io.sentry.vendor', link: '/javadocs/io.sentry.vendor' },
                        { text: 'io.sentry.vendor.gson.internal.bind.util', link: '/javadocs/io.sentry.vendor.gson.internal.bind.util' },
                        { text: 'io.sentry.vendor.gson.stream', link: '/javadocs/io.sentry.vendor.gson.stream' },
                        { text: 'it.unimi.dsi.fastutil', link: '/javadocs/it.unimi.dsi.fastutil' },
                        { text: 'it.unimi.dsi.fastutil.booleans', link: '/javadocs/it.unimi.dsi.fastutil.booleans' },
                        { text: 'it.unimi.dsi.fastutil.bytes', link: '/javadocs/it.unimi.dsi.fastutil.bytes' },
                        { text: 'it.unimi.dsi.fastutil.chars', link: '/javadocs/it.unimi.dsi.fastutil.chars' },
                        { text: 'it.unimi.dsi.fastutil.doubles', link: '/javadocs/it.unimi.dsi.fastutil.doubles' },
                        { text: 'it.unimi.dsi.fastutil.floats', link: '/javadocs/it.unimi.dsi.fastutil.floats' },
                        { text: 'it.unimi.dsi.fastutil.ints', link: '/javadocs/it.unimi.dsi.fastutil.ints' },
                        { text: 'it.unimi.dsi.fastutil.io', link: '/javadocs/it.unimi.dsi.fastutil.io' },
                        { text: 'it.unimi.dsi.fastutil.longs', link: '/javadocs/it.unimi.dsi.fastutil.longs' },
                        { text: 'it.unimi.dsi.fastutil.objects', link: '/javadocs/it.unimi.dsi.fastutil.objects' },
                        { text: 'org.checkerframework.checker.nullness.compatqual', link: '/javadocs/org.checkerframework.checker.nullness.compatqual' },
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
