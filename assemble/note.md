
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


