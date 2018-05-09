package ch2;

public class ListParser extends Parser {
    public ListParser(Lexer input){
        super(input);
    }

    /**
     * list:'[' elements ']' //match bracketed list
     */
    public void list(){
        match(ListLexer.LBRACK);elments();match(ListLexer.RBRACk);
    }

    /**
     * elments: elment (',' elment)*;
     */

    void elments(){
        element();
        while(lookahead.type == ListLexer.COMMA){
            match(ListLexer.COMMA);element();
        }
    }

    /**
     * element:name|List;
     */

    void element(){
        if(lookahead.type == ListLexer.NAME) match(ListLexer.NAME);
        else if(lookahead.type == ListLexer.LBRACK) list();
        else throw new Error("expecting name or list;found" + lookahead);
    }
}
