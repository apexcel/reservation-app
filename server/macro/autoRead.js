const path = require('path');
const fs = require('fs');

const autoCreate = require('./autoCreate')
const today = "" + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate();
const file = path.resolve(__dirname, `${today}.js`);
autoCreate(file)

function getFile(filename) {
    filepath = path.resolve(__dirname, filename);
    console.log(filename);

    fs.readFile(filepath, (err, filedata) => {
        if (err) throw err;

        let calledFile = JSON.parse(filedata);
        calledFile[0].name1 = "first";
        console.log(calledFile);

        fs.writeFile(filename, JSON.stringify(calledFile), (err) => {
            if (err) throw err;
        });
    });
}

getFile('2020730.js')