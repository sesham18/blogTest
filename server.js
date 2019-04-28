const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const blogPostRouter = require('./blogPostsRouter');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public')); 

app.use('/blog-posts', blogPostsRouter);

app.listen(process.env.PORT || 8080, () => {
 console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});



let server; 

function runServer() {
 const port = process.env.PORT || 8080; 
 return new Promise ((resolve, reject) => {
  server = app 
   .listen(port, () => {
    console.log(`Your app is listening ${port}`);
    resolve(server);
   })
   .on("error", err =>{
    reject(err);
   });
 });
}

function closeServer() {
 return new Promise((resolve, reject) => {
  server.close(err => {
   if(err){
    reject(err);
    return;
   }
   resolve;
  });
 });
}
module.exports = { app, runServer, closeServer};


