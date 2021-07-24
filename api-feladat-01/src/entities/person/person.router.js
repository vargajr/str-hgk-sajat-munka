const express = require('express');
const personController = require('./person.controller');

const router = express.Router();

router.get('/count', (req, res, next) => personController.getVaccinedCount(req, res, next));

router.get('/vaccinated', (req, res, next) => personController.getVaccinedPeople(req, res, next));

module.exports = router;
