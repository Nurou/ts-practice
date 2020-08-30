import { parseGender } from './../util';
import { Patient, PatientNoSns, NewPatientEntry, Entry } from './../types';
import { patientEntries } from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

export const getPatientEntries = (): PatientNoSns[] => {
  const entries: Entry[] = [];
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender: parseGender(gender),
      occupation,
      entries,
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
