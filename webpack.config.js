var InjectHtmlPlugin = require('inject-html-webpack-plugin')


module.exports = {
    entry: './deepclone.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '.'
    },
    output: {
        library: "jStore",
        libraryTarget: "umd",
        filename: '[chunkhash].bundle.js',
        auxiliaryComment: {
            root: "Root Comment",
            commonjs: "CommonJS comment",
            commonjs2: "CommonJS2 Comment",
            amd: "AMD Comment"
        }
    },
    plugins: [new InjectHtmlPlugin({
        filename: 'css2.ftl',
        chunks: ['main'],
        customInject: [{
            start: '<!-- start:js -->',
            end: '<!-- end:js-->'
        }]
    })]
};