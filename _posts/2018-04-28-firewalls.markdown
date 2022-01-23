---
layout: post
title: Arten von Firewalls
author: Manuel Zarat
category: sicherheit
tags: security
permalink: /post/firewalls
---

Zum Schutz privater Netzwerke durch Einflüsse von Außen oder auch aus dem eigenen Netzwerk setzt man Firewalls ein. Man unterscheidet dabei zwischen Software – und Hardwarefirewalls, es gibt aber auch Mischungen aus beidem. Verschiedene Arten von Filter – und Regeltechniken ermöglichen Protokollierung, Inspektion und sogar Manipulation ein – und ausgehender Datenpakete. 
<!--excerpt_separator-->
Diese drei Kategorien schließen sich allerdings nicht gegenseitig aus. Die meisten modernen Firewalls bieten Merkmale, durch die man sie in mehr als eine Kategorie einordnen kann. Firewalls kann man aber grundsätzlich in 3 Grundarten unterteilen:

- Paketfilter
- Stateful inspection
- Proxy Firewalls

Es gibt noch weitere Arten, ich werde allerdings nur stateful inspection und application level firewalls behandeln. Im Prinzip arbeitet jeder Home Router, der NAT (Network address translation) ausführt bereits als Firewall – in großen Unternehmen braucht es allerdings oft etwas mehr Sicherheit beziehungsweise Flexibilität. Es müssen zum Beispiel IP Telefone, Email und Dateiserver oder andere Netzwerkdienste – oft über den eigenen Netzwerkhorizont hinaus – bereitgestellt werden.

Um zum Beispiel das Surfen im Internet zu ermöglichen, müssen auf abgesendete Anfragen empfangene Antwortpakete an den korrekten Absender im internen Netzwerk zugestellt werden. Andererseits sollen nicht alle Pakete, die aus dem Internet kommen auch in das interne Netz durchgelassen werden – zumindest nicht ohne entsprechende Sicherheitsvorkehrungen. Auch Emailverkehr setzt Internetkonnektivität im Grunde voraus.

Ideologen kritisieren, das durch Firewalls und NAT nicht jeder Computer im Internet zu jeder Zeit von überall aus erreichbar ist, wie es das RFC Papier (RFC 3027) eigentlich vorgibt.

SIP (Session initiation protocol, ein Protokoll für VoIP Telefonie) beispielsweise ist weit verbreitet, kann mit NAT jedoch nicht umgehen. Dabei werden IPv4 Pakete verschlüsselt und eine Checksumme der Absender IP zur Integrität mitgesendet. Wird diese im Fall von NAT jedoch auf dem Weg umgeschrieben, stimmt das Ergebnis der Checksumme nicht mehr mit der Checksumme überein, mit welcher das Paket den Quell Computer verlassen hat. Im Fall von NAT stimmen die beiden Werte jedoch nicht mehr überein.

Bei der Erschaffung des Arpanet wurde Sicherheit wenig Achtung geschenkt, man musste davon ausgehen, dass jeder Netzwerkknoten vertrauenswürdig ist. Dieses (militärische) Netz sollte Kommunikation unter allen Umständen ermöglichen. Der bis heute übliche Begriff DMZ (demilitarisierte Zone) beschreibt ein Netzwerk, das als Art Zwischenglied zwischen internem Netzwerk und Internet darstellt. Ein Host in dieser DMZ führt oft alle sicherheitsrelevanten Überprüfungen und Vorkehrungen vor, den Empfänger auf der internen Seite vor Angriffen zu schützen. Hochwertige Firewalls in Unternehmen beinhalten neben Filtern oft auch integrierte Viren – und Malwarescanner.
Stateful packet inspection (SPI)

Die stateful packet inspection erweitert den Ansatz der klassischen Paketfilter um eine Prüfung weiterer Verbindungsinformationen. Neben der mehr oder weniger statischen Tabelle mit den zugelassenen Ports und Adressbereichen wird bei dieser Variante eine dynamische Tabelle erstellt und eingepflegt, in die Informationen über den Zustand der einzelnen Verbindungen eingetragen werden. Diese dynamische Tabelle ermöglicht es, alle Ports zu sperren und nur bei Bedarf für eine zulässige Verbindung (festgelegt durch Quell – und Zieladresse) einen Port zu öffnen. Das Öffnen der Ports geschieht dabei immer nur vom geschützten, internen Netzwerk zum ungeschützen hin, also meistens zum WAN (Internet). Datenpakete, die nicht zu einer in dieser Tabelle gespeicherten Verbindung gehören, werden automatisch verworfen.

