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

Zuerst lade ich Camunda von der Website herunter. Ich wähle dabei "Other distributions" und den Tomcat Download (~120MB). Die Ordnerstruktur ist im Wurzelverzeichnis des Paketes deshalb erstelle ich einen neuen Ordner und entpacke das zip Paket darin.

<code>
  unzip tomcat-9.0.0.zip
</code>

Ausserdem installiere ich das benötigte Java JDK und die JRE gleich mit.

<code>
  apt install openjdk-8-jdk openjdk-8-jre
</code>

Im Prinzip ist eine lauffähige Demo jetzt einsatzbereit. Für das Production environment sollte man allerdings davor einige Einstellungen vornehmen.

<h3>Datenbank</h3>

Von Haus aus arbeitet Camunda mit einer h2 Datenbank. Das ist eine In-Memory Datenbank welche keine Persistenz bietet. Deshalb konfiguriere ich eine Anbindung an MySQL.
