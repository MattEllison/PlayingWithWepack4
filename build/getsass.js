const glob = require('glob');

const main = async function (src) {
    return new Promise(r => {
        glob(src + '/**/*.test.scss', (err, result) => {
            if (err) {
                console.log('Error', err);
            } else {
                r(result.map(f => `./${f}`));
            }
        });
    });
}

//main();

module.exports = main;