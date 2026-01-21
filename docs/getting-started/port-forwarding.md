# Port Forwarding

If you want friends or other players to connect to your Hytale server from outside your local network, you need to set up **port forwarding**. Without this, your router will block incoming connections to your server.

::: info Why is this needed?
Your home router acts as a firewall, protecting your devices from random internet traffic. Port forwarding creates a "hole" in this firewall, telling your router: "When someone connects to this specific port, send them to my server."
:::

## Prerequisites

- Access to your router's admin panel
- Your server's local IP address
- Knowledge of which port your server uses (default: `5520` UDP for Hytale)

## Step 1: Find Your Local IP

### Windows

Open PowerShell and run:

```powershell
ipconfig
```

Look for **IPv4 Address** under your active network adapter (usually `192.168.x.x` or `10.0.x.x`).

### Linux

```bash
ip addr
# or
hostname -I
```

## Step 2: Access Your Router

1. Open a browser and go to your router's admin page:
   - Common addresses: `192.168.1.1`, `192.168.0.1`, `10.0.0.1`
   - Check the sticker on your router if unsure
2. Log in with your router credentials (often printed on the router itself)

## Step 3: Create a Port Forward Rule

Navigate to **Port Forwarding** (may be called "NAT", "Virtual Servers", "Gaming", or under "Advanced Settings").

Add a new rule with these settings:

| Field | Value |
|-------|-------|
| Name | `Hytale Server` |
| Protocol | **UDP** |
| External Port | `5520` |
| Internal IP | Your server's local IP (e.g., `192.168.1.100`) |
| Internal Port | `5520` |

Save and apply the rule.

## Step 4: Configure Your Firewall

Make sure your operating system's firewall allows the port.

### Windows

```powershell
# Run PowerShell as Administrator
New-NetFirewallRule -DisplayName "Hytale Server" -Direction Inbound -Protocol UDP -LocalPort 5520 -Action Allow
```

Or use Windows Defender Firewall GUI:
1. Open **Windows Defender Firewall with Advanced Security**
2. Click **Inbound Rules** → **New Rule**
3. Select **Port** → **UDP** → Enter `5520`
4. Allow the connection → Apply to all profiles → Name it "Hytale Server"

### Linux

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 5520/udp

# firewalld (Fedora/CentOS)
sudo firewall-cmd --add-port=5520/udp --permanent
sudo firewall-cmd --reload
```

## Step 5: Find Your Public IP

Your friends will connect using your **public IP address**, not your local one.

Find it at: [whatismyip.com](https://www.whatismyip.com/)

Give your friends this IP and port, e.g., `123.45.67.89:5520`

## Testing

1. Start your Hytale server
2. Ask a friend (on a different network) to connect to `YOUR_PUBLIC_IP:5520`
3. Check your server logs for connection attempts

## Troubleshooting

### "It's still not working!"

::: warning No Public IPv4 (CGNAT)
Some ISPs use **Carrier-Grade NAT (CGNAT)**, meaning you share a public IP with other customers. Port forwarding won't work in this case.

**Signs you're behind CGNAT:**
- Your router's "WAN IP" starts with `100.64.x.x` or doesn't match [whatismyip.com](https://www.whatismyip.com/)
- Port forwarding is set up correctly but still doesn't work

**Also note:** Most **4G/5G mobile connections** do NOT have a public IPv4 address. If you're using mobile data or a mobile hotspot, port forwarding will almost certainly not work.
:::

### Alternatives

If port forwarding doesn't work, try these solutions:

| Solution | Description |
|----------|-------------|
| **Ask your ISP** | Request a dedicated public IPv4 (may cost extra) |
| **[ProtonVPN](https://protonvpn.com/)** | Great European VPN with port forwarding support |
| **[Mullvad](https://mullvad.net/)** | Great for privacy, supports port forwarding |
| **[Playit.gg](https://playit.gg/)** | Free tunneling service, easy setup |
| **[Ngrok](https://ngrok.com/)** | Popular tunneling tool |
| **[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)** | Enterprise-grade tunneling |
| **[Tailscale](#using-tailscale)** | Private mesh VPN - see below |

---

## Using Tailscale (Recommended Alternative)

**Tailscale** creates a private mesh VPN between your devices. Your friends install Tailscale, you share access, and they connect directly—no port forwarding needed.

::: tip Why Tailscale?
- **Free** for personal use (up to 100 devices)
- **Works through CGNAT** and firewalls
- **Easy setup** - no networking knowledge required
- **Secure** - encrypted peer-to-peer connections
:::

### Quick Setup

#### 1. Install Tailscale on Your Server

**Windows:**
Download from [tailscale.com/download](https://tailscale.com/download)

**Linux:**
```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

#### 2. Get Your Tailscale IP

After logging in, Tailscale assigns you a private IP (usually `100.x.x.x`).

```bash
tailscale ip -4
```

Your server will be reachable at this IP within your Tailscale network.

#### 3. Invite Your Friends

1. Go to [login.tailscale.com/admin/machines](https://login.tailscale.com/admin/machines)
2. Click **Share** on your server's machine
3. Send the invite link to your friends
4. They install Tailscale and accept the invite

#### 4. Friends Connect

Your friends connect to your **Tailscale IP** (not your public IP):

```
100.x.x.x:5520
```

### Further Reading

- [Tailscale Quickstart](https://tailscale.com/kb/1017/install/)
- [Sharing with Friends (Tailscale Docs)](https://tailscale.com/kb/1084/sharing/)
- [Tailscale + Game Servers Guide](https://tailscale.com/kb/1137/minecraft/)

---

### Common Issues

| Problem | Solution |
|---------|----------|
| Port appears closed | Check firewall rules on both router and OS |
| Friends can't connect | Verify they're using your public IP, not local |
| Connection timeout | Server might not be running, or wrong port |
| Works locally, not remotely | Port forwarding rule is incorrect or not saved |
| Mobile data / 5G | Use Tailscale or a tunneling service instead |

## Next Steps

- [Windows Setup](/getting-started/server-setup-windows) - Back to Windows guide
- [Linux Setup](/getting-started/server-setup-linux) - Back to Linux guide
- [Docker Setup](/getting-started/server-setup-docker) - Docker deployment
