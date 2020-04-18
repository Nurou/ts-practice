interface results {
  periodLength: number;
  trainingDays: number;
  success: false;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  actualDailyExerciseHrs: Array<number>,
  targetDailyExerciseHrs: number
) => {
  let periodLength: number = actualDailyExerciseHrs.length;
  let trainingDays: number = actualDailyExerciseHrs.filter(
    (dailyHrs) => dailyHrs != 0
  ).length;

  let averageDailyExerciseHrs: number =
    actualDailyExerciseHrs.reduce((a, b) => a + b) / periodLength;

  let isTargetMet: boolean =
    averageDailyExerciseHrs >= targetDailyExerciseHrs ? true : false;

  // rating
  let difference: number = targetDailyExerciseHrs - averageDailyExerciseHrs;
  let rating: number = 1;

  if (difference > 1.5) rating = 3;
  if (difference > 1) rating = 2;
  if (difference > 0.5) rating = 1;

  let ratings = {
    1: "smashed it",
    2: "did aight",
    3: "flopped",
  };

  return {
    periodLength,
    trainingDays,
    success: isTargetMet,
    ratingDescription: ratings[rating],
    target: targetDailyExerciseHrs,
    average: averageDailyExerciseHrs,
  };
};

let targetHours: number = Number(process.argv[2]);
let actualHours: number[] = process.argv.slice(3).map(Number);

console.log(calculateExercises(actualHours, targetHours));
