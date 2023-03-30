const express = require('express');

// ...

const app = express();

app.use(express.json());

const loginRoute = require('./routes/login.routes');
const categoryRoute = require('./routes/category.routes');
const postRoute = require('./routes/post.routes');
const userRoute = require('./routes/user.routes');

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/categories', categoryRoute);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
