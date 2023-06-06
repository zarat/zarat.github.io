---
layout: post
title: Arten von Firewalls
author: Manuel Zarat
categories: tutorials
tags: sicherheit
permalink: /post/firewalls
---

Zum Schutz privater Netzwerke durch Einflüsse von Außen oder auch aus dem eigenen Netzwerk setzt man Firewalls ein. Eine Firewall ist eine Sicherheitsvorrichtung, die den Datenverkehr zwischen Computernetzwerken reguliert. Sie agiert als eine Art Filter, der den Datenverkehr überwacht und unerwünschte oder potenziell schädliche Aktivitäten blockiert. Eine Firewall kann sowohl in Hardware- als auch in Softwareform implementiert werden und bildet eine entscheidende Komponente des Netzwerksicherheitskonzepts.

<!--excerpt_separator-->

Die Hauptfunktion einer Firewall besteht darin, den Datenverkehr basierend auf vordefinierten Regeln zu kontrollieren. Diese Regeln bestimmen, welche Arten von Verbindungen zugelassen oder blockiert werden. Eine Firewall kann auch Intrusion Detection und Prevention Systeme (IDS/IPS) integrieren um verdächtige Aktivitäten zu erkennen und zu verhindern, ein VPN bereitstellen, Surfverhalten analysieren u.v.m.

<h1>Welche Arten von Firewalls gibt es?</h1>

Es gibt verschiedene Arten von Firewalls, die je nach ihrem Funktionsumfang und ihrer Implementierung variieren. Hier sind einige der gängigsten Typen von Firewalls:

1. **Packet Filtering Firewall**: Diese Art von Firewall überprüft die Header-Informationen von Netzwerkpaketen, wie IP-Adressen, Ports und Protokolle, und entscheidet auf Grundlage von vordefinierten Regeln, ob das Paket zugelassen oder blockiert wird.

2. **Stateful Inspection Firewall**: Eine stateful Inspection Firewall analysiert nicht nur die Header-Informationen, sondern überwacht auch den Zustand einer Verbindung. Sie speichert Informationen über bereits überprüfte Pakete und vergleicht sie mit den erwarteten Mustern, um verdächtigen Datenverkehr zu erkennen.

3. **Proxy Firewall**: Eine Proxy Firewall agiert als Vermittler zwischen internen und externen Netzwerken. Sie empfängt Anfragen von internen Clients und stellt diese im Namen der Clients an externe Ressourcen. Dadurch wird die IP-Adresse des internen Netzwerks verborgen und ein zusätzlicher Schutzmechanismus eingeführt.

4. **Next-Generation Firewall (NGFW)**: NGFWs bieten erweiterte Funktionen im Vergleich zu herkömmlichen Firewalls. Sie integrieren Funktionen wie Intrusion Prevention, Anwendungssichtbarkeit, SSL-Entschlüsselung und erweiterte Protokollierung. NGFWs ermöglichen eine tiefere Überwachung des Netzwerkverkehrs und bieten eine präzisere Kontrolle.

<h1>Welche Anschlussmöglichkeiten gibt es?</h1>

Firewalls können in verschiedenen Anschlussmodi oder Clustertypen konfiguriert werden, um die Skalierbarkeit und Hochverfügbarkeit zu verbessern. Hier sind einige gängige Anschlussmöglichkeiten:

1. **Standalone**: Eine Standalone-Firewall ist eine einzelne Firewall-Vorrichtung, die den gesamten Netzwerkverkehr überwacht und kontrolliert. Dieser Modus eignet sich für kleinere Netzwerke oder Situationen, in denen nur eine begrenzte Anzahl von Verbindungen verwaltet werden muss.

2. **High Availability (HA) Cluster**: In einem HA-Cluster werden zwei oder mehr Firewalls als redundante Einheiten konfiguriert, um einen Ausfallschutz zu bieten. Eine Firewall fungiert als primäre Einheit und die anderen als sekundäre Einheiten. Wenn die primäre Einheit ausfällt, übernimmt automatisch eine der sekundären Einheiten die Kontrolle, um eine kontinuierliche Netzwerksicherheit zu gewährleisten.

3. **Load Balancing Cluster**: Bei einem Load Balancing Cluster verteilen mehrere Firewalls den eingehenden Verkehr auf verschiedene Firewalls. Dies verbessert die Netzwerkleistung und ermöglicht eine bessere Lastverteilung. Falls eine Firewall ausfällt, werden die Verbindungen auf die verbleibenden Firewalls umgeleitet.

4. **Virtual Router Redundancy Protocol (VRRP)**: VRRP ist ein Protokoll, das die Ausfallsicherheit von Firewalls verbessert, indem mehrere Firewalls als eine logische Einheit betrachtet werden. Die Firewalls teilen sich eine gemeinsame IP-Adresse, und im Falle eines Ausfalls übernimmt eine andere Firewall automatisch die Kontrolle, um die Konnektivität aufrechtzuerhalten.

<h1>Was sind NGFW?</h1>

NGFW steht für Next-Generation Firewall und bezeichnet eine neue Generation von Firewalls mit erweiterten Funktionen. NGFWs integrieren traditionelle Firewall-Funktionen mit zusätzlichen Merkmalen wie Intrusion Prevention, Anwendungssichtbarkeit, SSL-Entschlüsselung und erweiterter Protokollierung.

Die erweiterten Funktionen von NGFWs ermöglichen eine präzisere Kontrolle des Netzwerkverkehrs. Anstatt sich nur auf IP-Adressen und Ports zu beschränken, können NGFWs den Inhalt von Datenpaketen analysieren und Anwendungen identifizieren. Dadurch können sie den Datenverkehr basierend auf bestimmten Anwendungen oder Anwendungskategorien filtern und steuern.

NGFWs bieten auch tiefere Einblicke in den Netzwerkverkehr und ermöglichen die Erkennung und Prävention von fortschrittlichen Bedrohungen wie Zero-Day-Exploits und gezielten Angriffen. Sie können den Datenverkehr in Echtzeit überwachen, Anomalien erkennen und verdächtige Aktivitäten blockieren.

Zusammenfassend sind NGFWs eine Weiterentwicklung herkömmlicher Firewalls und bieten verbesserte Sicherheitsfunktionen sowie erweiterte Kontrollmöglichkeiten für den Netzwerkverkehr. Sie sind eine wichtige Komponente in modernen Netzwerksicherheitsarchitekturen und helfen Unternehmen dabei, ihre Netzwerke vor immer anspruchsvolleren Bedrohungen zu schützen.
