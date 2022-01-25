---
layout: post
title: Eine eigene Scriptsprache in C++ erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/script-interpreter
---

Ein Interpreter liest Quellcode ein, übersetzt ihn in Maschinenbefehle welche der Reihe nach abgearbeitet werden. Um den reinen Quelltext zu verarbeiten sind dabei im wesentlichen 3 Schritte nötig.

  * Ein Lexer ist der 1. Teil eines Interpreters, der eine Folge von Zeichen (Klartext) in eine Folge von Tokens umwandelt.
  * Ein Parser wiederum nimmt eine Folge von Tokens und erzeugt einen abstrakten Syntaxbaum (AST) einer Sprache. Die Regeln, nach denen ein Parser arbeitet, werden normalerweise durch eine formale Grammatik spezifiziert.
  * Ein Interpreter arbeitet den generierten AST der Reihe nach ab.
