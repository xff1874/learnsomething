function Router(){
    this.cache={};
    this.on=function(key,value){
        this.cache[key]=value;
    }

    this.trigger= function(hash){
        var _cache = this.cache;
        for(var r in this.cache){
            var reg = this.initRegex(r);
            if(reg.test(hash)){
                var callback = _cache[r]||function(){};
                var params = this.getParams(reg,hash)//?
                callback.apply(this,params)
            }
        }
    }

    this.init = function(){
        var that = this;
        var changeCb = function(){
            var hash = location.hash.slice(1);
            that.trigger(hash)
        }
        window.addEventListener("hashchange",changeCb);
        window.addEventListener("load",changeCb)
    }

    /**
     * 将cache内的key做正则处理，并返回
     * 第一个正则 匹配入/,.+-?$#{}[]关键字，并在关键字前面加转译字符\
     * 第二个正则匹配(), 表示()内容可有可无
     * 第三个正则匹配：在/后面可以由接受任意字符，直到遇到下一个/
     * 第四个正则 匹配* 在*后面可以接受任意字符
     */

    this.initRegex = function(route){
        route = route.replace(/[/,+\-?$#{}\[\]]/g,'\\$&')
                .replace(/\((.*?)\)/g,"(?:$1)?")
                .replace(/(\/\w?:\w+)+/g,'\/([^/]+)')
                .replace(/\*\w*/g,'([^?]*?)')

        return new RegExp("^" + route + "$")
    }

    //将匹配的正则返回，为毁掉函数提供参数
    this.getParams = function(reg,hash){
        return reg.exec(hash).slice(1)
    }
}