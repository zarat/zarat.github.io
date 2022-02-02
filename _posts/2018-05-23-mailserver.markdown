---
layout: post
title: Einen Linux Mailserver mit Postfix und Dovecot erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/postfix-dovecot-mailserver
---

Ein Mailserver ist kein einzelner Dienst, sondern setzt sich üblicherweise aus mehreren Komponenten zusammen. Das sind im Wesentlichen ein Mail transfer agent (MTA) für das Senden und Empfangen sowie ein Message delivery agent (MDA) für den Zugriff auf Mails durch die jeweiligen Benutzer. 
<!--excerpt_separator-->
Der MTA sendet und empfängt über SMTP. Der MDA liefert Emails aus, erstellt, ändert und löscht Ordner auf dem Server und setzt Dateiattribute mit Hilfe von IMAP und POP. Beide gibt es auch in verschlüsselter Form. Einen Mailserver im Internet zu betreiben ist eine verantwortungsvolle Aufgabe. Arbeitet man nicht sorgfältig, schafft man leicht ein sogenanntes Open Relay, welches sehr schnell als Spamschleuder missbraucht werden wird. Ich möchte zeigen wie man mit Hilfe von Postfix, Dovecot und Ende-zu-Ende Verschlüsselung einen Emailserver installiert um die private oder firmeninterne Kommunikation wieder unter die eigene und alleinige Kontrolle zu bringen.

<h2>Postfix installieren</h2>

Nachdem das frisch installierte System auf den neuesten Stand gebracht wurde kann man Postfix bequem über das APT Tool installieren.

<pre>apt install postfix</pre>

Zuerst öffnen Sie die Datei <code>/etc/postfix/main.cf</code> und ersetzen den Inhalt mit

<pre>
#Default settings
myhostname = zarat.ml
myorigin = /etc/mailname
mydestination = zarat.ml, localhost, localhost.localdomain 
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128 
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = all

#Optional settings
local_recipient_maps = proxy:unix:passwd.byname $alias_maps
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
</pre>

<b>Hostname und IP Adresse ersetzen Sie Ihrem Setup dementsprechend.
  
<h2>StartTLS aktivieren</h2>

Submission stellt Verschlüsselung via STARTTLS bereit. Wenn Sie bereits ein Zertifikat besitzen bearbeiten Sie gleich die Datei <code>/etc/postfix/master.cf</code> um darin die Parameter für den vordefinierten Submission Block auszukommentieren.

<pre>
submission inet n       -       -       -       -       smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_wrappermode=no
  -o smtpd_tls_security_level=encrypt
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_recipient_restrictions=permit_mynetworks,permit_sasl_authenticated,reject
  -o milter_macro_daemon_name=ORIGINATING
  -o smtpd_sasl_type=dovecot
  -o smtpd_sasl_path=private/auth
</pre>

<h2>Dovecot installieren</h2>

Dovecot ist der MDA, der Mails an die jeweiligen Mailboxen verteilt und ausliefert. Auch Dovecot kann über das APT Tool installiert werden.

<pre>apt install dovecot-core dovecot-imapd</pre>

Ich bearbeite auch hier wieder zuerst die Datei

<pre>/etc/dovecot/dovecot.conf</pre>

indem ich an das Ende folgendes anhänge

<pre>disable_plaintext_auth = no
mail_privileged_group = mail
mail_location = mbox:~/mail:INBOX=/var/mail/%u
userdb {
  driver = passwd
}
passdb {
  args = %s
  driver = pam
}
protocols = "imap"
namespace inbox {
  inbox = yes
  mailbox Trash {
    auto = subscribe
    special_use = Trash
  }
  mailbox Drafts {
    auto = subscribe
    special_use = Drafts
  }
  mailbox Sent {
    auto = subscribe # autocreate and autosubscribe the Sent mailbox
    special_use = Sent
  }
  mailbox "Sent Messages" {
    auto = no
    special_use = Sent
  }
  mailbox Junk {
    auto = create # autocreate Spam, but don't autosubscribe
    special_use = Junk
  }
  mailbox virtual/All { # if you have a virtual "All messages" mailbox 
    auto = no
    special_use = All
  }
}
service auth {
  unix_listener /var/spool/postfix/private/auth {
    group = postfix
    mode = 0660
    user = postfix
  }
}
ssl=required
ssl_cert = </etc/ssl/certs/mailcert.pem
ssl_key = </etc/ssl/private/mail.key</pre>

Es folgt das Anlegen von Mailboxen und Benutzern.
