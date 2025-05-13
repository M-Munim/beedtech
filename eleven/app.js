const express = require('express');

const app = express();
const userModel = require('./models/userModel');
const PostModel = require('./models/userPosts');

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username: 'munim',
        email: 'v8hTJ@example.com',
        age: '33'
    })
    res.send(user)
})

app.get('/post/create', async (req, res) => {
    let post = await PostModel.create({
        postdata: 'post title',
        // user: userIdHere
    })

    let user = await userModel.findOne({ _id: "097897" });
    user.posts.push(post._id);
    await user.save();
    res.send({
        post,
        user
    })
})

app.listen(3000)