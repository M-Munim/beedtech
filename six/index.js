const express = require('express');
const path = require('path');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/profile/:munim', (req, res) => {
    // res.send(req.params)
    res.send(`welcome ${req.params.munim}`)
})

app.listen(3000)