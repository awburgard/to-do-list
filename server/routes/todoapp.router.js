const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool');

//GET

//POST
toDoRouter.post('/', (req, res)=>{
    const taskObject = req.body;
    const queryString = `INSERT INTO "todolist" ("task", "completed")
                        VALUES ($1, false);`;

    pool.query(queryString, [taskObject.task])
    .then((response)=>{
        res.sendStatus(201);
    })
    .catch((err)=>{
        console.log('Error saving to DB: ', err);
        res.sendStatus(500);
    })
});

//DELETE

//PUT

module.exports = toDoRouter;