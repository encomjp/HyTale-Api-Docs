# Server Setup (Docker)

::: danger Unofficial & Community-Made
This Docker image is **not officially supported** by Hypixel Studios. It is maintained by the community and intended for homelab enthusiasts using tools like Portainer.
:::

This guide covers deploying a Hytale server using the most popular community Docker image.

## Why Docker?

- **Consistent environment** across any host OS
- **Easy updates** with a simple image pull
- **Isolation** from host system
- **Perfect for homelabs** running Portainer, Unraid, Proxmox, etc.

## The Image

We recommend the most popular community image (as of 21/01/2026):

| Image | Info |
|-------|------|
| [`deinfreu/hytale-server`](https://hub.docker.com/r/deinfreu/hytale-server) | ~56MB, Alpine/Liberica, Non-root, QUIC Enabled |

- **Docker Hub**: [hub.docker.com/r/deinfreu/hytale-server](https://hub.docker.com/r/deinfreu/hytale-server)
- **GitHub**: Check the project for updates and documentation

## Quick Start (CLI)

```bash
docker run \
  --name hytale-server \
  -e SERVER_IP="0.0.0.0" \
  -e SERVER_PORT="5520" \
  -e PROD="FALSE" \
  -e DEBUG="FALSE" \
  -e TZ="Europe/Amsterdam" \
  -p 5520:5520/udp \
  -v "hytale-server:/home/container" \
  -v "/etc/machine-id:/etc/machine-id:ro" \
  --restart unless-stopped \
  -t -i \
  deinfreu/hytale-server:experimental
```

## Docker Compose

Create a `docker-compose.yml`:

```yaml
services:
  hytale:
    image: deinfreu/hytale-server:experimental
    container_name: hytale-server
    environment:
      SERVER_IP: "0.0.0.0"
      SERVER_PORT: "5520"
      PROD: "FALSE"
      DEBUG: "FALSE"
      TZ: "Europe/Amsterdam"
    restart: unless-stopped
    ports:
      - "5520:5520/udp"
    volumes:
      - ./data:/home/container
      - /etc/machine-id:/etc/machine-id:ro
    tty: true
    stdin_open: true
```

Then run:

```bash
docker compose up -d
```

## Authentication

On first run, the server requires Hytale authentication:

1. Attach to the container:
   ```bash
   docker attach hytale-server
   ```
2. Run the auth command:
   ```bash
   auth login device
   ```
3. Copy the verification code and paste it into the Hytale OAuth website
4. Login with your Hytale account

The server will start automatically after authentication.

## Port Forwarding

To allow friends to connect from outside your local network, you'll need to configure port forwarding on your router.

See the full guide: **[Port Forwarding](/getting-started/port-forwarding)**

## Troubleshooting

### Permission Errors (Linux)

If the container crashes with file access errors:

```bash
# Test with full permissions
chmod -R 777 ./data

# If that works, use safer permissions
chmod -R 755 ./data
```

### Container Logs

```bash
docker logs hytale-server
docker logs -f hytale-server  # Follow live
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_IP` | `0.0.0.0` | Bind address |
| `SERVER_PORT` | `5520` | UDP port |
| `PROD` | `FALSE` | Production mode |
| `DEBUG` | `FALSE` | Debug logging |
| `TZ` | `Europe/Amsterdam` | Timezone |

## Next Steps

- [First Plugin](/getting-started/first-plugin) - Build your first plugin
- [Debugging](/getting-started/debugging) - Troubleshooting guide

