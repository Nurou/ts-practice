/**
 * BMI = weight[kg] / [height(m)]^2
 * @param weight kg
 * @param height cm
 */
const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(Number(weight)) || isNaN(Number(height)))
    throw new Error("Please provide numbers only.");

  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 0 || bmi > 70) {
    throw new Error("Problem in calculating BMI.");
  }

  if (bmi < 15) return "Very severely underweight";
  if (bmi < 16) return "Severely underweight";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese Class I (Moderately obese)";
  if (bmi < 40) return "Obese Class II (Severely obese)";
  if (bmi > 40) return "Obese Class III (Very severely obese)";
};

try {
  console.log(calculateBmi(186, 130));
} catch (error) {
  console.log(error);
}
