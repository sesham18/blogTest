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










