import { parseGender } from './../util';
import { Patient, NewPatientEntry, Entry } from './../types';
import { patientEntries } from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

export const getPatientEntries = (): Patient[] => {
  const entries: Entry[] = [];
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, ssn }) => ({
      id,
      name,
      dateOfBirth,
      gender: parseGender(gender),
      occupation,
      entries,
      ssn,
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
