// Create a web server
// 1. GET /comments
//    return all comments
// 2. POST /comments
//    create a new comment
// 3. GET /comments/:id
//    return a comment with given id
// 4. PUT /comments/:id
//    update a comment with given id
// 5. DELETE /comments/:id
//    delete a comment with given id

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = 3000;

var comments = [];
var commentNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Comment API Root');
});

// GET /comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id, 10);
  var matchedComment = _.findWhere(comments, {id: commentId});

  if (matchedComment) {
    res.json(matchedComment);
  } else {
    res.status(404).send();
  }
});

// POST /comments
app.post('/comments', function(req, res) {
  var body = _.pick(req.body, 'author', 'text');

  if (!_.isString(body.author) || !_.isString(body.text) || body.author.trim().length === 0 || body.text.trim().length === 0) {
    return res.status(400).send();
  }

  body.author = body.author.trim();
  body.text = body.text.trim();

  body.id = commentNextId++;
  comments.push(body);
  res.json(body);
});

// DELETE /comments/:id
app.delete('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id, 10);
  var matchedComment = _.findWhere(comments, {id: commentId});

  if (!matchedComment) {
    res.status(404).json({"error": "no comment found with that id"});
  } else {
    comments = _.without(comments, matchedComment);
    res.json(matchedComment);
  }
});

// PUT /comments/:id
app.put('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params