---
layout: post
title: Ein RSA Schlüsselpaar mit OpenSSL erzeugen
author: Manuel Zarat
categories: tutorials
tags: sicherheit
permalink: /post/openssl-keys
---

Gesicherte Kommunikation kann oft essentiell sein. Mit OpenSSL lassen sich Schlüssel dazu erzeugen.

<!--excerpt_separator-->

Einen privaten Schlüssel erstellt man mit

<pre>
openssl genrsa 2048 > test.pri
</pre>

Diesen privaten Schlüssel sollten Sie unter keinen Umständen verlieren oder weitergeben. Man kann den Schlüssel zur Sicherheit auch noch mit einem Passwort versehen.

<pre>
openssl genrsa -aes128 -passout pass:foobar 2048 > test.pri
</pre>

Mit Hilfe des privaten Schlüssel erstellt man den dazugehörenden öffentlichen Schlüssel.

<pre>
openssl rsa -in test.pri -pubout > test.pub
</pre>

Überprüfen kann man die beiden Schlüssel dann mit

<pre>
openssl rsa -pubin -in test.pub -text -noout
openssl rsa -in test.pri -check -text -noout
</pre>

<h2>Dateien ver- und entschlüsseln</h2>

Möchte A an B eine verschlüsselte Nachricht senden, nimmt A den öffentlichen Schlüssel von B und verschlüsselt die Nachricht damit. Entschlüsseln kann sie nur B mit seinem privaten Schlüssel. 

<pre>
openssl rsautl -in secret.txt -out secret.txt.enc -pubin -inkey test.pub -encrypt
openssl rsautl -in secret.txt.enc -out secret.txt -inkey test.pri -decrypt
</pre>

<b>ACHTUNG</b>: Ist der zu verschlüsselnde Inhalt länger als der bei der Schlüsselerstellung verwendete Modulus funktioniert RSA nicht und man verwendet AES.

<pre>
openssl aes-256-cbc -e -in file.zip -out file.zip.enc
openssl aes-256-cbc -d -in file.zip.enc -out file.zip
</pre>

<h2>Dateien signieren</h2>

Die Signierung dient als Beweis das eine Datei tatsächlich von besagtem Absender stammt. Möchte A die Datei, die er an B schickt signieren, nimmt A seinen privaten Schlüssel und erstellt in Verbindung mit dem Inhalt eine Signatur. Diese wird mit dem Inhalt mitgeschickt. 

<pre>
openssl dgst -sha256 -sign test.pri -out file.txt.sig.tmp file.txt
openssl base64 -in file.txt.sig.tmp -out file.txt.sig
</pre>

<h2>Signatur prüfen</h2>

B nimmt den öffentlichen Schlüssel von A und kann in Verbindung mit der Signatur feststellen, ob sie tatsächlich von A mit seinem privaten Schlüssel (den nur A hat) signiert wurde. 

<pre>
openssl base64 -d -in file.txt.sig -out file.txt.sig.tmp
openssl dgst -sha256 -verify test.pub -signature file.txt.sig.tmp file.txt
</pre>
