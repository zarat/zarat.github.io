---
layout: post
title: Eine eigene Scriptsprache in C++ erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/script-interpreter
---

Ein Interpreter liest in der Regel keinen binären Code sondern reinen Quelltext.

<!--excerpt_separator-->

Um diesen Quelltext verarbeiten zu können muss dieser zuerst in eine für den Interpreter verständliche Form gebracht werden. Diese spezielle Form nennt man AST (Abstract syntax tree) und um diesen zu erstellen sind im Vorfeld 2 Schritte nötig.

<ul>
 <li>Ein Lexer wandelt eine Folge von Zeichen (Klartext) in eine Folge von Tokens um.</li>
 <li>Ein Parser nimmt die Folge von Tokens und erzeugt einen AST.</li>
</ul>

<img src="https://zarat.ml/assets/images/interpreter_chain.png" style="width:100%;">
