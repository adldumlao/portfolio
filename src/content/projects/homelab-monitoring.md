---
title: "Homelab Monitoring Stack"
description: "Prometheus + Grafana + Uptime Kuma watching every box in the rack, alerting to Discord when something falls over."
status: "active"
stack: ["Prometheus", "Grafana", "Uptime Kuma", "Docker Compose"]
repoUrl: "https://github.com/yourname/homelab-monitoring"
date: 2025-11-02
order: 1
---

## What it does

A self-hosted observability stack sitting in a Docker Compose file on the
main node. Every service in the lab exports metrics to Prometheus; Grafana
turns them into dashboards; Uptime Kuma pings the public-facing services
and posts to a Discord webhook the moment something goes down.

## Why I built it

I got tired of finding out a service was down because *I* tried to use it.
Wanted push alerts instead of pull checking.

## Notes

- Runs on a Raspberry Pi 4 to keep it off the main compute node
- Dashboards are version-controlled as JSON, provisioned on boot
- Next step: pipe alerts into a status page for this site
