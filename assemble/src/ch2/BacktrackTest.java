package ch2;

public class BacktrackTest {

    /**
     * stat : list EOF | assign EOF;
     * assign : list '=' list;
     * list: [elements]
     * elemtns; element(,element)*
     * elemetn: NAME '=' NAME | NAME | list;
     * @param args
     */

    public static void main(String[] args) {

        String input = "[a,b,c]=[d,e,f]";
        BacktrackLexer lexer = new BacktrackLexer(input);
        BacktrackParser parser = new BacktrackParser(lexer);
        parser.stat();

    }
}
