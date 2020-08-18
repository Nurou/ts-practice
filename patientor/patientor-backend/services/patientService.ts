import { PatientNoSns } from './../types';
import patientData from '../data/patients.json';

export const getPatientEntries = (): PatientNoSns[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
