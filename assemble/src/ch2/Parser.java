package ch2;

public class Parser {
    Lexer input; //from where do we get token?
    Token lookahead; //the current lookahead token;

    public Parser(Lexer input){
        this.input = input;
        lookahead = input.nextToken();
    }



    public void match(int x){
        if(lookahead.type == x) consume();
        else throw new Error("expecting" + input.getTokenName(x) + "; found" + lookahead);
    }

    public void consume(){
        lookahead = input.nextToken();
    }

}
