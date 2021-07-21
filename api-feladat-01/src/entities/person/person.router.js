const express = require('express');
const personController = require('./person.controller');

const router = express.Router();

router.get('/count', (req, res) => personController.getVaccinedCount(req, res));

router.get('/vaccinated', (req, res) => personController.getVaccinedPeople(req, res));

module.exports = router;
