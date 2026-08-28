---
title: "Zero-Port-Forward Reverse Proxy"
description: "Cloudflare Tunnel + Nginx Proxy Manager exposing internal services without opening a single port on the router."
status: "wip"
stack: ["Cloudflare Tunnel", "Nginx Proxy Manager", "Docker"]
repoUrl: "https://github.com/adldumlao/homelab-tunnel"
date: 2026-01-15
order: 2
---

## What it does

Routes subdomains like `grafana.yourdomain.com` to internal services
through a Cloudflare Tunnel, so nothing on the home network is directly
reachable from the internet.

## Currently working on

- Adding Cloudflare Access in front of admin-only services
- Automating subdomain + tunnel config with a single script
