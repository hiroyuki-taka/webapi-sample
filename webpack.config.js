const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    console.log('env', env)

    return {
        mode: 'development',
        devtool: 'source-map',
        entry: {
            'index': './src/scripts/index.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/')
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: (entryName => `${entryName}.html`),
                template: path.resolve(__dirname, "src/index.ejs")
            })
        ],
        module: {
            rules: [
                {test: /\.ts$/, use: [{loader: 'ts-loader'}]},
                {test: /\.css$/, use: [{loader: "style-loader"}, {loader: "css-loader"}]}
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        }
    }
}