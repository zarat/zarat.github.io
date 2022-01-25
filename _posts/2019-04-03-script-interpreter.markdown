---
layout: post
title: Eine eigene Scriptsprache in C++ erstellen
author: Manuel Zarat
categories: tutorials
permalink: /post/script-interpreter
---

Ein Interpreter liest in der Regel keinen binären Code sondern reinen Quelltext.

<!--excerpt_separator-->

Um diesen Quelltext verarbeiten zu können muss dieser zuerst in eine für den Interpreter verständliche Form gebracht werden. Diese spezielle Form nennt man <a href="https://de.wikipedia.org/wiki/Syntaxbaum" target="_blank">AST (Abstract syntax tree)</a> und dazu sind im wesentlichen 2 Schritte nötig.

<ul>
 <li>Ein Lexer wandelt eine Folge von Zeichen (Klartext) in eine Folge von Tokens um.</li>
 <li>Ein Parser nimmt die Folge von Tokens und erzeugt einen AST.</li>
</ul>

<img src="https://zarat.ml/assets/images/interpreter_chain.png" style="width:100%;">

<h3>Token</h3>

```C++
#define EMPTY "EMPTY"
#define SEMI "SEMI" 
#define COMMA "COMMA" 
#define LPAREN "LPAREN" 
#define RPAREN "RPAREN" 
#define LBRACKET "LBRACKET"
#define RBRACKET "RBRACKET" 
#define LBRACE "LBRACE" 
#define RBRACE "RBRACE" 
#define CODE_BLOCK "CODE_BLOCK"

#define ASSIGN "ASSIGN" 
#define PLUS "ADD"
#define INC "INC"
#define MINUS "SUB"
#define DEC "DEC"
#define MUL "MUL"
#define DIV "DIV"
#define MOD "MOD"
#define EQ "EQ"
#define NEQ "NEQ"
#define LT "LT"
#define GT "GT"
#define LEQ "LEQ"
#define GEQ "GEQ"
#define POW "POW"
#define AND "AND"
#define OR "OR"

#define IDENTIFIER "IDENTIFIER"
#define VARIABLE "VARIABLE"
#define INTEGER "INTEGER"

class Token {

    private:
    
    	std::string type;
    	std::string value; 
              
    public:
    
        Token() {
            type = "";
            value = "";
        } 
           
        Token(std::string _type, std::string _value) {
            type = _type;
            value = _value;
        }  
           
        ~Token(){};	
        
    	   std::string _value() { 
            return value; 
        }
        
    	   std::string _type() { 
            return type; 
        } 
           
        std::string str() { 
            return ("Token("+type+","+value+")"); 
        }  
          
};
```
