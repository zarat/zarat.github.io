---
layout: post
title: Einen Linux DHCP Server erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/isc-dhcp-server
---

<p>DHCP erleichtert die Vergabe von IP Adressen im Netzwerk. Ist ein DHCP Server im Netzwerk vorhanden, kann dieser neben der IP Adresse auch das Gateway, einen Namensserver usw. bekanntgeben. Dieser Dienst ist in Windows Server integriert. Der ISC-DHCP Server, der unter Aufsicht des Internet-Systems-Consortiums steht, ist eine kostenlose Alternative und die inoffizielle Referenzimplementierung. Man kann ihn über das APT Tool installieren.</p>

<!--excerpt_separator-->

<pre>apt-get install isc-dhcp-server</pre>

<h1>Globale Konfiguration</h1>

<p>Die Konfiguration des DHCP-Servers geschieht in der Datei /etc/dhcp/dhcp.conf.</p>

<pre>authoritative;
# Definition des Subnetzes
subnet 192.168.1.0 netmask 255.255.255.0 {
        range 192.168.1.10 192.168.1.20;
        # Interface
        interface eth0
        # Lease-Time (in Sekunden)
        default-lease-time 600;
        max-lease-time 7200;
        # Domainname anpassen!
        option domain-name "domain.local";
        option domain-name-servers 192.168.0.1;
        option broadcast-address 192.168.0.255;
        option subnet-mask 255.255.255.0;
        option routers 192.168.0.1;
}</pre>

<p>DHCP Server sollten IMMER das Statement authoritative innerhalb der globalen Konfigurationsdatei stehen haben, um keine unbekannten DHCP Server im Netz zu dulden. Die Lease Time besagt, wie lange ein durch DHCP vergebene Konfiguration gültig sein soll. Danach wird diese automatisch erneuert.</p>

<h1>Host Blöcke</h1>

<p>Möchte man bestimmte IP Adressen für bestimmte Hosts reservieren, kann man die betreffenden Hosts in eigenen Blöcken definieren.</p>

<pre>host chef { hardware ethernet 00:00:0e:d2:da:be; fixed-address 192.168.0.2; option host-name "chef"; }
host ma1 { hardware ethernet 00:00:0e:d2:da:b3; fixed-address 192.168.0.3; option host-name "ma1"; }
host ma2 { hardware ethernet 00:00:0e:d2:da:a1; fixed-address 192.168.0.4; option host-name "ma2"; }</pre>

<p>Aufgrund der Tatsache, das man Hardware Adressen fälschen kann ist DHCP keine sichere Methode, ein Gerät zu authentifizieren. Server sollten immer eine feste, statische IP Adresse eingetragen haben.</p>
