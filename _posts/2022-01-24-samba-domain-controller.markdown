---
layout: post
title: Einen Domain Controller mit Samba estellen
author: Manuel Zarat
category: tutorials
permalink: /post/samba-domain-controller
---

Der Server muss eine statische IP Adresse haben. Dazu bearbeite ich die Datei <code>/etc/network/interfaces</code> und füge folgendes ein.

<pre>
auto eth0
iface eth0 inet static
address 192.168.0.2
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameservers 8.8.8.8
</pre>

Um den Hostnamen festzulegen bearbeite ich die Dateien <code>/etc/hosts</code> und <code>/etc/hostname</code>. In die Datei <code>/etc/hostname</code> schreibe ich den FQDN, den kompletten Servernamen inklusive Domain.

<pre>
samba.example.com<
</pre>

und in der Datei <code>/etc/hosts</code> füge ich einen Eintrag zu der eben eingestellten IP Adresse, dem FQDN und dem Hostnamen hinzu.

<pre>
192.168.0.2    samba.example.com    samba
</pre>
