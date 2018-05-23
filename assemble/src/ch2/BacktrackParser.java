package ch2;


import java.util.HashMap;
import java.util.Map;

public class BacktrackParser extends  Parser {

    Map<Integer,Integer> list_memo = new HashMap<Integer,Integer>();



    public BacktrackParser(Lexer lexer){
        super(lexer);
    }


    /**
     * list: '[' elements ']' //match bracketed list
     */
    public void _list(){
        match(BacktrackLexer.LBRACK);
        elements();
        match(BacktrackLexer.RBRACk);
    }

    public void list(){
        boolean failed = false;
        int startTokenIndex = index(); //get current token position;
        if(isSpeculating() && alreadyParsedRule(list_memo))return;
        //must not have previously parsed list at token parse it
        try{_list();}
        catch(Exception e){
            failed = true;
            throw e;
        }
        finally {
            //succeed or fail, must record result if backtracking.
            if(isSpeculating())
                memoize(list_memo,startTokenIndex,failed);
        }
    }

    /**
     * assign : list '=' list;
     *
     */

    public void assign(){
        list();
        match(BacktrackLexer.EQUALS);
        list();
    }

    /**
     * elements; element (',' element)*;
     */

    void elements() {
        element();
        while(LA(1) == BacktrackLexer.COMMA){
            match(BacktrackLexer.COMMA);
            element();
        }

    }

    /**
     * element NAME '=' NAME | NAME | list; aissignment, NAME or list
     */

    void element(){
        if(LA(1) == BacktrackLexer.NAME && LA(2) == BacktrackLexer.EQUALS){
            match(BacktrackLexer.NAME);
            match(BacktrackLexer.EQUALS);
            match(BacktrackLexer.NAME);
        }else if(LA(1) == BacktrackLexer.NAME){
            match(BacktrackLexer.NAME);
        }else if(LA(1) == BacktrackLexer.LBRACK){
            list();
        }else{
            throw new Error("expecting name or list"+LT(1));
        }
    }

    /**
     * stat : list EOF | assign EOF;
     */

    public void stat(){
        //attempt alternative 1: list EOF
        if(speculate_stat_alt1()){
            list();
            match(Lexer.EOF_TYPE);
        }

        //attmpt alternative2 assign EOF
        else if(speculate_stat_alt2()){
            assign();
            match(Lexer.EOF_TYPE);
        }
        else
            throw new Error("expecting stat found"+LT(1));
    }

    private boolean speculate_stat_alt1(){
        boolean success =true;
        mark();
        try{
            list();
            match(Lexer.EOF_TYPE);
        }
        catch(Exception e){
            success = false;
        }
        release();
        return success;
    }

    private boolean speculate_stat_alt2(){
        boolean success =true;
        mark();
        try{
            assign();
            match(Lexer.EOF_TYPE);
        }
        catch(Exception e){
            success = false;
        }
        release();
        return success;
    }

    public void clearMemo(){
        list_memo.clear();
    }
}
