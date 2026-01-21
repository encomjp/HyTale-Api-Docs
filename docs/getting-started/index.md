# Getting Started with Hytale Development

Welcome! This guide will walk you through everything you need to start creating plugins for Hytale.

::: tip Complete Beginner?
No worries! Follow the steps below in order, and you'll have your first plugin running in about 30 minutes.
:::

## The Journey

Here's what we'll do together:

| Step | What You'll Do | Time |
|------|----------------|------|
| **1. Install the Server** | Get a Hytale server running locally | ~10 min |
| **2. Set Up Your IDE** | Configure your code editor | ~5 min |
| **3. Create Your Plugin** | Build and run a "Hello World" plugin | ~15 min |

---

## Step 1: Install the Server

First, you need a Hytale server to test your plugins on.

Choose your operating system:
- 🪟 **[Windows Setup](./server-setup-windows)** - Most common
- 🐧 **[Linux Setup](./server-setup-linux)** - For servers and advanced users
- 🐳 **[Docker Setup](./server-setup-docker)** - For homelab enthusiasts (community image)

::: info What You'll Install
- **Java 25+** - The runtime Hytale needs
- **Hytale Server** - Downloaded via the official Hytale Downloader
- **Assets** - Game files the server requires
:::

---

## Step 2: Set Up Your IDE

An IDE (Integrated Development Environment) makes coding much easier with features like autocomplete, error highlighting, and debugging.

Choose your editor:
- 💻 **[Visual Studio Code](./ide-vscode)** - Lightweight, free, great for beginners
- 🧠 **[IntelliJ IDEA](./ide-intellij)** - Powerful, professional, best for Java

::: tip Which Should I Choose?
**VS Code** if you want something simple and fast.
**IntelliJ** if you want the best Java development experience.
:::

---

## Step 3: Create Your Plugin

Now the fun part! You'll create a project and write your first plugin.

1. **[Project Setup](./project-setup)** - Create a Gradle or Maven project
2. **[Hello World](./hello-world)** - Write code that welcomes players

After completing these, your plugin will:
- ✅ Load when the server starts
- ✅ Welcome players when they join
- ✅ Log messages to the console

---

## What Can You Create?

### Plugins
Server-side modifications in Java or Kotlin:
- Custom commands (`/home`, `/spawn`, `/kit`)
- Event reactions (welcome messages, death announcements)
- New game mechanics (economy, quests, minigames)
- Permissions and moderation tools

### Art Packs
Visual customizations:
- Block and item textures
- Character skins and models
- UI elements and particles

### Resource Packs
Game resources:
- Sounds and music
- Localization and translations
- Configuration files

---

## Quick Links

| Resource | Description |
|----------|-------------|
| [Common Issues](./common-issues) | Solutions to frequent problems |
| [Debugging Guide](./debugging) | How to read logs and fix bugs |
| [Port Forwarding](./port-forwarding) | Let friends connect to your server |
| [Using Tailscale](./tailscale) | Easy way to play with friends |

## Resources

- [Official Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual) - Official Hytale documentation
- [This Documentation on GitHub](https://github.com/encomjp/HyTale-Api-Docs) - Contribute or report issues

---

Ready? Let's start with **[installing the server →](./server-setup-windows)**
