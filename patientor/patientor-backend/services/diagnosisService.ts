import { Diagnosis } from '../types';
import diagnosisData from '../data/diagnoses';

export const getDiagnosisEntries = (): Diagnosis[] => {
  return diagnosisData;
};
