const express = require('express');
// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');

const upload = require('./utils/multer.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Disk Storage

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, uniqueSuffix + '-' + file.originalname)
//     }
// })

// const upload = multer({ storage: storage })



// filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw) {
//         // console.log(raw.toString('hex'));
//         const fn = raw.toString('hex') + path.extname(file.originalname);
//         cb(null, fn)
//     })
// }
// crypto.pseudoRandomBytes(16, function (err, raw) {
//     console.log(raw.toString('hex'));
// })


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})