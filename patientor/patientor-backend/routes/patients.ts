import { toNewPatientEntry } from './../util';
import { getPatientEntries, addPatient } from './../services/patientService';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getPatientEntries());
});

router.get('/:id', (req, res) => {
  const patientId = req.params.id;
  const patient = getPatientEntries().find(
    (patient) => patient.id === patientId
  );
  res.json(patient);
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatientEntry = addPatient(toNewPatientEntry(req.body));
    res.json(newPatientEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
