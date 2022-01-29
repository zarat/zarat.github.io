---
layout: post
title: Ein RSA Schlüsselpaar mit OpenSSL erzeugen
author: Manuel Zarat
categories: tutorials
permalink: /post/openssl-keys
---

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
