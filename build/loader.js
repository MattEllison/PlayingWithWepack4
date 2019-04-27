const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

const extractTheme = async function (source) {
    const callback = this.async();
    const thisFile = this.resourcePath;
    const thisDirectory = path.dirname(thisFile);
    const thisFileName = path.basename(thisFile);
    const f = thisFileName.split('.')

    const themeFilePattern = `${thisDirectory}/${f[0]}.*.${f[1]}`
    glob(themeFilePattern, null, async (err, files) => {
        if (files.length > 0) {
            var themeFile = files[0];
            const newFile = `./dist/app.${themeFile.split('.')[1]}.scss`;
            await fs.ensureFile(newFile);
            var contents = await fs.readFile(themeFile, 'utf8');
            await fs.appendFile(newFile, contents);
            callback(null, source);
        }
        else {
            callback(null, source);
        }

    });

}


module.exports = extractTheme;