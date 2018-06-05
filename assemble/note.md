
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


### Bulding Intermediate Form Trees

In this part of the book, we're going to
explore the patterns that help us analyze input phrases.

word track occurance.

#### Syntax-directed application

they can generate output as soon as they recognize a construct.

#### AST
abstract syntax tree.
ASTs hold the key tokens from the input stream and record grammatical relationships discovered during the parse.

#### Quest

1. Why we build trees in the first place

2. How we should structure ASTs and why

3. How to implement ASTs in an object-oriented language

4. How to enforce tree structure with an implementation language's static type system.

5. How to construct ASTs with ANTLR's AST operators and rewrite rules.

#### Four most common IR tree patterns

1. Parse Tree. parse trees record how a parser recongnizes an input sentence.
The interiro nodes are rule names, and the leaves are tokens. Although parse trees are
less suitable than ASTs for most language applications, parsers can create them automatically.

2.Homogenous AST. The most important thing about a tree is __its shape__, not its node data type. Unless we're writing a lot of code by hand, we can get away with a few or even
just one node data type. If all the nodes have the same type, we say that they are homogeneous. With a single node type, there can be no specialty fields to reference child subtrees. Nodes track children with lists of child pointers.

3. Normalized Heterogeneous AST. Trees with a multitude of node types are code heterogeneous trees. Normalized heterogeneous trees use a normalized list of children like homogeneous trees.

4. Ireregular Heterogeneous AST. when we are refer to an AST as heterogeneous, we also assume that the nodes have ireregular children. Instead of a normalized child list, the nodes have names fields, one per child.

#### Parse Tree
用树表示输入然后校验语法正确。


#### AST

1. No unnecessary nodes
2. Easy to walk
3. emphasize operators,operands and the relationsip between them rather than artifacts from the grammar.

The key idea: operators or opeartions become subtree roots. All other tokens become operands

Order

The higher precedence appear lower in the AST.

### Parse Tree

### Homogenenous AST
A homogeneous tree implments an abstract syntax tree(AST) using a single node data type and a normalized child list represetntation.
operator vs operand.
```java
public class AST{
    Token token;
    List<AST> children;
}
```

### Normalized Heterogenous AST
More than a single Node data type but with a normalized child list representation.
```java
public abstract class ExprNode extends AST;
public class IntNode extends ExprNode;
public class AddNode extend ExprNode;
```

### Irregular Heterogenous AST.
Instead of a uniform list of children,
each node data type has specifi(named) child fields.
```java
    public class AddNode extends ExprNode{
        ExprNode left,right;
    }
```

### Walking and Rewriting Trees

#### Four key-walking patterns
1. Embeded Heterogeneous Tree Walker.
    execute appropriate actions and walk any children.

2. External Tree Visitor.
    Encapsulate tree walking code into a single class definition.
    It allows us to alter tree-walking behaviour without altering AST node definitions.

3. Tree Grammer.
    rely on node token types rahter than node types.

4. Treee Pattern Matcher.
    focus on subtrees. decouple the order in which we apply tree patterns
    from the tree patterns themselves.

#### traversal.

1. Preorder traversal. visit a parent node before visiting its children.
2. Inorder traversal. visit a node in between visiting children.
3. Postorder traversal. visit a node after its children.

Tree walker is different from action order.

#### Embedded Heterogeneous Tree Walker
```java
    class NodeName extends commonRoot{
        public void walking-method-name(){
            preoder-action-for-this-node-or-subtree;
            walk-any-children;
        }
    }

```

```java
    public class HeteroAST{
        Token token;
        public HeteroAST(){}
        public HeteroAST(Token token){this.token = token;}
        public String toString(){returtn token.toString()}

    }

```

```java
    public abstract class VecMathNode extends HeteroAST{
        public VecMathNode()
        public VecMathNode(Token token)
        public void print(){
            System.out.print(token !=null?token.toString:"<null></null>")
        }
    }
```

```java
    public class AssignNode extends StatNode{
        VarNode id;
        ExprNode value;
        public void print(){
            id.print();//walk left child
            System.out.print("=");
            value.print();//walk right child
            System.out.println();
        }
    }
```

#### External Tree Visitor

Visitors combine tree walking and action execution code outside the
AST node definition. Consequently, we can change the functionality of
the tree walker without having to change the AST class definitions and
can even switch visitors on the fly.

Implementation
"double dispatch"
visit();

```java
    public abstract class VecMathNode extends HeteroAST{
        public abstract void visit(VecMathVisitor visitor);
    }
```

```java
   public void visit(VecMathVisitor visitor){
       visitor.visit(this)
   }
```

n->AddNode
n.visitor(myVisitor) ->myVisitor.visit((AddNode)n);

```java
    public interface VecMathVisitor{
        void visit(AssignNode n);
        void visit(PrintNode n);
    }

    public class PrintVisitor implements VecMathVisitor{
        public void visit(AssignNode n){
            n.id.visit(this);
            System.out.println("=");
            n.value.visit(this);
            System.out.println();
        }
    }
```

Switching on the Token type BUild Independent Visitors.

```java
public void print(VecMathNode n){
    switch(n.token.type){
        case Token.ID:  print((VarNode)n);break;
        case Token.ASSIGN: (print (AssignNode)n)break;
    }
}

public void print(VarNode n){
    print(n.left);
    System.out.println("var");
    print(n.right);
}
```

#### Tree Grammar
```antlr
    tree grammar Printer; //this grammar is a tree grammar called Printer
    options{
        tokenVocab = VecMath; //use token vocabulary from VecMath.g
        ASTLabelType = CommonTree; //use homogeneous CommonTree for $ID.etc
    }
    @memebers{void print(String s)}{System.out.print(s)}
```

```printer.g
    prog: stat+; //match list of statement
    //match tree like ("=" x 1) and ('print' ('+' 3 4))
    stat: ^('='ID {print($ID.text+"=";)}expr){print ("\n")}
        | ^('print' {print("print ");}expr){print("\n")}
    expr: ^('+' expr {print("+");}expr)
        | INT {print($INT.text)}
```

#### Tree Pattern Matcher.

1. We have to specify patterns only for the subtrees we care about.
2. we dont' need to direct the tree walk.

4 * [0,5*0,3] -> [4*0,4*5,4*3] ->[0,0,4*3]

```java
^('*' INT ^(VEC .+)) // * at root with 2nd child as vector
scalarVectorMult : ^('*' INT ^(VEC (e+=.)+)) -> ^(VEC ^('*' INT $e)+)
zeroX:^('*' a=INT b=INT {$a.int == 0}?) ->$a; //0 * x -> 0;

```

Optimizations

```java
 x+x -> 2 * x;
 2 * x -> x << 1; //left shift.
 x<<n<<m -> x <<(n+m)
```

### Tracking and Identifying Program Symbol

