Die Filterregeln einer stateful inspection firewall sind – nicht wie bei klassischen Portfiltern – richtungsabhängig. Eine Verbindung kann immer von nur der Quelle zum Ziel aufgebaut werden, es sei denn, für die Richtung zurück ist ein expliziter Eintrag vorhanden. Ist eine Verbindung aufgebaut, so werden nur die zu dieser Verbindung gehörenden Datenpakete – in beide Richtungen  – übertragen. Damit lassen sich zum Beispiel Zugriffe, die unaufgefordert und nicht aus dem lokalen Netz heraus erfolgen, zuverlässig abblocken.

So können zum Beispiel auf dem Rechner eines Mitarbeiters in der Buchhaltung nur dann Informationen zu einem bestimmten Kundendatensatz empfangen werden, wenn der Mitarbeiter zuvor aktiv eine Anfrage gesendet hat oder Mitarbeiter können daran gehindert werden mehrere  SSH oder FTP Verbindungen zur selben Zeit oder auf bestimmte Server aufzubauen. Passives FTP beispielsweise verwendet zum übertragen der Daten einen vorhersagbaren Random-Port was bei stateful packet inspection logischerweise zu Problemen führt und man würde eher eine Application level firewall einsetzen, welche Pakete auch öffnen und hineinsehen kann.

In TCP Datenströmen werden einzelne Pakete (Segmente) in einer vorgegebenen, überwachten Reihenfolge übertragen weshalb man von einem verbindungsorientierten Protokoll spricht.

SPI kann jedoch auch UDP Pakete, bei denen kein offensichtlicher Zusammenhang beziehungsweise keine vorgegebene Reihenfolge besteht, verarbeiten. Trotzdem kann SPI auch bei UDP Verkehr eingesetzt werden. Die meisten Firewalls behandeln UDP in dem Sinne trotzdem als stateful, dass beim Versenden von UDP Paketen für kurze Zeit eine dynamische Firewall Regel für die Antwortpakete erzeugt wird. Skype und andere VoIP Dienste nutzen dieses Verfahren unter dem Begriff Holepunching.

Nehmen wir dazu noch einmal das Problem mit FTP. Beim Start einer FTP Sitzung baut der Client von zum Beispiel Quellport 5432 eine Verbindung zum Zielport 21′ am FTP Server auf. Die Stateful Inspection erlaubt diesen Aufbau, weil das FTP Protokoll (Port 20, 21) von lokalen Rechnern nach außen freigegeben ist. In die selbst erzeugte dynamische Tabelle trägt die Firewall Quell – und Zieladresse mit den jeweiligen Ports ein.

Gleichzeitig kann sie die Steuerinformationen einsehen, die an Port 21 des FTP Servers gesendet werden. Aus diesen Signalen geht hervor, dass der Client eine Verbindung des Servers von dessen Port 20 auf den Port 5432 des Clients anfordert. Die Firewall trägt auch diese Werte in die dynamische Tabelle ein, weil die Verbindung in das interne Netz hinein vom Client selbst angefordert wurde und die Antwort damit assoziiert wird. Der Server kann dann wie gewünscht die Daten an den Client senden.

Eine weiterführende Technik ist die sogenannte deep packet inspection (DPI) bei der der Informationsinhalt des Payload analysiert und interpretiert wird. DPI kann für Kontrolle als auch für Zensur eingesetzt werden.
Application Level firewall (Proxy firewall)

Grundsätzlich kann jeder Dienst auf jeder Portnummer laufen. Wenn der TCP Port 80 für HTTP freigeschaltet ist, können darüber trotzdem auch andere Protokolle laufen. Es müssen nur beide Kommunikationspartner entsprechend konfiguriert worden sein. Einen Versuch, das zu unterbinden, kann mit Application layer firewalls erfolgen. Dabei wird wiederum zwischen aktiven und passiven Firewalls unterschieden. Passive Firewalls arbeiten ähnlich wie aktive, nur mit dem Unterschied, dass aktive Firewalls verdächtigen Verkehr filtern und isolieren, während passive Firewall nur vor verdächtigen Paketen warnt.

