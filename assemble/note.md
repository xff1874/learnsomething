
## LL
1. read the input from left to right
2. descend into parse tree children from left to right

### Praser
1. predict which kind of phrase approaches
2. invoke functions to match substructure
3. match  token
4. excute

## DSL
1. "Programs" in this DSL -> grammars.
2. Tools that translate grammars to parsers are called parser generators.
3. substructures,function -> rules.

### Tokenizing sentences.
Tokenizer(Lexer):recognizer that feed off character streams.
ANTLR:parser.

### Mapping Grammars to Recursive-Descent Recognizer
看懂了，没弄懂

## LL(1)
lexer: emit a sequence of tokens.
Token: token type+ text
NAME:represents the identifier category.
COMMA,LBRACK,RBRACK.

## LL(1) Recursive-Descent Parser
Analyze the syntactic structure of the token sequence

### computing Lookahead Sets
lookahead set is the set of tokens that can begin a particaluar alternative.
1. FIRST
2. FOLLOW
alternative

## Enhanced Parsing Pattern
1. Backtracking parser.
attmpts alternatives in order until one of them matches the current input.
2. Memoizing Parser.
dramatically increases speculative parsing performace at the cost of a small amount of memory
3. Predicator Parser.
alter parser control-flow with arbitary boolean expressions called semantic predicates.

### Backtracking Code Templates
speculatively attmpt the alternatives in order until we find one that matches.
Upon success, the parser rewinds the input and parse the alternative noramlly(
    we'll see why we parse it twice when we discuss actions
).Upon failing to match an alternative, the parser rewinds the input ant tries the next one.

```java
    public void rule() throw RecognitionException{
        if(speculate_alt1()){
            match-alt1
        }
        else if (speculate_alt2()){
            match-alt2
        }
        else if (speculate_altn()){
            match-altn
        }
        else
            throw new NoViableException("expecting rule")
    }
```

The hear of a backtracking parser lies in its token buffer management.
The easiest way to deal with arbitray lookahead is simply to buffer up the entire token stream.

 #### rewind the token stream

 1. buffer size n
 2. current index p;
    if p falls off the end of buffer.
        a. we need to reset p = 0
        b. stretch the buffer.
3. mark() push the current token index onto a stack
4. release() pops the index back off the stack and rewinds p to that position.

side effects

to allow actions with side effects in a backtracking parser, all we have to do
is gate actions with a test to see whether the parser is speculating.
During speculation, all actions are off. Once the parser knows an alternative will match,
however, it can match the alternative agagin "with feeling" to do the actions.

Implementation

```java
stat: list EOF | assign EOF;
assign: list '=' list;
list: '['elements']';
elements : element(',' element)*;
element : NAME '=' NAME | NAME |list; //element is name,nested list
```

```java
    public void stat() throws RecognitionException{
        //attempt alternative 1: list EOF
        if(speculate_stat_alt1()){
            list();match(Lexer.EOF_TYPE);
        }
        //attmpt alternative 2: assign EOF
        else if(speculate_stat_alt2()){
            assign();match(Lexer.EOF_TYPE);
        }
        //must be an error;neither matched;LT(1) is lookahead token 1;
        else
            throw new NoviableAltException("expecting stat found" + LT(1))
    }

    public boolean speculate_stat_alt1(){
        boolean success =true;
        mark(); //mark this spot in input so we can rewind
        try{
            list();
            match(Lexer.EOF_TYPE);
        }
        catch(RecognitionExcreption e){
            success = false;
        }
        release(); //either way, rewind to where are were;
        return success;
    }

    public boolean speculate_stat_alt2(){
        boolean success =true;
        mark(); //mark this spot in input so we can rewind
        try{
            assign();
            match(Lexer.EOF_TYPE);
        }
        catch(RecognitionExcreption e){
            success = false;
        }
        release(); //either way, rewind to where are were;
        return success;
    }

    public class Parser{
        Lexer input;
        List<Interger> markers;// stack of index markers into lookahead buffer
        List <Token> lookahead; //dynamically-sized lookahead buff;
        int p = 0; //index of current llokahead token; LT(1) returns lookahead[p]

        public Token LT(int i){
            sync(i);
            return lookahead.get(p+i-1);
        }
        public int LA(int i) {
            return LT(i).type;
        }
        public void match(int x) throws MismatchedTokenException{
            if(LA(1) == x) consume();
            else
                throw new MismatchedTokenException("expecting"+ input.getTokenName(x)+ "found" +LT(1))
        }

        /*Make sure we have i token from current positon p*/
        public void sync(int i){
            if(p + i - 1 >(lookahead.size() -1)){//out of tokens?
                int n = (p + i -1) -(lookahead.size() -1); //get n tokens;
                fill(n)
            }
        }

        public void fill(int n){ // add n tokens;
            for(int i =1;i<=n;i++){
                lookahead.add(input.nextToken())
            }
        }

        public void consume(){
            p++;
            // have we hit end of buffer when not backtracking?
            if( p == lookahead.size() && !isSpeculationg()){
                //if so ti's an opportunity to start filling at index 0 agin
                p = 0;
                lookahead.clear(); //size goes to 0, but retains memory
            }

            sync(1);//get another to replace sonsumed token
        }

        public int mark(){
            markes.add(p);
            return p;
        }

        public void release(){
            int marker = markers.get(markers.size()-1);
            markers.remove(markers.size()-1);
            seek(marker)
        }

        public void seek(int index){
            p = index;
        }

        public isSpeculating(){
            return markers.size() > 0;
        }
    }


```

### Memoizing Parser
dictionary to memoize three conditions:unkonwn,failed,succeeded.
staus->number
negative number->failed.
zero->unknow.
greater indicate success and positon.


