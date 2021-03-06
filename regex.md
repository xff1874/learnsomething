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

NFA VS DFA
NFA:regex-directed.用正则匹配文本。
DFA:text-directed.用文本匹配正则。

Two important Points to Backtracking
1. when facing multiple choice, which choice should be tried first?
2. when face to backtrack, which saved choice should be used.

a. In a situations where the decision is between "make an attempt" and "skip an attempt",as with items governed by quantifiers,the engine always choose to first make the attempt for greedy quantifiers, and to first skip the attempt
for lazy(no-greedy) ones.
b. The most recently saved options is the one returned to when a local failure forces backtracking.LIFO(last in first out)

<B>((?!<B>).)*?<\/B> 匹配<B>xxxx<B>ttt</B>

atomic group?有点像only
an aomic group is group that, when the regex engine exits from it, automatically throws away all backtracking
positions remembered by any tokens inside the group.(?>group)
possessive quantifiers?
?+,*+,++,{m,n}+ 有点（?>group）only的意思。throw away backtracking.

DFA VS NFA
1. DFA text.longtest match
2. NFA regex. backtracking. non-lazy

正则表达式是匹配，要么匹配字符要么匹配位置。不是字符串，是字符。
/ab{2,5}c/g {2,5}指数量。g全局匹配，如果不加，只会匹配第一个满足条件
abc,abbc,abbbc //只会匹配abbc

范围- [1-6]表示123456，而不用123456
排除某个范围 [^a-z],前面添加^
匹配任意字符[\d\D],[\w\W],[^], .*
量词后面添加？惰性表示尽量可能少。5种
{n,m}?
{n,}? ={n}
*? 匹配0
?? 匹配0
+? 只匹配一个

```
 #ffbbad
  #Fc01DF
  #FFF
  #ffE
```
我写的#[fF](\w{5}|\w{2})
|如果有条规则匹配成功，就不会继续。所以\w{2}|\w{5}对于Fc01DF只会匹配fc01
答案：#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})

ex:
```
23:59 02:07
```
[01][1-9]|2[0-3]:[0-5][1-9]
根据4个数为来判断。

<div id="container" class="main"></div>
id=".*?"/g 通过？惰性来判断。
优化id="[^"]*

位置6个
^$\b\B ?= ?!

^,$行的开始结束
\b,值得是\w,\W,\w与^,\w与$交接的位置。
(?=p)表示位置满足p表示式的前面。
(?!p)表示不是这个表达式之前的位置。取反比较合适
?<=p 表示符合这个表示式之后的位置
?<!p 取反

位置就是空字符。
\B(?=(\d{3})+\b)
123456789








## Question
3. "nail the x \"x4\" plank" 如果"不加\会如何
4. \$[0-9]*(\.[0-9][0-9])? 匹配$.49 为毛说没用
5. this <I>short</I> example,只匹配<.*>





