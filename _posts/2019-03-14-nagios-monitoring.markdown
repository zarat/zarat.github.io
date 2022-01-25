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

Nun kann der Quellcode heruntergeladen und entpackt werden.

<pre>
cd /tmp
wget -O nagioscore.tar.gz https://github.com/NagiosEnterprises/nagioscore/archive/nagios-4.4.6.tar.gz
tar xzf nagioscore.tar.gz
</pre>

Der Quellcode wird mit Hilfe eines makefile kompiliert.

<pre>
cd /tmp/nagioscore-nagios-4.4.6/
sudo ./configure --with-httpd-conf=/etc/apache2/sites-enabled
sudo make all
</pre>

Zum Anlegen der benötigten Benutzer und Gruppen gibt es ein fertiges Script. Der Benutzer <code>nagios</code> wird der Gruppe <code>www-data</code> hinzugefügt.

<pre>
sudo make install-groups-users
sudo usermod -a -G nagios www-data
</pre>

Nun kann nagios installiert werden.

<pre>
sudo make install
sudo make install-daemoninit
sudo make install-commandmode
sudo make install-config
</pre>

Apache Konfiguration erstellen und die Module <code>rewrite</code> und <code>cgi</code> aktivieren.

<pre>
sudo make install-webconf
sudo a2enmod rewrite
sudo a2enmod cgi
</pre>

Einen Benutzeraccount für die Weboberfläche erstellen.

<pre>
sudo htpasswd -c /usr/local/nagios/etc/htpasswd.users nagiosadmin
</pre>

Nun kann nagios zum ersten mal gestartet werden.

<pre>
service nagios start
</pre>
