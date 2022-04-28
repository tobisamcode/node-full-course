const fs = require('fs');
const path = require('path');

// it creates the directory if doesn't exist
if (!fs.existsSync(path.join(__dirname, 'files', 'new'))) {
    fs.mkdir(path.join(__dirname, 'files', 'new'), (err) => {
        if (err) throw err;
        console.log('Directory created');
    });
}


// it removes the directory if  exist
if (fs.existsSync(path.join(__dirname, 'files', 'new'))) {
    fs.rmdir(path.join(__dirname, 'files', 'new'), (err) => {
        if (err) throw err;
        console.log('Directory removed');
    });
}