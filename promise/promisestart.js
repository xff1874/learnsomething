var promise = {
    okCallbacks:[],
    koCallbacks:[],
    then:function(okCallback,koCallback){
        okCallbacks.push(okCallback);
        if(koCallback){
            koCallbacks.push(koCallback)
        }
    }
}

var defer = {
    promise:promise,
    resolve:function(data){
        this.promise.okCallbacks.forEach(function(callback){
            setTimeout(function(){
                callback(data)
            },0)
        })
    },
    reject:function(error){
        this.promise.koCallbacks.forEach(function(callback){
            setTimeout(function(){
                callback(error)
            },0)
        })
    }
}