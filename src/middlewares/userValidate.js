const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('El campo nombre es requerido.'),
    check('color')
        .notEmpty().withMessage('Debes seleccionar un color.'),
    check('email')
        .notEmpty().withMessage('El campo email es requerido.').bail()
        .isEmail().withMessage('Email inválido.'),
    check('age')
        .isInt().withMessage('Se debe ingresar un número.')
];
