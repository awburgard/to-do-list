const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const toDoRouter = require('./routes/todoapp.router');

// Acquires body-parser and static files
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

// Defines the name of routes and acquires usage of the router file
app.use('/toDo',toDoRouter);

// Turns on the Port
app.listen(PORT, ()=>{
    console.log('Listening pn Port: ', PORT)
});