const express = require('express');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const socketio=require('socket.io');


const app = express();
const port = 3000;

const server = http.createServer(app); 
const io=socketio(server)


module.exports.io = io;

io.on('connection', socket => {
    console.log("nv mec connecte");
    socket.on('mi-temps', () => {
        console.log("Mi-temps event emitted");
        socket.broadcast.emit('mi-temps');
    });
    socket.on('start', () => {
        console.log("debut de match");
        socket.broadcast.emit('start');
    });
   
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('server'));
app.use('/images', express.static(path.join(__dirname, 'server', 'images')));

// Express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}));

// Flash Messages 
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(expressLayouts);
app.set('layout', './layouts/mainGestionnaire');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/gestionnaire'));
app.use('/', require('./server/routes/admin'));
app.use('/', require('./server/routes/visiteur'));
app.use('/', require('./server/routes/login.JS'));

// handle 404 
app.get('*', (req, res) => {
    res.status(404).send('<h1>Erreur 404 : Page Introuvable</h1>');
});





server.listen(port, () => {
    console.log("Server listening on port " + port);
});

module.exports = io;