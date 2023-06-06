---
layout: post
title: Einen Linux Mailserver mit Postfix und Dovecot erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/postfix-dovecot-mailserver
---

Dieser Artikel beschreibt, wie man einen Mailserver mit Postfix und Dovecot unter Ubuntu einrichtet. Der Mailserver wird mit Verschlüsselung, verschiedenen Arten von Mailboxen sowie Sicherheitsvorkehrungen wie Hardening, DKIM, SPF und DMARC konfiguriert. Die folgende Anleitung basiert auf Ubuntu 20.04 LTS.

<!--excerpt_separator-->

## Voraussetzungen

- Ubuntu 20.04 LTS-Server mit Root-Zugriff
- Eine gültige Domain, die auf die IP-Adresse des Servers zeigt

## Schritt 1: Aktualisierung des Systems

Bevor wir mit der Einrichtung des Mailservers beginnen, stellen wir sicher, dass das System auf dem neuesten Stand ist. Führen Sie dazu die folgenden Befehle aus:

```bash
sudo apt update
sudo apt upgrade -y
```

## Schritt 2: Installation von Postfix

Postfix ist ein weit verbreiteter Mail Transfer Agent (MTA) und wird für den Versand und Empfang von E-Mails verwendet. Installieren Sie Postfix mit dem folgenden Befehl:

```bash
sudo apt install postfix -y
```

Während der Installation wird ein Konfigurationsassistent angezeigt. Wählen Sie "Internet Site" und geben Sie den vollständigen Domainnamen für Ihren Mailserver ein.

## Schritt 3: Konfiguration von Postfix

Öffnen Sie die Postfix-Konfigurationsdatei mit einem Texteditor:

```bash
sudo nano /etc/postfix/main.cf
```

Fügen Sie die folgenden Zeilen am Ende der Datei hinzu:

```plaintext
# TLS-Einstellungen
smtpd_tls_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
smtpd_tls_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
smtpd_use_tls=yes
smtpd_tls_auth_only=yes
smtp_tls_security_level=may
smtpd_tls_security_level=may

# SMTP-Einstellungen
smtpd_sasl_type=dovecot
smtpd_sasl_path=private/auth
smtpd_sasl_auth_enable=yes
smtpd_sasl_security_options=noanonymous
smtpd_sasl_local_domain=$myhostname
smtpd_recipient_restrictions=permit_sasl_authenticated,permit_mynetworks,reject_unauth_destination
myhostname = mail.example.com # Geben Sie Ihren vollständigen Domainnamen an
mydomain = example.com # Geben Sie Ihren Domainnamen an
myorigin = $mydomain
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
```

Speichern und schließen Sie die Datei.

## Schritt 4: Installation von Dovecot

Dovecot ist ein IMAP- und POP3-Server, der für den Empfang von E-Mails verwendet wird. Installieren Sie Dovecot mit dem folgenden Befehl:

```bash
sudo apt install dovecot-core dovecot-imapd dovecot-pop3d -y
```

## Schritt 5: Konfiguration von Dovecot

Öffnen Sie die Dovecot-Konfigurationsdatei:

```bash
sudo nano /etc/dovecot/dovecot.conf
```

Ändern Sie die folgenden Zeilen in der Datei wie unten gezeigt:



```plaintext
protocols = imap pop3

# SSL-Einstellungen
ssl_cert = </etc/ssl/certs/ssl-cert-snakeoil.pem
ssl_key = </etc/ssl/private/ssl-cert-snakeoil.key

# Authentifizierungseinstellungen
auth_mechanisms = plain login
disable_plaintext_auth = yes

# Mailbox-Einstellungen
mail_location = maildir:~/Maildir
```

Speichern und schließen Sie die Datei.

## Schritt 6: Mailboxen erstellen

Erstellen Sie für jede Mailbox einen Benutzer. Verwenden Sie den folgenden Befehl, um einen Benutzer mit dem Namen "user" und der E-Mail-Adresse "user@example.com" zu erstellen:

```bash
sudo useradd -m user -s /usr/sbin/nologin
sudo passwd user
sudo mkdir /home/user/Maildir
sudo chown -R user:user /home/user/Maildir
```

Wiederholen Sie diesen Schritt für jede gewünschte Mailbox.

## Schritt 7: Hardening des Servers

Es ist wichtig, den Server abzusichern, um unerwünschte Zugriffe zu verhindern. Führen Sie die folgenden Schritte aus:

- Aktivieren Sie die Firewall und erlauben Sie nur den Zugriff auf die erforderlichen Ports (SMTP, IMAP, POP3).
- Aktivieren Sie die Fail2Ban-Dienste, um Brute-Force-Angriffe zu blockieren.

## Schritt 8: DKIM, SPF und DMARC einrichten

Um die E-Mail-Zustellbarkeit und die Vermeidung von Spam zu verbessern, richten Sie DKIM, SPF und DMARC für Ihren Domainnamen ein. Dazu müssen Sie DNS-Einträge für Ihren Domainnamen erstellen. Die genauen Schritte hängen von Ihrem DNS-Anbieter ab.

DKIM: Generieren Sie ein DKIM-Schlüsselpaar und fügen Sie den öffentlichen Schlüssel als TXT-Eintrag in Ihren DNS-Einstellungen hinzu.

SPF: Erstellen Sie einen SPF-Eintrag (TXT) in Ihren DNS-Einstellungen, der festlegt, welche Server E-Mails für Ihre Domain senden dürfen.

DMARC: Erstellen Sie einen DMARC-Eintrag (TXT) in Ihren DNS-Einstellungen, um E-Mail-Authentifizierungsrichtlinien festzulegen.
