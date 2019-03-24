const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {BlogPosts} = require('./model');

BlogPosts.create('Harry Potter', 'A boy discovers he is a wizard', 'JK Rowling'); 
BlogPosts.create('Emma','A wealthy girl plays matchmaker', 'Jane Austen'); 

app.get('/', (req, res) => {
 res.json(BlogPosts.get());
});

app.post('/', jsonParser, (req, res) => {
 const requiredFields = ['title', 'content', 'author'];
 for (let i=0; i<requiredFields.length; i++) {
   const field = requiredFields[i];
   if (!(field in req.body)) {
     const message = `Missing \`${field}\` in request body`
     console.error(message);
     return res.status(400).send(message);
   }
 }
 const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
 res.status(201).json(item);
});

app.put('/:id', jsonParser, (req, res) => {
 const requiredFields = ['title', 'content', 'author', 'id'];
 for (let i=0; i<requiredFields.length; i++) {
   const field = requiredFields[i];
   if (!(field in req.body)) {
     const message = `Missing \`${field}\` in request body`
     console.error(message);
     return res.status(400).send(message);
   }
 }

 if (req.params.id !== req.body.id) {
   const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
   console.error(message);
   return res.status(400).send(message);
 }
 console.log(`Updating blog post item \`${req.params.id}\``);
 ShoppingList.update({
   id: req.params.id,
   title: req.body.title,
   content: req.body.content, 
   author: req.body.author,
 });
 res.status(204).end();
});

app.delete('/:id', (req, res) => {
 BlogPosts.delete(req.params.id);
 console.log(`Deleted shopping list item \`${req.params.ID}\``);
 res.status(204).end();
});

module.exports = router;
