const { validationResult } = require('express-validator');

const controller = {
    index: (req, res, next) => {
        res.render('index');
    },
    processIndex: (req, res, next) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {

            const { name, color, email, age } = req.body;

            req.session.bgColor = color;
            res.locals.bgColor = color;

            req.session.userName = name;

            if (req.body.recordar !== undefined) {
                res.cookie('color', color, {maxAge: 60*1000})
            }

            res.render('index', {name, color, email, age})

        } else {

            res.render('index',  {errors: errors.mapped(), old: req.body})

        }
    },
    user: (req, res, next) => {
        res.locals.bgColor = req.session.bgColor;
        res.render('user', {userName: req.session.userName})
    },
    destroy: (req, res, next) => {
        req.session.destroy();
        res.cookie('color', null, {maxAge: -1});
        res.redirect('/');
    }
};

module.exports = controller;
