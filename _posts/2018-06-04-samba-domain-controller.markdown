---
layout: post
title: Einen Domain Controller mit Samba estellen
author: Manuel Zarat
category: tutorials
permalink: /post/samba-domain-controller
---

Der Server muss eine statische IP Adresse haben. Dazu bearbeite ich die Datei <code>/etc/network/interfaces</code> und füge folgendes ein.

<!--excerpt_separator-->

<pre>
auto eth0
iface eth0 inet static
address 192.168.0.2
netmask 255.255.255.0
gateway 192.168.0.1
dns-nameservers 8.8.8.8
</pre>

Um den Hostnamen festzulegen bearbeite ich die Dateien <code>/etc/hosts</code> und <code>/etc/hostname</code>. In die Datei <code>/etc/hostname</code> schreibe ich den FQDN, den kompletten Servernamen inklusive Domain.

<pre>
samba.example.com
</pre>

und in der Datei <code>/etc/hosts</code> füge ich einen Eintrag zu der eben eingestellten IP Adresse, dem FQDN und dem Hostnamen hinzu.

<pre>
192.168.0.2    samba.example.com    samba
</pre>

Jetzt installiere ich die erforderlichen Pakete:

<pre>
apt install -y samba krb5-user krb5-config winbind smbclient
</pre>

Während der Installation werde ich zu Informationen für den Kerberos Dienst gefragt

<pre>
Kerberos Realm: example.com
Kerberos servers for your realm: samba.example.com
Administrative server for your kerberos realm: samba.example.com
</pre>

Bevor ich jetzt die Domain provisioniere lösche ich die voreingestellte Sambakonfiguration unter <code>/etc/samba/smb.conf</code>, ausserdem die Datei <code>/etc/resolv.conf</code> und starte anschliessend die Provisionierung.

<pre>
samba-tool domain provision
</pre>

Nun lösche ich die bestehende Kerberos Konfiguration unter <code>/etc/krb5.conf</code> und ersetze sie mit einem Softlink auf <code>/var/lib/samba/private/krb5.conf</code>.

<pre>
rm /etc/krb5.conf
ln -s /var/lib/samba/private/krb5.conf /etc/
</pre>

Zuletzt beende ich die laufenden Samba Dienste und DNS Resolver um das Service zu demaskieren und starte es erneut.

<pre>
systemctl disable --now smbd nmbd winbind systemd-resolved
systemctl unmask samba-ad-dc.service
systemctl enable --now samba-ad-dc.service
</pre>

Zum Schluss kann man prüfen ob alles funktioniert hat. Der Level sollte dem eines Windows Server 2008 entsprechen. Den Server starte ich neu.

<pre>
samba-tool domain level show
reboot
</pre>

Jetztlege ich noch einen Testbenutzer mit dem Namen <code>user1</code> an.

<pre>
samba-tool user create user1
</pre>
