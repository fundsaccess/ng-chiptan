const path = require('path');

module.exports = {
    entry: './src/app/app.js',
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'src')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                exclude: path.resolve('./src/index.html'),
                use: ['html-loader']
            },
            {
                test: /\.js$/i,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
