const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, 'files', 'new'))) {
    fs.mkdir(path.join(__dirname, 'files', 'new'), (err) => {
        if (err) throw err;
        console.log('Directory created');
    });
}

if (fs.existsSync(path.join(__dirname, 'files', 'new'))) {
    fs.rmdir(path.join(__dirname, 'files', 'new'), (err) => {
        if (err) throw err;
        console.log('Directory removed');
    });
}