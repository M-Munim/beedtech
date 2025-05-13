const express = require('express');
const jwt = require('jsonwebtoken');
cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    let token = jwt.sign({ name: 'munim' }, 'secret');
    res.cookie('token', token);
    console.log(token)
    res.send('Hello World')
})

app.get('/profile', (req, res) => {
    // console.log(req.cookies.token)
    let result = jwt.verify(req.cookies.token, 'secret');
    console.log(result)
    res.send("user")
})

app.listen(3000)