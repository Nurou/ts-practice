interface Results {
  daysInPeriod: number;
  numberOfDaysTrained: number;
  targetDailyExerciseHrs: number;
  wasTargetMet: boolean;
  averageHrsTrainedDaily: number;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  dailyExerciseHrs: Array<number>,
  targetDailyExerciseHrs: number
): Results => {
  const daysInPeriod: number = dailyExerciseHrs.length;
  const numberOfDaysTrained: number = dailyExerciseHrs.filter(
    (dailyHrs) => dailyHrs != 0
  ).length;

  const averageDailyExerciseHrs: number =
    dailyExerciseHrs.reduce((a, b) => a + b) / daysInPeriod;

  const wasTargetMet: boolean =
    averageDailyExerciseHrs >= targetDailyExerciseHrs ? true : false;

  // ratings
  const difference: number = targetDailyExerciseHrs - averageDailyExerciseHrs;

  let rating = 0;
  let ratingDescription = '';

  if (difference > 1.5) {
    rating = 3;
    ratingDescription = 'flopped';
  }
  if (difference > 1) {
    rating = 2;
    ratingDescription = 'did aight';
  }
  if (difference > 0.5) {
    rating = 1;
    ratingDescription = 'smashed it';
  }

  return {
    daysInPeriod,
    numberOfDaysTrained,
    targetDailyExerciseHrs,
    wasTargetMet,
    averageHrsTrainedDaily: averageDailyExerciseHrs,
    rating,
    ratingDescription,
  };
};

interface ArgumentValues {
  targetHours: number;
  actualHours: number[];
}

const parseArguments = (args: Array<string>): ArgumentValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 20) throw new Error('Too many arguments');

  const otherThanNumber = args.slice(3).find((arg) => isNaN(Number(arg)));

  if (isNaN(Number(args[2])) || otherThanNumber)
    throw new Error('The target value was not a number!');

  const targetHours = Number(args[2]);
  const actualHours = args.slice(3).map(Number);

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

export { calculateExercises as exerciseCalculator };
