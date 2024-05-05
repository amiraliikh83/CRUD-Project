

// CRUD project



const express = require('express')
const app = express();
const { check, validationResult } = require('express-validator');

let users = require('./users');

global.config = require('./config')


app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.status(200).json({
        data: users,
        success: true
    });
});

app.get('/:id', function (req, res) {
    let user = users.find(user => {
        if (user.id == req.params.id) {
            return user;
        }
    });
    res.status(200).json({
        data: user,
        success: true
    });
});

app.post('/', [
    check('email', 'format nadorost').isEmail(),
    check('password', 'ramz na amn ast').isLength({ min: 5 })],
    function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })

        }
        req.body.id = parseInt(req.body.id)
        users.push(req.body);
        res.json({
            data: 'created',
            success: true
        })
    });

app.put('/:id', (req, res) => {
    users = users.map(user => {
        if (user.id == req.params.id) {
            return req.body;
        } else {
            return user;
        }
    })
    res.json({
        data: 'added',
        success: true
    })
})

app.delete('/:id', (req, res) => {
    users = users.filter(user => {
        if (user.id != req.params.id) {
            return user;
        }
    })
    res.json({
        data: 'Deleted',
        success: true
    })
})

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
})