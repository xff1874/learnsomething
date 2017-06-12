var style = {
    opacity: this.state.fadeAnim,
    transform: [{
        trasnlateY: this.state.fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 0]
        })
    }]
}
//  角度
this.state.fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
})

Animate.timing(option, {
    useNativeDriver: true, // <-- Add this 
})

if (Platform.OS == "android") {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

LayoutAnimation.spring();

LayoutAnimation 在setState() 之前调用即可
