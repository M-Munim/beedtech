const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await userModel.create({
                username, email, password: hash, age
            });

            let token = jwt.sign({ email }, "secret");
            res.cookie('token', token);
            res.send(user);
        });
    });

})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

app.post('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.send('user not found');

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email }, 'secret');
            res.cookie('token', token);
            res.redirect('/profile');
        } else {
            res.send('wrong password');
        }
    })
})

app.listen(3000)