const express = require('express');
const personController = require('./person.controller');

const router = express.Router();

router.get('/count', (req, res, next) => personController.getVaccinedCount(req, res, next));

router.get('/vaccinated', (req, res, next) => personController.getVaccinedPeople(req, res, next));

router.get('/:id/vaccinated', (req, res, next) => personController.personIsVaccinated(req, res, next));

router.get('/', (req, res, next) => personController.getAll(req, res, next));

router.get('/:id', (req, res, next) => personController.getById(req, res, next));

router.post('/', (req, res, next) => personController.create(req, res, next));

router.put('/:id/:vaccine', (req, res, next) => personController.modifyVaccine(req, res, next));

router.put('/', (req, res, next) => personController.update(req, res, next));

router.delete('/:vaccine', (req, res, next) => personController.eraseVaccinatedPeople(req, res, next));

router.delete('/', (req, res, next) => personController.delete(req, res, next));

module.exports = router;
