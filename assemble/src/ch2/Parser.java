package ch2;

import java.util.ArrayList;
import java.util.List;

public abstract  class Parser {
    Lexer input; //from where do we get token?
    List <Integer> markers; //stack of index markers into lookahead buffer;
    List<Token> lookahead; //dynamically-sized lookahead buffer;
    int p = 0;



    public Parser(Lexer input){
        this.input = input;
        markers = new ArrayList<>();
        lookahead = new ArrayList<>();
        sync(1); //prime buffer with at least 1 token;

    }

    public Token LT(int i){
        sync(i);
        return lookahead.get(p + i -1);
    }

    public int LA(int i){
        return LT(i).type;
    }

    public void match(int x) {
        if(LA(1)  == x){
            consume();
        }
    }

    public void sync(int i){
        if(p + i-1 > (lookahead.size()-1)){ //out of token?
            int n = (p+i-1)-(lookahead.size() -1); //get n tokens;
            fill(n);
        }
    }

    public void fill(int n){
        for(int i=0;i<n;i++){
            lookahead.add(input.nextToken());
        }
    }

    public void consume(){
        p++;
        //have hit end of buffer when not backtracking?
        if(p == lookahead.size() && !isSpeculating()){
            //if so ,it's an opportunity to start filling at index 0 again.
            p =0;
            lookahead.clear(); //size goes to 0,but retains memory;
        }
        sync(1);
    }

    public int mark(){
        markers.add(p);
        return p;
    }

    public void release(){
        int marker = markers.get(markers.size()-1);
        markers.remove(markers.size() -1 );
        seek(marker);

    }

    public void seek(int index){
        p = index;
    }


    public boolean isSpeculating(){
        return markers.size() > 0;
    }






}
