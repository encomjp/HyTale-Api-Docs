# Using Tailscale

**Tailscale** creates a private mesh VPN between your devices. Your friends install Tailscale, you share access, and they connect directly to your server—no port forwarding needed.

::: tip Why Tailscale?
- **Free** for personal use (up to 100 devices)
- **Works through CGNAT** and firewalls
- **Works on 4G/5G** mobile connections
- **Easy setup** - no networking knowledge required
- **Secure** - encrypted peer-to-peer connections
:::

## When to Use Tailscale

Use Tailscale if:
- Port forwarding doesn't work (CGNAT, mobile data)
- You don't have access to your router
- You want a private server only for friends
- You prefer not to expose your public IP

## Quick Setup

### Step 1: Install Tailscale on Your Server

**Windows:**

1. Download from [tailscale.com/download](https://tailscale.com/download)
2. Run the installer
3. Click the Tailscale icon in your system tray → **Log in**

**Linux:**

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Follow the login URL that appears.

### Step 2: Get Your Tailscale IP

After logging in, Tailscale assigns you a private IP (usually `100.x.x.x`).

**Windows:**
Click the Tailscale tray icon → Your IP is shown at the top.

**Linux:**
```bash
tailscale ip -4
```

Your server will be reachable at this IP within your Tailscale network.

### Step 3: Start Your Hytale Server

Start your server normally. It will automatically be accessible on your Tailscale IP.

### Step 4: Invite Your Friends

1. Go to [login.tailscale.com/admin/machines](https://login.tailscale.com/admin/machines)
2. Find your server machine and click **Share**
3. Send the invite link to your friends
4. They install Tailscale, create an account, and accept the invite

### Step 5: Friends Connect

Your friends open Hytale and connect to your **Tailscale IP**:

```
100.x.x.x:5520
```

That's it! No port forwarding, no public IP exposure.

## Tips

### Use a Static Tailscale Hostname

Instead of remembering `100.x.x.x`, friends can use your machine's Tailscale hostname:

```
my-server.tailnet-name.ts.net:5520
```

Find your hostname in the Tailscale admin console.

### Keep Tailscale Running

Make sure Tailscale is running whenever your server is:
- **Windows**: Tailscale starts automatically with Windows
- **Linux**: Enable the service: `sudo systemctl enable tailscaled`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Friend can't see your machine | Check they accepted the share invite |
| Connection refused | Make sure Hytale server is running |
| Tailscale not connecting | Try `tailscale up --reset` |
| High latency | Tailscale uses direct connections when possible; check both users' internet |

## Further Reading

- [Tailscale Quickstart](https://tailscale.com/kb/1017/install/)
- [Sharing with Friends](https://tailscale.com/kb/1084/sharing/)
- [Tailscale + Game Servers](https://tailscale.com/kb/1137/minecraft/)
- [Tailscale Subnet Routers](https://tailscale.com/kb/1019/subnets/) - Advanced: expose entire networks
