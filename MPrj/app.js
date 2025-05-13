const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const useModel = require('./models/user.js');
const postModel = require('./models/post.js');

const app = express();
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/register', async (req, res) => {
    let { name, email, password, username, age } = req.body;

    let user = await useModel.findOne({ email });
    if (user) {
        return res.status(400).send('User already exists');
    }

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            let user = await useModel.create({
                name, email, password: hash, username, age
            });
            // res.send(user);
            let token = jwt.sign({ email, userid: user._id }, 'secret');
            res.cookie('token', token, { httpOnly: true });

            res.send('registered');
        })
    })
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await useModel.findOne({ email });
    if (!user) {
        res.status(400);
        res.send('user does not exist');
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email, userid: user._id }, 'secret');
            res.cookie('token', token, { httpOnly: true });
            res.status(200).redirect('/profile');
        } else {
            res.redirect('/login');
        }
    })
})

app.get('/logout', (req, res) => {
    // res.clearCookie('token');
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/');
})

app.get('/profile', isLoggedIn, async (req, res) => {
    let data = await useModel.findOne({ email: req.user.email }).populate('posts');
    res.render('profile', { data }
    );
})

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await useModel.findOne({ email: req.user.email });
    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content,
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');

})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user');


    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);
    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect('/profile');

    // res.send('hello')
})

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user');

    res.render('edit', { post }); 
})

app.post('/update/:id', isLoggedIn, async (req, res) => {
    let { content } = req.body;
    let post = await postModel.findOne({ _id: req.params.id });
    post.content = content;
    await post.save();
    res.redirect('/profile');
})

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect("/login");
    }

    try {
        const result = jwt.verify(token, 'secret');
        req.user = result;
        next();
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
}


app.listen(3000)