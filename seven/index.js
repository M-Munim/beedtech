const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { isUtf8 } = require('buffer');

app.set('view engine', "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir("./files", (err, file) => {
        res.render("index.ejs", { files: file });
        console.log(file)
    })
})

app.post('/create', (req, res) => {
    fs.writeFileSync(`./files/${req.body.title.split(' ').join('-')}.txt`, req.body.description);
    res.redirect('/');
})

app.get('/files/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
        res.render("read.ejs", { filename: req.params.filename, description: data });
    })
})

app.get('/edit/:filename', (req, res) => {
    res.render("edit.ejs", { filename: req.params.filename });
})

app.post('/edit', (req, res) => {
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new.split(' ').join('-')}.txt`, () => {
        res.redirect('/');
    })

})

app.listen(3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`)
});