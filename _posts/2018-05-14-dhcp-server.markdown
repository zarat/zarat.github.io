---
layout: post
title: Einen Linux DHCP Server erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/linux-dhcp-server
---

Ein DHCP-Server (Dynamic Host Configuration Protocol) ermöglicht es, IP-Adressen und andere Netzwerkkonfigurationen automatisch an Clients in einem Netzwerk zu vergeben. In diesem Wiki-Artikel erfahren Sie, wie Sie einen DHCP-Server unter Ubuntu einrichten, IP-Bereiche unterteilen und statische Reservierungen konfigurieren können.

<!--excerpt_separator-->

## Schritt 1: DHCP-Server installieren

1. Öffnen Sie ein Terminal auf Ihrem Ubuntu-Server.
2. Geben Sie den folgenden Befehl ein, um den DHCP-Server (ISC-DHCP-Server) zu installieren:

   ```
   sudo apt-get update
   sudo apt-get install isc-dhcp-server
   ```

## Schritt 2: Konfigurationsdatei bearbeiten

1. Öffnen Sie die Konfigurationsdatei des DHCP-Servers mit einem Texteditor:

   ```
   sudo nano /etc/dhcp/dhcpd.conf
   ```

2. Die Konfigurationsdatei enthält Beispiele und Kommentare. Sie können den vorhandenen Inhalt löschen und die folgenden Zeilen hinzufügen:

   ```plaintext
   authoritative;
   subnet 192.168.0.0 netmask 255.255.255.0 {
     range 192.168.0.10 192.168.0.100;
     option routers 192.168.0.1;
     option domain-name-servers 8.8.8.8, 8.8.4.4;
   }
   ```

   - Der `subnet`-Befehl definiert das Subnetz und die Netzmaske.
   - Der `range`-Befehl legt den IP-Bereich fest, aus dem Adressen an Clients vergeben werden.
   - Die `option`-Befehle konfigurieren den Standard-Gateway und die DNS-Server.

3. Speichern Sie die Datei und schließen Sie den Texteditor.

## Schritt 3: Netzwerkinterface konfigurieren

1. Öffnen Sie die Netzwerkkonfigurationsdatei:

   ```
   sudo nano /etc/default/isc-dhcp-server
   ```

2. Ändern Sie die Zeile `INTERFACESv4=""` in:

   ```
   INTERFACESv4="eth0"
   ```

   Ersetzen Sie `eth0` durch den Namen Ihres Netzwerkinterfaces.

3. Speichern Sie die Datei und schließen Sie den Texteditor.

## Schritt 4: DHCP-Server starten

1. Starten Sie den DHCP-Server mit dem folgenden Befehl:

   ```
   sudo service isc-dhcp-server start
   ```

2. Überprüfen Sie den Status des DHCP-Servers, um sicherzustellen, dass er ausgeführt wird:

   ```
   sudo service isc-dhcp-server status
   ```

## Schritt 5: Statische Reservierungen konfigurieren (optional)

Wenn Sie bestimmte IP-Adressen für bestimmte Clients reservieren möchten, können Sie statische Reservierungen in der DHCP-Konfigurationsdatei hinzufügen.

1. Öffnen Sie die DHCP-Konfigurationsdatei:

   ```
   sudo nano /etc/dhcp/dhcpd.conf
   ```

2. Fügen Sie die folgende Zeile

 für jede statische Reservierung hinzu:

   ```plaintext
   host clientname {
     hardware ethernet <MAC-Adresse>;
     fixed-address <IP-Adresse>;
   }
   ```

   Ersetzen Sie `clientname`, `<MAC-Adresse>` und `<IP-Adresse>` durch die entsprechenden Werte.

3. Speichern Sie die Datei und schließen Sie den Texteditor.

## Fazit

Sie haben erfolgreich einen DHCP-Server unter Ubuntu eingerichtet. Clients in Ihrem Netzwerk erhalten nun automatisch IP-Adressen und andere Netzwerkkonfigurationen vom DHCP-Server. Bei Bedarf können Sie auch statische Reservierungen für bestimmte Clients konfigurieren.
