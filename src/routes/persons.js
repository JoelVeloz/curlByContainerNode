// persons.js

const express = require('express');
const router = express.Router();
const db = require('../database');
const exec = require('child_process').exec;


router.get("/all", function (req, res) {
    db.Person.findAll()
        .then(persons => {
            res.status(200).send(JSON.stringify(persons));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:id", function (req, res) {
    const ip = req.params.id;
    const cmd = `curl ${ip}`;
    console.log(cmd);
    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`);
            res.send(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.send(`stdout: ${stdout}`);
    });

});

router.put("/", function (req, res) {
    db.Person.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
    })
        .then(person => {
            res.status(200).send(JSON.stringify(person));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function (req, res) {
    db.Person.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).send();
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
