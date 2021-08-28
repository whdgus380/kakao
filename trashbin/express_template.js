//미들웨어 사용
const express = require('express');
const app = express();
const port = 3000;
const db = require('./lib/mysql');
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var bodyParser = require('body-parser');
const { request } = require('https');
var compression = require('compression');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

/*
app.get("/page/:pageId/:chapterId", (req, res) => {
   res.send(req.params);
 });
 */

//express가 제공하는 route 방식.
app.get('/', (req, res) => {
    db.query(`SELECT * FROM TOPIC`, function (err, topics) {
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
        res.send(html);
    });
});
app.get('/page/:pageId', (req, res) => {
    db.query(`SELECT * FROM TOPIC`, function (err, topics) {
        db.query(`SELECT * FROM TOPIC WHERE id = ${req.params.pageId}`, function (err, topic) {
            var title = topic[0].title;
            var desc = topic[0].description;
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `<h2>${title}</h2>${desc}`,
                ` <a href="/create">create</a>
                      <a href="/update/${req.params.pageId}">update</a>
                      <form action="/delete_process" method="post">
                        <input type="hidden" name="id" value="${req.params.pageId}">
                        <input type="submit" value="delete">
                      </form>`
            );
            res.send(html);
        });
    });
});

app.get('/create', (req, res) => {
    db.query(`SELECT * FROM TOPIC`, function (err, topics) {
        var title = 'create';
        var list = template.list(topics);
        var html = template.HTML(
            title,
            list,
            `
              <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
            `,
            ''
        );
        res.send(html);
    });
});
// /create_process 를 그냥 /create로 하기도 함 , 접근방식이 get이면 위의것이, post면 아래가 출력
app.post('/create_process', (req, res) => {
    var post = req.body;
    console.log(post);
    db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?,?,now(),?)`, [post.title, post.description, 1], function (error, results) {
        if (error) throw 'create_process req wrong';
        res.redirect(`/page/${results.insertId}`);
    });
});

app.get('/update/:pageId', (req, res) => {
    db.query(`SELECT * FROM TOPIC`, function (err, topics) {
        if (err) throw 'get->err wrong';
        db.query(`SELECT * FROM TOPIC WHERE id =${req.params.pageId}`, function (err1, topic) {
            if (err) throw 'get->err2 wrong';

            var title = 'update';
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `
                  <form action="/update_process" method="post">
                    <p><input type="text" name="title" placeholder="title" value ="${topic[0].title}"></p>
                    <input type = "hidden" name = "id" value="${req.params.pageId}">
                    <p>
                      <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                    </p>
                    <p>
                      <input type="submit">
                    </p>
                  </form>
                `,
                ''
            );
            res.send(html);
        });
    });
});

app.post('/update_process', (req, res) => {
    var post = req.body;
    db.query(`UPDATE topic SET  description=?, title =? WHERE id=?`, [post.description, post.title, post.id], (err, topic) => {
        if (err) throw 'update_process error';
        res.redirect(`/page/${post.id}`);
    });
});

app.post(`/delete_process`, (req, res) => {
    var post = req.body;
    db.query(`DELETE FROM topic WHERE id = ?`, [post.id], res.redirect(`/`));
});
app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
});
