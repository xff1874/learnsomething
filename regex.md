### two concept
1. meta characters: *
2. literal: .txt
.表示任意字符包括空白

### start and end
^:一行的开始，也可以说是定位符，锚点。定位到一行的开始。
$:同理，定位到一行的结束。
^cat.先定位到一行开始，后面跟c.a.t三个字符。



### character class
[]:表示任一字符.[ae]表示匹配a或者e

### character-class metacharacter
-：表示范围，只能和[] 一起用？
H[1-6]: H后面跟着 1或2或3...6
[0-9a-zA-Z]:0...9ab..zA...Z 多个dash连用

### negat
[]里面加^表示不在范围之内。这个在[]外面是锚点，表示行开始
[^u]:不是u. 
[u^z]
[uz^0-9]

### 用dot(.)匹配任何字符(单一字符)
meta characters在characters class[]里面的意思和外面的意思不同
外面: 3.6.8 匹配3a6b8,3 6	8  。不匹配3aa6bb8
里面 3[.]6[.]8匹配 3.6.8

### Alternation 
| 匹配任意子表达式
gray|ey 
与[]不同
1. [] 只匹配单个character
2. [a|e]匹配 a,|,e 这里|在里面表示自己。
^from|subject: 匹配^from 和 subject (xxx subject)匹配
^(from|subject)匹配，^from,^subject.

### 大小写忽略 ignore i


### Optional Items
?:可选，表示前面的那个character或者group存在或不存在都可以。配合()用的比较多
```
    quor? match quo,quor,quot(quo部分)
    quo(test)? 匹配 quo,quotest
```
+,至少要一个
*,match as many as possible,but it is ok if nothing.


### () and backreferencing
Backreferencing is a regular-express feature that allows you to match new
text that is the same as some text matched earlier in the expression
```js
\<([A-Za-z]+) +\1 \> 
```
这里\1就是指前面的结果。
解释：先匹配任意的字母组合+任意空白，最后用\1重复自己。

### escape
\ 如何和meta character组合。表示字面意思。
. meta character表示任意的character。\.表示自己了。
\([a-z]+\) 匹配(very) 

匹配非空的字符串
"[^"]*"

subexpress
|或者()
quantifier. always work with the smallest immediately-preceding subexpress.

The oroder in which certain metacharacters are checked can be very important.

^[-+]?[0-9]*(\.[0-9]*)?$
(^[-+]?[0-9]*(\.[0-9]*)?.)([cf])$ group从做到右。
?: group but not catpture.(?:https)和group一期使用，放在前面。
\s,any white space. tab,space,newline,carriage.
modifers: /igm
\t tab
\n newline
\r return
\s any white character. tab,newline,space,formfeed
\S [^\s]
\w [0-9a-zA-Z_]
\W [^\w]
\d [0-9]
\D [^\d]

^From: (\S)+ \(([^()]*)\)
匹配 From: elvis@tabloid.org (The King)

lookaround和位置有关？
lookahead (?=) 主要是判断子regex的位置，从左往右，有括号
lookbehind （?<=） 从右往左，有括号
(?=Jeffery)Jeff 匹配 By Jeffrey Fridl 不匹配 Tom Jeffeson
\bJeff(?=s\b),只是检查Jeff后面是否有s,不作为最终匹配的一部分。
(?=s\b)(?<=\bJfeff)。()()表示also.第一个子表达式匹配s然后在前面。第二个(?<=\bJeff)表示先匹配\bJeff，然后找到位置从右往左能找到这个匹配，在f后面。

?<! successful if can not match to left
?!  successful if can not math to right
 a word boundary is a position with \w on one side and not on the other
 (?<!\w)(?=\w) as a start-of-word
 (?<=\w)(?!\w) as an end-of-word boundary.
 lookaround assertions
 (?=regex) followed by the regex. hello(?=lo) hello
 (?<=regex) preceded by the regex.
(?<=\d)(?=(\d\d\d)+) 匹配了234，345.

Unicode, start with U+,eg. U+000A
lazy quantifiers: \w+?.最少匹配。

DFA VS NFA
两种engine.

#### two rules

1. The match that begin earliest(leftmost) Wins
从左边第一个字符前面开始匹配，如果没找到移到第二个字符前面。重复。
2. The Standard Quantifiers are greedy.
quantifiers(*,?,+,{min,max})are greedy.
[^Subject: (.*).*] 因为是greedy,第一个.*会把所有的都匹配了。第二个.*没用。
The only time they settle  for anything less than their maximum is when matching too much
ends causing some later part of the regex to fail.只有当后面的匹配失败的时候，greedy才会减少。
First come, First server原则。
^.*([0-9]+) 匹配 Copyright 2003 $1为3.^.*匹配Copyright 200
## Question
3. "nail the x \"x4\" plank" 如果"不加\会如何
4. \$[0-9]*(\.[0-9][0-9])? 匹配$.49 为毛说没用
5. this <I>short</I> example,只匹配<.*>





