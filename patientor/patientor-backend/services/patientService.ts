import { Patient, PatientNoSns, NewPatientEntry } from './../types';
import { patientEntries } from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

export const getPatientEntries = (): PatientNoSns[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

export const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};
