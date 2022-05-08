const express = require('express');
const path = require('path');
const logEvents = require('./middleware/logEvents');
const app = express();
const PORT = process.env.PORT || 3500;


// custom middleware logger
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
})


// built-in middleware  to handle urlencoded data
// in other words, form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
})


// Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log("attempted to load hello.html");
    next()
}, (req, res) => {
    res.send("Hello World!")
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));