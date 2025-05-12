---
layout: post
title: Ein kostenloses IPSec Site-to-Site VPN mit Strongswan
author: Manuel Zarat
categories: tutorials
tags: sicherheit
permalink: /post/strongswan-site-to-site-vpn
---

<a href="https://strongswan.org/" target="_blank">StrongSwan</a> ist eine Open-Source IPsec-basiertes VPN-Lösung für Linux und andere Unix-Systeme. Es unterstützt IKEv1 und IKEv2, ist hochgradig konfigurierbar und eignet sich für viele Einsatzszenarien – vom einfachen Road-Warrior-VPN bis hin zu komplexen Netz-zu-Netz-Verbindungen mit mehreren Subnetzen.

<!--excerpt_separator-->

Ein Site-to-Site VPN verbindet zwei komplette Netzwerke miteinander – z. B. den Hauptsitz eines Unternehmens mit einer Außenstelle. Dabei entsteht ein "virtueller Tunnel", durch den Daten sicher übertragen werden – als wären beide Standorte im gleichen LAN.

Ein klassisches Beispiel:

<ul>
<li>Standort A: Büro in Wien, Netzwerk 192.168.10.0/24</li>
<li>Standort B: Büro in Salzburg, Netzwerk 192.168.20.0/24</li>
</ul>

Ziel: Beide Netzwerke sollen sich gegenseitig erreichen können – verschlüsselt und dauerhaft.

Zuerst installieren wir Strongswan auf beiden Endpunkten.

<pre>
sudo apt update
sudo apt install strongswan
</pre>

Wir nehmen folgendes Szenario an:

Server A (left):
<ul>
<li>Öffentliche IP: 1.1.1.1</li>
<li>Lokales Netz: 192.168.10.0/24</li>
</ul>

Server B (right):
<ul>
<li>Öffentliche IP: 2.2.2.2</li>
<li>Lokales Netz: 192.168.20.0/24</li>
</ul>

Beide Server erhalten eine identische, aber spiegelbildliche Konfiguration.

Danach erstellt man 2 Konfigurationsdateien. In die Datei /etc/ipsec.conf kommt die IPSec Konfiguration.

<pre>
config setup
    charondebug="ike 1, knl 2, cfg 2, net 2, esp 2, dmn 2,  mgr 2"

conn site-to-site
    auto=start
    keyexchange=ikev2
    authby=secret
    left=1.1.1.1           # öffentliche IP von A
    leftsubnet=192.168.10.0/24   # internes Netz von A
    right=2.2.2.2           # öffentliche IP von B
    rightsubnet=192.168.20.0/24  # internes Netz von B
    ike=aes256-sha256-modp1024!
    esp=aes256-sha256!
    dpdaction=restart
    dpddelay=30s
    dpdtimeout=120s
</pre>

Den PSK muss man in der Datei /etc/ipsec.secrets eintragen.

<pre>1.1.1.1 2.2.2.2 : PSK "EinStarkesPasswort123!"</pre>

Damit wäre die Grundkonfiguration erledigt und der Tunnel kann aufgebaut werden. Um den Traffic zwischen den Subnetzen zu routen muss man IP Forwarding einrichten.

<pre>
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
</pre>

und die Pakete in das richtig Subnetz routen.

<pre>
iptables -t nat -A POSTROUTING -s 192.168.10.0/24 -d 192.168.20.0/24 -j ACCEPT
</pre>

To be continued...
