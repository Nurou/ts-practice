import express = require('express');

import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
const PORT = 3003;

const allNumbers = (arr: Array<number>): boolean => {
  if (arr.find((el) => isNaN(el))) return false;
  return true;
};

// parses the JSON in the request body
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { dailyExerciseData, target }: any = req.body;

  if (!dailyExerciseData || !target) {
    res.status(400).json({
      error: 'Parameters missing',
    });
  }
  if (
    isNaN(Number(target)) ||
    !Array.isArray(dailyExerciseData) ||
    !allNumbers
  ) {
    return res.status(400).json({
      error: 'Malformatted parameters',
    });
  }

  res.json(exerciseCalculator(dailyExerciseData, target));

  return true;
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
