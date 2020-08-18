import { Diagnosis } from '../types';
import diagnosisData from '../data/diagnoses.json';

export const getDiagnosisEntries = (): Diagnosis[] => {
  return diagnosisData;
};
