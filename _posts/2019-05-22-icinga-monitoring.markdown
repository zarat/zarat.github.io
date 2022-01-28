---
layout: post
title: Einen Linux Monitoring Server mit Icinga erstellen
author: Manuel Zarat
categories: tutorials
tags: monitoring
permalink: /post/icinga-monitoring
---

Icinga ist ein weiteres Tool zur professionellen Überwachung Ihrer IT Infrastruktur.

<!--excerpt_separator-->

Die erforderlichen Pakete installiert man mit

<pre>
apt install net-tools 
apt install lamp-server^
</pre>

<pre><code class="language-javascript">var el = document.getElementById("test");</code></pre>

Man wird nach einem Password für den MySQL Administrator gefragt. Wählen Sie ein starkes Passwort! Nun kann Icinga und das Icinga MySQL Modul installiert werden.

<pre>
apt install icinga2 icinga2-ido-mysql
</pre>

Nun werden 2 Fragen gestellt, "Enable Icinga 2's ido-mysql feature" und "Configure database for icinga2-ido-mysql with dbconfig-common". Beides wird mit "Ja" beantwortet und anschliessend noch ein Passwort für "icinga2-ido-mysql" erstellt, das ist der Dienst mit dem Icinga auf die Datenbank zugreift.
Die 2 Features "ido-mysql" und "command" müssen noch aktiviert werden.

<pre>
icinga2 feature enable ido-mysql
icinga2 feature enable command
systemctl restart icinga2
</pre>

Nun kann das Icinga Web Interface installiert werden.

<pre>
apt-get install icingaweb2
</pre>

In der Datei <code>/etc/php/7.1/apache2/php.ini</code> wird die Serverzeitzone eingefügt

<pre>
date.timezone = Europe/Vienna
</pre>

und der Apache Server gestartet um das Web Interface zu konfigurieren.

<pre>
systemctl restart apache2
</pre>

Davor benötigt man jedoch noch einen Setup Token. Diesen generiert man mit Hilfe von

<pre>
icingacli setup token create
</pre>
