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

<h3>Abstract syntax tree</h3>

```C++
class ASTNode {
    
    public:        

        std::vector<ASTNode*> child;                    
    	Token token;                
        
        ASTNode() {};                        
    	
        ASTNode(Token _token) {
            token = _token;
        }         
        
        ~ASTNode() {}; 
    	
        void make_child(ASTNode _node) {
            ASTNode *temp = new ASTNode(_node._token());
            temp->child = _node.child;
            child.push_back(temp);
        }            
    	
        Token _token() {
            return token;
        }     

        void show(int level) {                

            if(level < 2 && level != 0) 
                std::cout << std::string(level*2, ' ') << "Token('" << token._type() << "', '" << token._value() << "')\n";

            else 
                std::cout << std::string(level*2, ' ') << "Token('" << token._type() << "', '" << token._value() << "')\n";   

            for(auto it = child.begin(); it != child.end(); it++) 
                (*it)->show(level+1);

        }

};
```

<h3>Lexer</h3>

```C++
class Lexer {

    private:

        std::string text;
        char current_char;
        int pos;

    public:

        Lexer() {
            text = "";
            pos = 0;
            current_char = EOF;
        }

        Lexer(std::string _text) {
            text = _text;
            pos = 0;
            current_char = text[pos];
        }

        ~Lexer() {};

        void error() {
            std::cout << "lexer: unknown '" << text[pos] << "' at position " << pos << "\n";
            std::exit(0);
        }

        void skip_whitespaces();
        void skip_comments();
        void advance_pos();
        void reduce_pos();
        char peek();
        char peek(int n);
        Token getNextToken();
        Token identifier();
        std::string number();

};

void Lexer::skip_whitespaces() {
    while (text[pos] == ' ' || text[pos] == '\t' || text[pos] == '\n')
        advance_pos();
}

void Lexer::skip_comments() {
    advance_pos();
    advance_pos();
    while (!(current_char == '*' && peek() == '/'))
        advance_pos();
    advance_pos();
    advance_pos();
}

void Lexer::advance_pos() {
    pos++;
    if (pos >= text.length())
        current_char = EOF;
    else
        current_char = text[pos];
}

void Lexer::reduce_pos() {
    pos--;
    if (pos <= 0)
        current_char = EOF;
    else
        current_char = text[pos];
}

std::string Lexer::number() {
    std::string str;
    while (current_char >= 48 && current_char <= 57) {
        str.push_back(current_char);
        advance_pos();
    }
    return str;
}

Token Lexer::identifier() {
    std::string result;
    Token token;
    while ((current_char >= 48 && current_char <= 57) || (current_char >= 65 && current_char <= 90) || (current_char >= 97 && current_char <= 122)) {
        result.push_back(current_char);
        advance_pos();
    }
    token = Token(VARIABLE, result);
    return token;
}

char Lexer::peek() {
    if (pos + 1 >= text.length())
        return EOF;
    else
        return text[pos + 1];
}

char Lexer::peek(int n) {
    if (pos + n >= text.length())
        return EOF;
    else
        return text[pos + n];
}

Token Lexer::getNextToken() {
    std::string temp_str;
    skip_whitespaces();

    while (current_char == '/' && peek() == '*') {
        skip_comments();
    }

    if ((current_char >= 65 && current_char <= 90) || (current_char >= 97 && current_char <= 122)) {
        return identifier();
    } else if (current_char >= 48 && current_char <= 57) {
        temp_str = number();
        return Token(INTEGER, temp_str);
    }

    if (current_char == '[') {
        advance_pos();
        return Token(LBRACKET, "[");
    }

    if (current_char == ']') {
        advance_pos();
        return Token(RBRACKET, "]");
    }

    if (current_char == '^') {
        advance_pos();
        return Token(POW, POW);
    }

    if (current_char == '+') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(PLUS, temp_str);
    }

    if (current_char == '-') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(MINUS, temp_str);
    }

    if (current_char == '*') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(MUL, temp_str);
    }

    if (current_char == '/') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(DIV, temp_str);
    }

    if (current_char == '%') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(MOD, temp_str);
    }

    if (current_char == '&' && peek() == '&') {
        temp_str.push_back(current_char);
        advance_pos();
        temp_str.push_back(current_char);
        advance_pos();
        return Token(AND, temp_str);
    }

    if (current_char == '|' && peek() == '|') {
        temp_str.push_back(current_char);
        advance_pos();
        temp_str.push_back(current_char);
        advance_pos();
        return Token(OR, temp_str);
    }

    if (current_char == '(') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(LPAREN, temp_str);
    }

    if (current_char == ')') {
        temp_str.push_back(current_char);
        advance_pos();
        return Token(RPAREN, temp_str);
    }

    if (current_char == EOF) {
        temp_str.push_back(current_char);
        return Token("EOF", temp_str);
    }

    if (current_char == '=' && peek() == '=') {
        advance_pos();
        advance_pos();
        return Token(EQ, "==");
    }

    if (current_char == '!' && peek() == '=') {
        advance_pos();
        advance_pos();
        return Token(NEQ, "!=");
    }

    if (current_char == '<' && peek() == '=') {
        advance_pos();
        advance_pos();
        return Token(LEQ, "<=");
    }

    if (current_char == '>' && peek() == '=') {
        advance_pos();
        advance_pos();
        return Token(GEQ, ">=");
    }

    if (current_char == '<') {
        advance_pos();
        return Token(LT, "<");
    }

    if (current_char == '>') {
        advance_pos();
        return Token(GT, ">");
    }

    if (current_char == '=' && peek() != '=') {
        Token token(ASSIGN, "=");
        advance_pos();
        return token;
    }

    if (current_char == ';') {
        advance_pos();
        return Token(SEMI, ";");
    }

    if (current_char == ',') {
        advance_pos();
        return Token(COMMA, ",");
    }

    if (current_char == '{') {
        advance_pos();
        return Token(LBRACE, "{");
    }

    if (current_char == '}') {
        advance_pos();
        return Token(RBRACE, "}");
    }

    error();

}
```
