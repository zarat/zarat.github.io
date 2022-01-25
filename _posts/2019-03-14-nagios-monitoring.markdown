---
layout: post
title: Einen Linux Monitoring Server mit Nagios erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/nagios-monitoring
---

Als eines der erfolgreichsten Open-Source-Projekte überhaupt, bietet der Platzhirsch kostenfreies IT-Monitoring auf dem Niveau der besten kommerziellen Werkzeuge und ein umfangreiches Ökosystem an Erweiterungen und Zusatztools.

<!--excerpt_separator-->

Zuerst kontrolliert man ob das Service selinux läuft.

<pre>
sudo dpkg -l selinux*
</pre>

Die erforderlichen Pakete installiert man mit

<pre>
sudo apt install -y autoconf gcc libc6 make wget unzip apache2 php libapache2-mod-php libgd-dev
</pre>
