---
layout: post
title: Eine eigene Scriptsprache in C++ erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/script-interpreter
---

Ein Interpreter liest in der Regel keinen binären Code sondern reinen Quelltext.

<!--excerpt_separator-->

Um diesen zu verarbeiten sind im wesentlichen 3 Schritte nötig.

<ul>
 <li>Ein Lexer wandelt eine Folge von Zeichen (Klartext) in eine Folge von Tokens um.</li>
 <li>Ein Parser nimmt die Folge von Tokens und erzeugt einen abstrakten Syntaxbaum (AST) nach den Regeln einer zuvor definierten Grammatik.</li>
 <li>Ein Interpreter arbeitet den generierten AST der Reihe nach ab.</li>
</ul>

<img src="https://zarat.ml/assets/images/interpreter_chain.png" style="width:100%;">
