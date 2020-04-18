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

interface ExerciseData {
  targetHours: number;
  actualHours: number[];
}

const parseArguments = (args: Array<string>): ExerciseData => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 20) throw new Error("Too many arguments");

  let otherThanNumber = args.slice(3).find((arg) => isNaN(Number(arg)));

  if (isNaN(Number(args[2])) || otherThanNumber)
    throw new Error("The target value was not a number!");

  let targetHours = Number(args[2]);
  console.log("💩: targetHours", targetHours);
  let actualHours = args.slice(3).map(Number);
  console.log("💩: actualHours", actualHours);

  return {
    targetHours,
    actualHours,
  };
};

try {
  const { actualHours, targetHours } = parseArguments(process.argv);
  console.log(calculateExercises(actualHours, targetHours));
} catch (error) {
  console.log(error);
}