Bei dieser Technik handelt es sich um eine Art Proxy Server, der in die Verbindung zwischen Client und Server geschalten die Datenströme inspiziert und  gegebenenfalls weiterleitet oder blockiert. Dieser Proxy Server muss allerdings nicht unbedingt ein dezidierter Server sein, sondern kann auch auf dem Host System laufen – das nennt man dann Proxy Firewall. Sie arbeiten, wie der Name bereits vermuten lässt, auf der Anwendungsschicht des OSI Modelles was gezwungenermaßen eine Verschlechterung der Performance mit sich bringt, da diese Firewalls als Programme auf dem jeweiligen Rechner laufen und CPU – RAM – sowie oft auch Netzauslastung erzeugen.

Hinzu kommt noch der Umstand, dass man für jede Applikation einen eigenen Proxy benötigt, da nicht nur Kennzahlen der IP Segmente, sondern ebenfalls der sogenannte payload, also Inhalte der Anwendungspakete zur Entscheidungsfindung herangezogen werden. Man muss dabei beachten, das ein Proxy Server für jede aufgebaute Verbindung eines Client eine zweite Verbindung von sich selbst aus zum Ziel hin aufbaut. Somit besteht eine Verbindung zwischen Client und Proxy Server genauso wie zwischen dem Proxy Server und dem eigentlichen Ziel Webserver. Proxy Server können den gesamten Inhalt mitverfolgen und auch protokollieren.

Web Application Firewalls (WAF) analysieren wiederum das Surfverhalten der Benutzer. Wenn Benutzer zu schnell oder zu häufig Anfragen senden, oder gar in böswilliger Absicht manipulierte Datensegmente senden, versucht eine WAF dies zu erkennen und den Angreifer zu blockieren. Diese Module gehören nicht zum Standardfunktionsumfang einer Firewall, werden aber oft zusammen eingesetzt. Im Normalfall arbeitet noch sogenanntes  Einige Firewalls unterstützen Erweiterungssteckkarten, um weitere Module nachzurüsten.

Für ein Protokoll kann es sogar mehrere sogenannte dedicated Proxys geben um unterschiedliche Webdienste unter HTTP zu filtern. Zum Beispiel je einen pro genutzte Webanwendung in einem Unternehmensnetzwerk.

Eine Ausnahme ist der Circuit Level Proxy – auch generischer Proxy genannt. Er findet als protokollunabhängiger Filter in der Firewall Anwendung und realisiert dort einen port – und adressbasierten Filter, der zudem eine etwaige Authentifizierung für den Verbindungsaufbau unterstützt. Der Filter ist dabei nicht in der Lage die Kommunikation einzusehen, sie selbst zu führen und zu beeinflussen, da er das dahinterliegende Protokoll zur Kommunikation nicht kennt.

Application Layer firewalls haben zusätzlich oft die Eigenschaft, aus der Ferne aktualisierbar zu sein und können so in nahezu Echtzeit Updates einspielen um neu entdeckte Angriffsmethoden und Schadsoftware kennen zu lernen. Diese Eigenschaft macht sie viel sicherer als andere. Manchmal werden dabei nur Prüfsummen der Dateien verglichen, meisst aber auch der beinhaltete Code analysiert.

Dezidierte Proxy Server haben im Gegensatz zu Proxy Firewalls den Ruf, sicherer zu sein, da im Falle eines Angriffes nicht sofort Zugriff auf das hinter dem Proxy Server liegende Host System besteht, sondern der Angreifer auf einem dezidierten Server landet.

Die Zukunft von Firewalls sitzt vermutlich irgendwo zwischen den zwei Spagatpunkten Sicherheit und Bequemlichkeit. Also eine Mischung von Network layer und application layer firewalls. Netzwerkfirewalls werden immer mehr lernen, auch Paketinhalte zu berücksichtigen und application layer firewalls mehr und mehr transparent werden. Herauskommen sollte eine Methode, die zwar genaues Logging und Screening t, dabei den Verkehr jedoch schnell durchleitet.
Intrusion detection system

Ein IDS ist eine Echtzeitüberwachung der Netzwerkaktivität und die Analyse von Daten zur Erkennung akuter Sicherheitslücken und Angriffen die gerade stattfinden. Externe, autorisierte Benutzer, die unautorisierte Verhaltensweisen an den Tag legen – z.B Übermittlung von Dokumenten ins Internet – können in Echtzeit erkannt und an Ihrem Tun gehindert werden. Auf gleiche Weise kann mit internen Angreifern vorgegangen werden.

Im Gegensatz zu regelmäßiger Kontrolle der LOG Dateien kann ein Intrusion detection system den angerichteten Schaden und die dadurch entstehenden Kosten drastisch reduzieren indem Angreifer sofort isoliert werden können.
