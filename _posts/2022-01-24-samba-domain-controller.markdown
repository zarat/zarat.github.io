---
layout: post
title: Einen Domain Controller mit Samba estellen
author: Manuel Zarat
category: tutorials
permalink: /post/samba-domain-controller
---

Der Server muss eine statische IP Adresse haben. Dazu bearbeite ich die Datei <code>/etc/network/interfaces</code>.

<pre>
auto eth0
iface eth0 inet static
address 192.168.0.2
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameservers 8.8.8.8
</pre>
