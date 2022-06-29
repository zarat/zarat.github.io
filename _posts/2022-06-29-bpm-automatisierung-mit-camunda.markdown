---
layout: post
title: Automatisierung mit Camunda BPM
author: Manuel Zarat
category: tutorials
tags: programm
permalink: /blog/camunda-bpm
---

Camunda ist ein kostenloses BPM Automatisierungstool auf Enterprise Niveau.

<!--excerpt_separator-->

Zuerst lade ich Camunda von der Website herunter. Ich wähle dabei "Other distributions" und den Tomcat Download (~120MB). Die Ordnerstruktur ist im Wurzelverzeichnis des Paketes deshalb erstelle ich einen neuen Ordner und entpacke das zip Paket darin. Ausserdem installiere ich das benötigte Java JDK und die JRE gleich mit.

<pre>
  apt install openjdk-8-jdk openjdk-8-jre
</pre>

Im Prinzip ist eine lauffähige Demo jetzt einsatzbereit. Für das Production environment sollte man allerdings davor einige Einstellungen vornehmen.

<h3>Datenbank</h3>

Von Haus aus arbeitet Camunda mit einer h2 Datenbank. Das ist eine In-Memory Datenbank welche keine Persistenz bietet. Deshalb konfiguriere ich eine Anbindung an MySQL. 

<pre>
apt install mysql-server
mysql_secure_installatoin
</pre>

Nach der Anmeldung führe ich folgende Befehle aus

<pre>
CREATE DATABASE IF NOT EXISTS camundabpm;
GRANT ALL ON camunda.* TO camunda@'localhost' IDENTIFIED BY 's3cr3t';
GRANT ALL ON camunda.* TO camunda@'%' IDENTIFIED BY 's3cr3t';
GRANT ALL ON camunda.* TO camunda@'127.0.0.1' IDENTIFIED BY 's3cr3t';
</pre>

und melde mich wieder ab.

Im Ordner <code>$CAMUNDA_HOME/sql/create</code> liegen SQL Dateien, darunter 2 die mit dem Namen <code>mysql</code> beginnen. Diese importiere ich in die angelegte Datenbank.

<pre>
mysql camunda -u camunda -ps3cr3t <  mysql_engine_7.0.0.sql
mysql camunda -u camunda -ps3cr3t <  mysql_identity_7.0.0.sql
</pre>

Jetzt lade ich mir die neueste Version des MySQL Java Connectors von https://mvnrepository.com/artifact/mysql/mysql-connector-java herunter und kopiere die jar Datei in das Verzeichnis <code>$CAMUNDA_HOME/server/apache-tomcat-7.0.33/lib</code>. Im Ordner <code>$CAMUNDA_HOME/server/apache-tomcat-9.0.58/conf</code> bearbeite ich die Datei <code>server.xml</code>.

Den Block Resource name "jdbc/ProcessEngine"

```
<Resource name="jdbc/ProcessEngine"
              auth="Container"
              type="javax.sql.DataSource"
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              uniqueResourceName="process-engine"
              driverClassName="org.h2.Driver"
              url="jdbc:h2:./camunda-h2-dbs/process-engine;TRACE_LEVEL_FILE=0;D$
              defaultTransactionIsolation="READ_COMMITTED"
              username="sa"
              password="sa"
              maxActive="20"
              minIdle="5"
              maxIdle="20" />
```

ersetze ich durch 
                          
```
<Resource name="jdbc/ProcessEngine"
              auth="Container"
              type="javax.sql.DataSource"
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              uniqueResourceName="process-engine"
              driverClassName="com.mysql.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/camunda?autoReconnect=true"
              defaultTransactionIsolation="READ_COMMITTED"
              username="camunda"
              password="s3cr3t"
              maxActive="20"
              minIdle="5" />
```
