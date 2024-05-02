---
layout: post
title: Ubuntu OpenVPN Server
author: Manuel Zarat
categories: tutorials
tags: sicherheit
permalink: /post/openvpn
---

In einer Welt, in der Datenschutz und Sicherheit immer wichtiger werden, ist es entscheidend, dass wir unsere Online-Kommunikation schützen. Eine Möglichkeit, dies zu erreichen, ist die Nutzung eines Virtual Private Networks (VPN). OpenVPN ist eine Open-Source-Software, die es uns ermöglicht, einen eigenen VPN-Server einzurichten, um unsere Internetverbindung zu sichern.

<!--excerpt_separator-->

Zuerst laden wir das Installationsscript herunter und machen es ausführbar.

<code>
wget https://git.io/vpn -O openvpn-install.sh
chmod +x openvpn-install.sh
</code>

Danach installieren wir OpenVPN mit Hilfe des Script.

<code>
sudo bash openvpn-install.sh
</code>

Nach der Installation erstellen wir einen Server Key der für die Kommunkikation zwischen OpenVPN Server und Client verwendet wird.

<code>
openvpn --genkey --secret /etc/openvpn/server/tc.key
</code>
