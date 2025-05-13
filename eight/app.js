const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const user = require('./models/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;

    let createdUser = await user.create({
        name,
        email,
        image
    })

    // res.send(createdUser)
    res.redirect('/read')
})

app.get('/read', async (req, res) => {
    let users = await user.find();
    res.render('read', { users })
})

app.get('/edit/:id', async (req, res) => {
    let userToEdit = await user.findOne({ _id: req.params.id });
    res.render('edit', { userToEdit });
})

app.get('/update/:id', async (req, res) => {
    let { name, email, image } = req.body;
    let user = await user.findOneAndUpdate({ _id: req.params.id },
        {
            name,
            email,
            image
        }
    );
    res.redirect('/read')
})

app.get('/delete/:id', async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    res.redirect('/read')
})

app.listen(3000)