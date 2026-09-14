---
title: "Splunk SIEM Integration"
summary: "Integrating the Windows SOC endpoint with Splunk Enterprise for centralized security log collection and analysis."
status: "in-progress"
order: 5
---
Deployed the Splunk Universal Forwarder on the Windows 11 endpoint and
configured it to send Windows security telemetry to Splunk Enterprise.
Verified connectivity between the endpoint and Splunk receiver, confirmed
successful ingestion into a dedicated `windows` index, and began querying
endpoint security events using SPL.

<figure>
  <img src="/homelab/05-splunk/splunksetup.png" alt="Configuring the Splunk Universal Forwarder" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Configuring the Splunk Universal Forwarder — the Windows endpoint was configured to forward telemetry to the Splunk receiver over TCP port 9997.</figcaption>
</figure>

**Current progress:**
- Installed Splunk Enterprise on the host system
- Configured Splunk to receive forwarded data
- Installed Splunk Universal Forwarder on SOC-WIN11-01
- Configured the forwarder to communicate with the Splunk receiver on TCP 9997
- Verified endpoint-to-Splunk connectivity with `Test-NetConnection`

<figure>
  <img src="/homelab/05-splunk/splunkshell.png" alt="Verifying receiver connectivity with Test-NetConnection" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Verifying receiver connectivity — Test-NetConnection confirmed that SOC-WIN11-01 could successfully reach the Splunk receiver at 10.0.2.2:9997.</figcaption>
</figure>

- Created/used the `windows` index for endpoint telemetry
- Confirmed events from SOC-WIN11-01 are reaching Splunk
- Queried Windows Security logs in Splunk
- Successfully searched for Event ID 4625 from the endpoint
- Sysmon ingestion/search verification is the next step

### Log Ingestion Verification

<figure>
  <img src="/homelab/05-splunk/splunk1.png" alt="Windows telemetry successfully ingested into Splunk" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Windows telemetry successfully ingested — searching the windows index returned thousands of events from SOC-WIN11-01, confirming that endpoint logs were reaching Splunk Enterprise.</figcaption>
</figure>

### Initial SPL Investigation

<figure>
  <img src="/homelab/05-splunk/splunk2.png" alt="Querying authentication events for Event ID 4625" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Querying authentication events — filtered the endpoint's Windows Security logs for Event ID 4625 to locate a failed logon event previously analyzed during the authentication-log investigation.</figcaption>
</figure>

The forwarding pipeline works end to end, but this isn't done yet. Sysmon
ingestion and deeper SPL-based analysis are still in progress.
