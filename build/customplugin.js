const glob = require('glob');
const { resolve } = require('path');
const fs = require('fs-extra');
class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.watchRun.tap('matts', (c) => {
            console.log('watching', c)
        })
        compiler.hooks.afterCompile.tap('matts', compilation => {
            glob('src/**/*.*.scss', null, async (err, files) => {
                files.forEach(async (f) => {
                    //console.log('adding file', f);
                    //console.log(f.replace('.test', ''))
                    //const mainStlye = f.replace('.test', '');
                    //var contents = await fs.readFile('./' + mainStlye, 'utf8');
                    //console.log('got cont', contents);
                    //fs.remove(mainStlye)
                    //fs.writeFile(mainStlye, contents);
                    compilation.fileDependencies.add(resolve(f));

                });

            });

        })
        // compiler.hooks.run.tap('matts', compilation => {
        //     console.log('The webpack build process is starting!!!');
        // });
        // compiler.hooks.emit.tap('matts', c => {
        //     console.log('emiiting')
        // })
        // compiler.hooks.normalModuleFactory.tap('matts', factory => {
        //     factory.hooks.parser.for('javascript/auto').tap('MyPlugin', (parser, options) => {
        //         console.log('in here')
        //         //parser.hooks.someHook.tap(/* ... */);
        //     });
        // });

    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;