---
layout: post
title: Einen Linux Nameserver mit bind erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/bind9-nameserver
---

Kostenloser Nameserver zum Betrieb Ihres eigenen DNS Server.

<!--excerpt_separator-->

Nameserver (DNS Server) verwalten die Informationen, welche IP-Adresse zu welchem Domain-Namen gehört. Jedesmal, wenn eine Seite im Internet angewählt wird, muss ein Nameserver die entsprechende IP-Adresse des Servers auf dem die Homepage liegt (techn. "gehostet wird") zurückliefern und auflösen, damit der Computer eine direkte Verbindung zum Server aufbauen kann. Internetprovider oder firmeneigene Intranet Umgebungen haben ebenfalls eigene Nameserver. BIND ist ein von der Universität Berkeley (USA) entwickelter (Open Source) DNS Server und wurde auf fast jedes Betriebssystem portiert. Bis heute gilt BIND als „die Referenz“ unter den DNS Servern und bildet den Grundstock des heutigen Internets. Inzwischen wurde die Entwicklung des BIND Servers vom herstellerunabhängigen Internet Systems Consortium (ISC) übernommen. 

<h2>Installation</h2>

Bind (aktuell Bind9) läßt sich mit dem apt tool installieren. Bringen Sie Ihr System davor auf den neuesten Stand.

<pre>apt-get install bind9</pre>

Die Konfiguration erfolgt über das Verzeichnis <code>/etc/bind</code> worin sich jetzt folgende Dateien befinden sollten:

<pre>
db.0      db.local    named.conf          zones.rfc1918
db.127    db.root     named.conf.local    rndc.key   
db.255    db.empty    named.conf.options
</pre>

In den Dateien, die mit named. beginnen, wird die allgemeine Funktion des Servers konfiguriert. Die db.-Dateien sind dagegen die Zonendateien, in denen die eigentlichen DNS Daten abgelegt werden.

Wenn nur IPv4 verwendet wird, sollte der Paramter <code>-4</code> in <code>/etc/default/bind9</code> unter <code>OPTIONS="..."</code> hinzugefügt werden.

<h2>Globale Kofiguration</h2>

In die Datei named.conf wird die globale (systemweite) Konfiguration geschrieben. Fürs erste muss hier nichts geändert werden.

<pre>options {
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
};</pre>

<h2>Forward Lookup Zone</h2>

Die Forward Lookup Zone ist dazu da, Domainnamen in IP Adressen umzuwandeln. Eine Forward lookup zone legt man an indem man eine Datei nach dem Muster <code>db.domainname</code> anlegt welche z.B so aussieht. 

<pre>$TTL 2D
@       IN      SOA     zarat.ml. (
                        1234567890      ; Serial
                                8H      ; Refresh
                                2H      ; Retry
                                4W      ; Expire
                                3H )    ; NX (TTL Negativ Cache)

@	3600	IN	NS	ns.zarat.ml.
@	3600	IN	A	91.216.248.12

ns      3600    IN      A       91.216.248.12
www     3600    IN      A       91.216.248.12

</pre>

<b>ACHTUNG: Besonders wichtig an dieser Stelle ist eine Leerzeile am Ende der Datei!</b>

<h2>Reverse Lookup Zone</h2>

Die Reverse Lookup Zone ist hingegen dazu da, IP Adressen in Domainnamen umzuwandeln. Diese wird allerdings

    rückwärts gelesen
    und nur die ersten n Oktette wobei n die Anzahl der Oktette im Netzanteil entspricht. Bei einer /24 IP wären das 3.

Bei einer IP <code>91.216.248.12</code> wäre der Dateiname bei einem /24 Netz also <code>db.248.216.91</code> und der entsprechende Inhalt

<pre>$TTL 2D
@       IN      SOA     zarat.ml. (
                                1234567890      ; Serial
                                        8H      ; Refresh
                                        2H      ; Retry
                                        4W      ; Expire
                                        2D )    ; TTL Negative Cache

@       IN      NS      zarat.ml.

12      IN      PTR     zarat.ml.
12      IN      PTR     wiki.zarat.ml.

</pre>

Zuletzt gibt man die neuen Zonen noch in der Hauptkonfiguration <code>/etc/bind/named.conf</code> bzw in einer eingebundenen Datei bekannt.

<pre>
zone "zarat.ml" {
    type master;
    file "/etc/bind/db.zarat.ml";
};

zone "248.216.91.in-addr.arpa" {
    type master
    file "/etc/bind/db.248.216.91";
};
</pre>
