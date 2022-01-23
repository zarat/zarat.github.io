---
title: Dependency hell with Bower and npm
author: Bernardo Pacheco
layout: post
---

BIND ist ein von der Universität Berkeley (USA) entwickelter (Open Source) DNS Server und wurde auf fast jedes Betriebssystem portiert. Bis heute gilt BIND als „die Referenz“ unter den DNS Servern und bildet den Grundstock des heutigen Internets. Inzwischen wurde die Entwicklung des BIND Servers vom herstellerunabhängigen Internet Systems Consortium (ISC) übernommen. Bind (aktuell Bind9) läßt sich mit APT installieren. Bringen Sie Ihr System davor auf den neuesten Stand um Konflikte zu vermeiden.

apt-get install bind9

Der Dienst wird zunächst gestopt. Die Konfiguration erfolgt über das Verzeichnis /etc/bind worin sich jetzt folgende Dateien befinden sollten:

db.0      db.local    named.conf          zones.rfc1918
db.127    db.root     named.conf.local    rndc.key   
db.255    db.empty    named.conf.options

In den Dateien, die mit named. beginnen, wird die allgemeine Funktion des Servers konfiguriert. Die db.-Dateien sind dagegen die Zonendateien, in denen die eigentlichen DNS Daten abgelegt werden.

Wenn nur IPv4 verwendet wird, sollte der Paramter „-4″ in /etc/default/bind9 unter OPTIONS=“…“ hinzugefügt werden. Dies steigert die Performance drastisch.

Es müssen mindestens zwei neue db.-Dateien erstellt werden. Eine Datei mit dem Namen db.domainname für die Forwardlookup-Zone und eine Datei db.z.y.x für die Reverselookup-Zone. Das Wort „domainname“ im Dateinamen ist gegen die entsprechende Domäne zu ersetzen, „z.y.x“ durch die ersten 3 Oktette der IP adresse in umgekehrter Reihenfolge.
Globale Kofiguration

In die Datei named.conf wird die globale (systemweite) Konfiguration geschrieben.

options {
    directory "/var/named";
    pid-file "/var/run/named/named.pid";
    auth-nxdomain yes; // no
    datasize default;
    // Uncomment these to enable IPv6 connections support
    // IPv4 will still work:
    //  listen-on-v6 { any; };
    // Add this for no IPv4:
    //  listen-on { none; };

    // Default security settings.
    allow-recursion { 127.0.0.1; };
    allow-transfer { none; };
    allow-update { none; };
    version none;
    hostname none;
    server-id none;
};

Zusätzlich muss noch jede von dieser Zone verwaltete IP/Domain mit der zugehörigen Konfigurationsdatei eingetragen werden

zone "zarat.ml" {
    type master;
    file "/etc/bind/db.zarat.ml";
};

zone "0.248.216.in-addr.arpa" {
    type master;
    file "/etc/bind/db.248.216.91";
};

Die hier eingetragenen Zonendateien gibt es aber noch nicht und werden jetzt unter /etc/bind angelegt.
Forward Lookup Zone

Die Forward Lookup Zone ist dazu da, Domainnamen in IP Adressen umzuwandeln.

$TTL 2D
@       IN      SOA     zarat.ml. (
                        1234567890      ; Serial
                                8H      ; Refresh
                                2H      ; Retry
                                4W      ; Expire
                                3H )    ; NX (TTL Negativ Cache)

@	3600	IN	NS	ns.zarat.ml.
@	3600	IN	A	91.216.248.12

ns      3600    IN      A       91.216.248.12
wiki    3600    IN      A       91.216.248.12

Besonders wichtig an dieser Stelle ist eine Leerzeile am Ende der Datei!
Reverse Lookup Zone

Die Reverse Lookup Zone ist hingegen dazu da, IP Adressen in Domainnamen umzuwandeln. Diese wird allerdings

    rückwärts gelesen
    und nur die ersten 3 Oktette

Bei einer IP

91.216.248.12

wäre der Dateiname also

db.248.216.91

und der entsprechende Inhalt

$TTL 2D
@       IN      SOA     zarat.ml. (
                                1234567890      ; Serial
                                        8H      ; Refresh
                                        2H      ; Retry
                                        4W      ; Expire
                                        2D )    ; TTL Negative Cache

@       IN      NS      zarat.ml.

12      IN      PTR     zarat.ml.
12      IN      PTR     wiki.zarat.ml.

 
Mehr zu DNS finden Sie in meinem WIKI.
