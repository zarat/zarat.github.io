---
layout: post
title: Prozessautomatisierung mit Camunda BPM
author: Manuel Zarat
category: tutorials
tags: programm
permalink: /blog/camunda-bpm
---

Camunda ist ein kostenloses BPM Automatisierungstool auf Enterprise Niveau.

<!--excerpt_separator-->

Zuerst lade ich Camunda von der Website herunter. Ich wähle dabei "Other distributions" und den Tomcat Download (~120MB). Die Ordnerstruktur ist im Wurzelverzeichnis des Paketes deshalb erstelle ich einen neuen Ordner und entpacke das zip Paket darin. Ausserdem installiere ich das benötigte Java JDK und die JRE gleich mit.

<pre>
  apt install openjdk-8-jdk openjdk-8-jre
</pre>

Im Prinzip ist eine lauffähige Demo jetzt einsatzbereit. Für das Production environment sollte man allerdings davor einige Einstellungen vornehmen.

<h3>Datenbank</h3>

Von Haus aus arbeitet Camunda mit einer h2 Datenbank. Das ist eine In-Memory Datenbank welche keine Persistenz bietet. Deshalb konfiguriere ich eine Anbindung an MySQL. 

<pre>
apt install mysql-server
mysql_secure_installatoin
</pre>

Nach der Anmeldung führe ich folgende Befehle aus

<pre>
CREATE DATABASE IF NOT EXISTS camundabpm;
GRANT ALL ON camunda.* TO camunda@'localhost' IDENTIFIED BY 's3cr3t';
GRANT ALL ON camunda.* TO camunda@'%' IDENTIFIED BY 's3cr3t';
GRANT ALL ON camunda.* TO camunda@'127.0.0.1' IDENTIFIED BY 's3cr3t';
</pre>

und melde mich wieder ab.

Im Ordner <code>$CAMUNDA/sql/create</code>
