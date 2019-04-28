
const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ConsoleLogOnBuildWebpackPlugin = require('./build/customplugin')
var sass = require('node-sass');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const filewatcherPlugin = require("filewatcher-webpack-plugin");

glob('src/**/*.test.scss', async (err, result) => {
    if (err) {
        console.log('Error', err);
    } else {
        sass.render({
            file: './dist/app.test.scss',
            outFile: 'app.test.css'
        }, function (err, result) {

            //fs.writeFile('./dist/app.test.css', result)
        });

    }
});

module.exports = async () => {
    return {
        mode: 'development',
        watch: true,
        entry: {
            app: ["./src/index.js"]
        },
        output: {
            filename: '[name].bundle.js'
        },
        plugins: [
            new CleanWebpackPlugin(),


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