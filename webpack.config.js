
const path = require('path');
const glob = require('./build/getsass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('matts', compilation => {
            console.log('The webpack build process is starting!!!');
        });
        compiler.hooks.emit.tap('matts', c => {
            console.log('emiiting')
        })
        compiler.hooks.normalModuleFactory.tap('matts', factory => {
            factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
                console.log('in here')
                //parser.hooks.someHook.tap(/* ... */);
            });
        });

    }
}


module.exports = async () => {


    //    var files = await glob('src');

    //console.log(files)
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
                        './loader.js',
                        'css-loader',
                        'sass-loader'
                    ]
                },


            ]
        }

    }
}