import express = require('express');

import { bmiCalculator } from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => res.send('Hello FS!'));

app.get('/bmi', (req, res) => {
  // validate query params
  if (!req.query.height || !req.query.weight) {
    res.status(422);
    throw new Error('parameters missing');
  }
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(422);
    throw new Error('malformatted parameters');
  }

  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  const bmi = bmiCalculator(height, weight);
  res.send(bmi);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
