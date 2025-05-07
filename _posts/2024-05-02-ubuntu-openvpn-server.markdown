---
layout: post
title: Ubuntu OpenVPN Server
author: Manuel Zarat
categories: tutorials
tags: sicherheit
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

Um einen Benutzer zu erstellen ruft man das Installer Script erneut auf und bekommt ein interaktives Menü.
