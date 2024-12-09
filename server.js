/********************************************************************************
* WEB322 – Assignment 06
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Smriti Chaudhary Student ID: 159469220 Date: 8th December,024
*
* Published URL:
*
********************************************************************************/

const express = require('express');
const path = require('path');
const session = require('express-session');
const authService = require('./services/auth-service');
const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Custom Middleware for session user
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


app.get('/', (req, res) => {
    res.render('index', { page: '/' });
});

app.get('/register', (req, res) => {
    res.render('register', { errorMessage: null, successMessage: null });
});

app.post('/register', (req, res) => {
    authService.registerUser(req.body).then(() => {
        res.render('register', { errorMessage: null, successMessage: 'Registration successful!' });
    }).catch(err => {
        res.render('register', { errorMessage: err, successMessage: null });
    });
});

app.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});

app.post('/login', (req, res) => {
    authService.checkUser(req.body).then(user => {
        req.session.user = user;
        res.redirect('/');
    }).catch(err => {
        res.render('login', { errorMessage: err });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.get('/solutions/addProject', (req, res) => {
    if (req.session.user) {
        res.render('project', { page: '/solutions/addProject' });
    } else {
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
