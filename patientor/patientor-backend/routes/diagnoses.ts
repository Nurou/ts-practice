import { getDiagnosisEntries } from './../services/diagnosisService';
import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(getDiagnosisEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis');
});

export default router;
