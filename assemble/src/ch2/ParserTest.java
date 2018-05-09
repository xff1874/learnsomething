package ch2;

public class ParserTest {

    public static void main(String[] args) {
        ListLexer lexer = new ListLexer("[a,ttt"); // parse command-line arg
        ListParser parser = new ListParser(lexer);
        parser.list();
    }

}
