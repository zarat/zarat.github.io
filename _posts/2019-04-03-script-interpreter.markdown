---
layout: post
title: Eine eigene Scriptsprache in C++ erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/script-interpreter
---

Ein Interpreter liest reinen Quelltext und um diesen zu verarbeiten sind im wesentlichen 3 Schritte nötig.

  * Ein Lexer ist der 1. Teil der eine Folge von Zeichen (Klartext) in eine Folge von Tokens umwandelt.
  * Ein Parser wiederum nimmt eine Folge von Tokens und erzeugt einen abstrakten Syntaxbaum (AST) nach den Regeln einer zuvor definierten Grammatik.
  * Ein Interpreter arbeitet den generierten AST der Reihe nach ab.
