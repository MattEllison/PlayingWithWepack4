
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ConsoleLogOnBuildWebpackPlugin = require('./build/customplugin')

module.exports = async () => {
    return {
        mode: 'development',
        entry: {
            app: ["./src/index.js"]
        },
        output: {
            filename: '[name].bundle.js'
        },
        plugins: [
            new ConsoleLogOnBuildWebpackPlugin(),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
        stats: 'errors-only',
        module: {
            rules: [

                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [

                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }]
                },
                {
                    test: /\.css$/,
                    use: [

                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        './build/loader.js',
                        'css-loader',
                        'sass-loader'
                    ]
                },


            ]
        }

    }
}