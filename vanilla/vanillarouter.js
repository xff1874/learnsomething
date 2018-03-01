var Router = {
    routes:[],
    mode:null,//hash or history
    root:"/",
    config:function(options){
        this.mode = options && options.mode && options.mode == 'history'&& !!(history.pushState)?"history":"hash";
        this.root = options&&options.root?"/"+this.clearSlash(options.root)+"/":"/";
        return this;
    },
    getFragment:function(){
        var fragment = "";
        if(this.mode === "history"){
            fragment = this.clearSlashes(decodeURI(location.pathname+location.search));
            fragment = fragment.replace(/\?(.*)$/,'');
            fragment = this.root !='/'?fragment.replace(this.root,''):fragment;
        }else{
            var match = window.location.href.match(/#(.*)$/);
            fragment = match?match[1]:""
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes(path){
        return path.toString().replace(/\/$/,'').replace(/^\//,'')
    },
    add(re,handler){
        if(typeof re == 'function'){
            handler = re;
            re= ""
        }
        this.routes.push({re,handler})
        return this;
    },
    remove(param){
        for(var i=0,r;i<this.routes.length,r= this.routes[i];i++){
            if(r.handler === param || r.re.toString() === prama.toString()){
                this.routes.splice(i,1);
                return this;
            }
        }
        return this;
    },
    flush:function(){
        this.routes = [];
        this.mode = null;
        this.root = "/";
        return this;
    },
    check:function(f){
        var fragment = f || this.getFragment();
        for(var i=0;i<this.routes.length;i++){
            var match = fragment.match(this.routes[i].re);
            if(match){
                match.shift();
                this.routes[i].handler.apply({},match);
                return this;
            }
        }
        return this;
    },
    listen:function(){
        var self = this;
        var current = self.getFragment();
        var fn = function(){
            if(current != self.getFragment()){
                current = self.getFragment();
                self.check(current)
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn,50);
        return this;
    },
    navigate:function(path){
        path = path?path:"";
        if(this.mode == "history"){
            // history.pushState(null,null,this.root+this.clearSlashes(path))
            history.pushState('','',this.clearSlashes(path))
        }else{
            window.location.href= window.location.href.replace(/#(.*)$/,'')+"#"+path;
        }
        return this;
    }

}

Router.config({mode:"history"});
Router.navigate();
Router.add(/about/,()=>console.log("about"));
Router.add(/products\/(.*)\/edit\/(.*)/,function(){
    console.log("products",arguments)
})
Router.add(()=>console.log("default"));
Router.check("/products/12/edit/22");
Router.listen();
Router.navigate("/about")
// Route.add(/about/,function(){
//     alert("about")
// }).add(/products\/(.*)/edit\/(.*)/,function(){
//     console.log('products',arguments)
// }).add(function(){
//     console.log("default");
// })