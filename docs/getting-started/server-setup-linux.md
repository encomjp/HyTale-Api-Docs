# Server Setup (Linux)

This guide covers setting up a Hytale server on Linux distributions like Ubuntu, Debian, or Fedora.

## Prerequisites

- A Linux distribution (Ubuntu 22.04+, Debian 12+, Fedora 38+ recommended)
- Terminal access
- `wget` or `curl` installed

## Step 1: Install Java 25

### Ubuntu/Debian

```bash
# Add Adoptium repository
wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo apt-key add -
echo "deb https://packages.adoptium.net/artifactory/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/adoptium.list

# Install Java 25
sudo apt update
sudo apt install temurin-25-jdk
```

### Fedora

```bash
sudo dnf install java-25-openjdk java-25-openjdk-devel
```

### Verify Installation

```bash
java -version
```

You should see `version "25.0.x"` or higher.

## Step 2: Download the Server

```bash
# Create server directory
mkdir -p ~/hytale-server && cd ~/hytale-server

# Download the downloader
wget https://downloader.hytale.com/hytale-downloader-linux.tar.gz
tar -xzf hytale-downloader-linux.tar.gz

# Make executable and run
chmod +x hytale-downloader
./hytale-downloader
```

Follow the authentication URL in your browser. After logging in, the server files will download automatically.

::: tip
Credentials are saved in `.hytale-downloader-credentials.json`. Keep this file secure and out of version control.
:::

## Step 3: Start the Server

```bash
java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip
```

| Flag | Meaning |
|------|---------|
| `-Xmx4G` | Maximum 4GB RAM |
| `-Xms2G` | Initial 2GB RAM |
| `--assets` | Path to game assets |

## Running as a Service (systemd)

Create `/etc/systemd/system/hytale.service`:

```ini
[Unit]
Description=Hytale Server
After=network.target

[Service]
User=hytale
WorkingDirectory=/home/hytale/hytale-server
ExecStart=/usr/bin/java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl enable hytale
sudo systemctl start hytale
sudo systemctl status hytale
```

## Quick Start Script

Create `start.sh`:

```bash
#!/bin/bash
while true; do
    java -Xmx4G -Xms2G -jar HytaleServer.jar --assets Assets.zip
    echo "Server stopped. Restarting in 5 seconds..."
    sleep 5
done
```

Make it executable: `chmod +x start.sh`

## Next Steps

- [IDE: Visual Studio Code](/getting-started/ide-vscode) - Set up your editor
- [IDE: IntelliJ IDEA](/getting-started/ide-intellij) - Professional IDE setup
- [First Plugin](/getting-started/first-plugin) - Build your first plugin
