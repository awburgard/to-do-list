const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool');

//GET
toDoRouter.get('/', (req, res) => {
    const queryString = `SELECT * FROM "todolist";`;
    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
})


//POST
toDoRouter.post('/', (req, res) => {
    const taskObject = req.body;
    const queryString = `INSERT INTO "todolist" ("task", "completed")
                        VALUES ($1, false);`;

    pool.query(queryString, [taskObject.task])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error saving to DB: ', err);
            res.sendStatus(500);
        })
});

//DELETE
toDoRouter.delete('/delete/:id', (req, res) => {
    const queryString = `DELETE FROM "todolist" WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting: ', err);
        });
});

//PUT
toDoRouter.put('/completed/:id', (req,res)=>{
    const queryString = `UPDATE "todolist" SET "completed" = true WHERE id=$1;`;

    pool.query(queryString, [req.params.id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting from database: ', err);
            res.sendStatus(500);
        });
});

module.exports = toDoRouter;