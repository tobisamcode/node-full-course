const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


const logEvents = require('./logEvents');
const EventEmitter = require('events');
// class MyEmitter extends EventEmitter {};

// // initialize object
// const myEmitter = new MyEmitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extension(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }


    // let path;

    // switch (req.url) {
    //     case '/':
    //         res.statusCode = 200;
    //         path = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(path, 'utf-8', (err, data) => {
    //             res.end(data);
    //         });
    //         break
    // }

});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
myEmitter.on('log', (msg) => logEvents(msg));

myEmitter.emit('log', 'Log event emitted!')
*/