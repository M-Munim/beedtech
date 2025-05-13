// EXPRESS JS

// a npm pkg, and is framework
// framework gives u flow and u have to follow it to make a server
// library is a collection of modules/ tools
// manages everything from receiving requests to sending responses

// ------------------------------

// to install express -> npm i express

// from npm js -> https://www.npmjs.com/package/express
const express = require('express');

const app = express()

// jitni bhi req aay server us sy pehly isko chalao 
app.use(function (req, res, next) {
    console.log('Middleware')
    next()
})

// app.get('url', function/requesthandler)
app.get('/', (req, res) => {
    res.send('Hello World')
})

// error handler
app.use((req, res) => {
    res.status(404).send('Not Found')
})

app.listen(3000)

// node script.js
// npm i nodemon -g ----------> nodemon script.js
// or npx nodemon script.js

// ------------------------------

// MIDDLEWARE

// jb server req accept krta hy waha sy route tk pohanchny tk agar wo req beech my rok k kui operation perform krna hy to middleware use krna hy