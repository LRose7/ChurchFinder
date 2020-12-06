const express = require('express');
const createError = require('http-errors');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require ('path');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();
const models = require('./models');
const config = require('./config/index')[process.env.NODE_ENV || 'development'];
const log = config.log();

const indexRouter = require('./routes/index');
const churchesRouter = require('./routes/churches');
const usersRouter = require('./routes/users');
const db = require('./models');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect(function(err) {
    if (err) {
        log.fatal(err.message);
        return;
    }
    log.info('Yay! You are connected to the database!');
});

models.sequelize.sync().then(function() {
    log.info("DB Sync'd up")
  });

// Create an express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware that prints incoming requests to the servers console
app.use((req, res, next) => {
    log.info(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Configure CORs middleware
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/churches', churchesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });


// Middleware that informs the express application to serve our compiled React files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    // app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    // });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Set the backend port to be either an enviornment variable or port 5000
const port = process.env.PORT || 5000;

// Configure the server to listen on the port defined by the port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));