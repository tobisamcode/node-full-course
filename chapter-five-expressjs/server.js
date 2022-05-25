const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
    // const { callbackify } = require('util');
const app = express();
const PORT = process.env.PORT || 3500;


// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware  to handle urlencoded data
// in other words, form data
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


// using the routes
app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/employees', require('./routes/api/employees'));

// app.use('/')
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not found" });
    } else {
        res.type('txt').send("404 Not found");
    }
})

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));