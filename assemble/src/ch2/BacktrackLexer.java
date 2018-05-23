package ch2;

public class BacktrackLexer extends  Lexer {

    public static int NAME =2;
    public static int EQUALS = 3;
    public static int COMMA=4;
    public static int LBRACK = 5;
    public static int RBRACk = 6;


    public BacktrackLexer(String input){
        super(input);
    }

    public static String[] tokenNames={
            "n/a","<EOF>","NAME","EQUALS","COMMA","LBRACK","RBRACK"
    };


    @Override
    public String getTokenName(int x) {
        return tokenNames[x];
    }



    @Override
    public Token nextToken() {
        while(c != EOF){
            switch(c){
                case ' ': case '\t': case '\n': case '\r':
                    WHITESPACE();
                    continue;
                case '=':
                    consume();
                    return new Token(EQUALS, "=");
                case ',':
                    consume();
                    return new Token(COMMA,",");
                case '[':
                    consume();
                    return new Token(LBRACK,"[");
                case ']':
                    consume();
                    return new Token(RBRACk,"]");
                    default:
                        if(isLETTER()){
                            return NAME();
                        }
                        throw new Error("Invalid character: " +c);
            }
        }
        return new Token(EOF_TYPE,"<EOF>");
    }

    /**
     * NAME:('a'...'z'|'A'....'Z')+; //NAME is a sequence of >=1 letter;
     */

    private Token NAME(){
        StringBuilder buffer = new StringBuilder();
        do{
            buffer.append(c);
            consume();
        }while(isLETTER());
        return new Token(NAME, buffer.toString());
    }


    /**
     * WS
     */

    private void WHITESPACE(){
        while(c == ' ' || c == '\t' || c == '\n' || c == '\r'){
            consume();
        }
    }

    private boolean isLETTER(){
        return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
    }
}
