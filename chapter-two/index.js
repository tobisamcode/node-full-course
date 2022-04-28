const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'));
        console.log(data.toString());
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt')); // to delete

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n Nice to meet you');
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'));
        console.log(newData.toString());
    } catch (err) {
        console.log(err);
    }
}

fileOps();


// to read file 
// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// });

// to write file
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you too', (err) => {
//     if (err) throw err;
//     console.log('write complete');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is', (err) => {
//         if (err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newreply.txt'), (err) => {
//             if (err) throw err;
//             console.log('rename complete');
//         });
//     });

// });



// exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});