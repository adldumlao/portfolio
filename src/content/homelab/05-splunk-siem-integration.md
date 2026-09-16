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
  <figcaption class="text-xs text-dim italic mt-2">Configuring the Splunk Universal Forwarder. The Windows endpoint was configured to forward telemetry to the Splunk receiver over TCP port 9997.</figcaption>
</figure>

**Current progress:**
- Installed Splunk Enterprise on the host system
- Configured Splunk to receive forwarded data
- Installed Splunk Universal Forwarder on SOC-WIN11-01
- Configured the forwarder to communicate with the Splunk receiver on TCP 9997
- Verified endpoint-to-Splunk connectivity with `Test-NetConnection`

<figure>
  <img src="/homelab/05-splunk/splunkshell.png" alt="Verifying receiver connectivity with Test-NetConnection" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Verifying receiver connectivity. Test-NetConnection confirmed that SOC-WIN11-01 could successfully reach the Splunk receiver at 10.0.2.2:9997.</figcaption>
</figure>

- Created/used the `windows` index for endpoint telemetry
- Confirmed events from SOC-WIN11-01 are reaching Splunk
- Queried Windows Security logs in Splunk
- Successfully searched for Event ID 4625 from the endpoint
- Verified Sysmon Operational events are searchable in Splunk

### Log Ingestion Verification

<figure>
  <img src="/homelab/05-splunk/splunk1.png" alt="Windows telemetry successfully ingested into Splunk" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Windows telemetry successfully ingested. Searching the windows index returned thousands of events from SOC-WIN11-01, confirming that endpoint logs were reaching Splunk Enterprise.</figcaption>
</figure>

### Initial SPL Investigation

<figure>
  <img src="/homelab/05-splunk/splunk2.png" alt="Querying authentication events for Event ID 4625" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Querying authentication events. I filtered the endpoint's Windows Security logs for Event ID 4625 to locate a failed logon event previously analyzed during the authentication log investigation.</figcaption>
</figure>

### Troubleshooting Sysmon Log Ingestion

While configuring Splunk to collect Sysmon telemetry from `SOC-WIN11-01`, the
Universal Forwarder failed to subscribe to the Sysmon Operational event
channel.

Reviewing the Splunk Forwarder logs showed `errorCode=5`, indicating that the
forwarder could not access the event channel.

<figure>
  <img src="/homelab/05-splunk/ts1.png" alt="Splunk Universal Forwarder errorCode 5 while subscribing to the Sysmon Operational channel" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">The Splunk Universal Forwarder reported errorCode=5 while attempting to subscribe to the Sysmon Operational event channel.</figcaption>
</figure>

#### Investigation and Fix

I checked the status of the `Microsoft-Windows-Sysmon/Operational` channel and
found that it was disabled.

I enabled the channel with:

```powershell
wevtutil sl Microsoft-Windows-Sysmon/Operational /e:true
```

After enabling it, I verified that `IsEnabled` changed from `False` to `True`
and confirmed that Sysmon Event ID 1 records could be queried successfully.

<figure>
  <img src="/homelab/05-splunk/ts2.png" alt="Enabling the Sysmon Operational event channel with wevtutil" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">The Sysmon Operational channel was disabled. After enabling it with wevtutil, the channel reported IsEnabled: True and Sysmon events were accessible again.</figcaption>
</figure>

#### Verification in Splunk

I returned to Splunk and searched specifically for Sysmon telemetry from the
Windows endpoint:

```spl
index=windows host=SOC-WIN11-01 source="WinEventLog:Microsoft-Windows-Sysmon/Operational"
```

Splunk returned Sysmon events from `SOC-WIN11-01`, confirming that the
Universal Forwarder could now collect and send the telemetry successfully.

<figure>
  <img src="/homelab/05-splunk/ts3.png" alt="Sysmon telemetry successfully ingested into Splunk" class="rounded-xl border border-line" />
  <figcaption class="text-xs text-dim italic mt-2">Sysmon telemetry was successfully ingested into Splunk after the event channel was enabled.</figcaption>
</figure>

#### What I Learned

When log ingestion fails, checking each part of the collection path separately
helps isolate the issue. In this case, Sysmon was generating telemetry, but the
Operational event channel used by Splunk was disabled. Reviewing the forwarder
logs revealed the subscription error, checking the channel state identified the
cause, and confirming the events in Splunk verified the fix.

The forwarding pipeline now works end to end for both Windows Security and
Sysmon telemetry. Deeper SPL-based analysis and detection work are still in
progress.
