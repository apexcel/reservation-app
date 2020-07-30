const path = require('path');
const fs = require('fs');
const template = require("./template/template");

// const today = "" + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
// const file = path.resolve(__dirname, `${today}.js`);

function fileCheck(filepath) {
    fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.error(`${filepath} ${err.code === 'ENOENT' ? 'Not Exist' : 'is READ ONLY'}`);
            // create file
            if (err.code === 'ENOENT') {
                fs.readFileSync(filepath, { flag: 'a+' }, (err) => {
                    if (err) throw err;
                })
            }
        }
        // file exists
        fs.writeFileSync(filepath, JSON.stringify(template), { flag: 'w' }, (err) => {
            if (err) throw err;
        })
    })
}

module.exports = fileCheck;