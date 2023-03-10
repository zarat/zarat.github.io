---
layout: post
title: Root CA mit OpenSSL erstellen
author: Manuel Zarat
category: tutorials
tags: sicherheit
permalink: /blog/openssl-root-ca
---

Wie man mit OpenSSL seine eigene Root CA erstellen kann.

<!--excerpt_separator-->

## CA key und ca erstellen
openssl req -newkey rsa:2048 -nodes -keyform PEM -keyout apitest01-ca.key -x509 -days 3650 -outform PEM -out apitest01-ca.crt 

## intermediate key erzeugen
openssl genrsa -out apitest01.key 2048 

## intermediate CSR erzeugen
openssl req -new -key apitest01.key -out apitest01.csr

## intermediate mit CA signieren
openssl x509 -req -in apitest01.csr -CA apitest01-ca.crt -CAkey apitest01-ca.key -set_serial 100 -days 365 -outform PEM -out apitest01.crt 

## client key erzeugen
openssl genrsa -out apitest01-client.key 2048

## client CSR erzeugen
openssl req -new -key apitest01-client.key -out apitest01-client.csr 

## client cert signieren
openssl x509 -req -in apitest01-client.csr -CA apitest01-ca.crt -CAkey apitest01-ca.key -set_serial 101 -days 365 -outform PEM -out apitest01-client.crt 

## copy ca cert to pki for apache config (set this into the apache config)
cp apitest01-ca.crt /etc/pki/tls/apitest01-ca.crt

## bundle client cert and key into .p12 file
openssl pkcs12 -export -inkey apitest01-client.key -in apitest01-client.crt -out apitest01-client.p12
