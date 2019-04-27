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

module.exports = ConsoleLogOnBuildWebpackPlugin;