---
layout: post
title: Ubuntu OpenVPN Server
author: Manuel Zarat
categories: tutorials
tags: sicherheit vpn
permalink: /post/openvpn
---

In einer Welt, in der Datenschutz und Sicherheit immer wichtiger werden, ist es entscheidend, dass wir unsere Online-Kommunikation schützen. Eine Möglichkeit, dies zu erreichen, ist die Nutzung eines Virtual Private Networks (VPN). <a href="https://openvpn.net/" target="_blank">OpenVPN</a> ist eine Open-Source-Software, die es uns ermöglicht, einen eigenen VPN-Server einzurichten, um unsere Internetverbindung zu sichern.

<!--excerpt_separator-->

Zuerst laden wir das Installationsscript herunter und machen es ausführbar.

<pre>
wget https://git.io/vpn -O openvpn-install.sh
chmod +x openvpn-install.sh
</pre>

Danach installieren wir OpenVPN mit Hilfe des Script.

<pre>
sudo bash openvpn-install.sh
</pre>

Nach der Installation erstellen wir einen Server Key der für die Kommunkikation zwischen OpenVPN Server und Client verwendet wird.

<pre>
openvpn --genkey --secret /etc/openvpn/server/tc.key
</pre>

Um einen Benutzer zu erstellen ruft man das Installer Script erneut auf und bekommt ein interaktives Menü. Den Server starten bzw. beenden kann man mit

<pre>
sudo systemctl start|stop openvpn-server@server.service
</pre>

<h2>Statusberichte</h2>

Um eine Statusübersicht über alle Verbindungen zu bekommen kann man in der Serverkonfiguration unter

<pre>
/etc/openvpn/server/server.conf
</pre>

die folgende Zeile eintragen.

<pre>
status /var/log/openvpn-status.log
</pre>

<h2>IP Reservierungen</h2>

Um IP Reservierungen vorzunehmen kann man Client Config Dir (CCD) konfigurieren. In der Serverkonfig

<pre>
/etc/openvpn/server/server.conf
</pre>

diese Zeile einfügen (falls sie noch nicht exisitiert).

<pre>
client-config-dir /etc/openvpn/ccd
</pre>

<pre>
sudo mkdir -p /etc/openvpn/ccd
sudo chmod 755 /etc/openvpn/ccd
</pre>
  
Um eine Konfiguration für einen User anzulegen muss man eine Datei erstellen, z.B

<pre>
/etc/openvpn/ccd/client1
</pre>

Die Syntax ist die selbe wie in der server.conf.

<pre>
ifconfig-push 10.8.0.10 255.255.255.0
</pre>
