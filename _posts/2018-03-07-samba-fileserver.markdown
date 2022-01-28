---
layout: post
title: Einen Linux Fileserver mit Samba erstellen
author: Manuel Zarat
category: tutorials
permalink: /post/samba-fileserver
---

Samba ist ein kostenloser File Server kann aber auch als Domain Controller dienen.

<!--excerpt_separator-->

Der Name Samba leitet sich vom Netzwerkprotokoll SMB (Server Message Block) ab. Dieses wurde bereits 1983 von IBM entwickelt. Seit September 2017 ist SMBv3 Standard, und seit Samba 4.11 (ab Ubuntu 20.04 LTS) wird, wie auch in Windows 10, das Protokoll SMBv1 in der Grundeinstellung nicht mehr unterstützt. Die Installation ist einfach über den Paketmanager möglich.

<pre>
apt install samba
</pre>

Die bestehende Konfiguration unter <code>/etc/samba/smb.conf</code> kann gelöscht oder einfach bearbeitet werden.

<pre>
[Global]
workgroup = WORKGROUP
security = user
map to guest = Bad User
name resolve order = bcast host
include = /etc/samba/shares.conf

[Public Files]
path = /share/public_files
force user = smbuser
force group = smbgroup
create mask = 0664
force create mode = 0664
directory mask = 0775
force directory mode = 0775
public = yes
writeable = yes

[Protected Files]
path = /share/protected_files
force user = smbuser
force group = smbgroup
create mask = 0664
force create mode = 0664
directory mask = 0775
force directory mode = 0775
public = yes
writeable = no
</pre>

Der Benutzer <code>smbuser</code> und die Gruppe <code>smbgroup</code> werden als Systembenutzer bzw. Systemgruppe angelegt. Und der Benutzer bekommt keine Shell zugewiesen da kein Grund für ein Login besteht und alles im Hintergrund läuft.

<pre>
mkdir -p /share/public_files
mkdir -p /share/protected_files

groupadd --system smbgroup
useradd --system smbuser --no-create-home --group smbgroup -s /bin/false

chown -R smbuser:smbgroup /share
chmod -R g+w /share
</pre>
