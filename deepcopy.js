function deepCopy(p,c){
    var c = c||{};
    for(var i in p ){
        if(p.hasOwnProperty(i)){ //只拷贝对象本身的属性
            if(typeof p[i] === "object"){
                c [i] = Array.isArray(p[i])?[]:{}
                deepCopy(p[i],c[i]);
             }else{
                 c[i]=p[i];
             }
        }
       
    }
    return c;
}



var parent = {
    numbers:[1,2,3],
    obj:{
        props:1
    },
    getNumber:function(){
        return this.numbers;
    },
    bool:true
}

var mydeep = deepCopy(parent);
console.log(mydeep.numbers.push(4,5,6));
console.log(mydeep)
mydeep.getNumber=function(){
    return "2"
};
console.log(parent.getNumber())

1.hasOwnProperty 去掉杂志，只拷贝对象本身
2.Object.prototype.toString.call(candidate) == "[object Array]"