---
title: "Process & Network Investigation"
summary: "Correlating process execution with network activity using Sysmon telemetry."
status: "complete"
order: 3
---
Completed:
- Generated controlled PowerShell activity
- Analyzed Event ID 1 — Process Creation
- Analyzed Event ID 3 — Network Connection
- Identified destination IP and port
- Correlated Event ID 1 and Event ID 3 using ProcessGuid
- Determined the observed activity was benign
