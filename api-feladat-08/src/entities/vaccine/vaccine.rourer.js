const express = require('express');
const vaccineController = require('./vaccine.controller');

const router = express.Router();

router.post('/', (req, res, next) => vaccineController.create(req, res, next));

router.get('/', (req, res, next) => vaccineController.getAll(req, res, next));

router.get('/:id', (req, res, next) => vaccineController.getOneById(req, res, next));

router.put('/:id', (req, res, next) => vaccineController.update(req, res, next));

router.delete('/:id', (req, res, next) => vaccineController.delete(req, res, next));

module.exports = router;
