import { parseGender } from './../util';
import { Patient, NewPatientEntry, NewEntry } from './../types';
import patientEntries from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

export const getPatientEntries = (): Patient[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => ({
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

export const addEntry = (
  entry: NewEntry,
  patientId: string
): Patient | undefined => {
  // get patient
  const patient = patientEntries.find((patient) => patient.id === patientId);

  // add entry
  if (patient) {
    const newEntry = {
      id: uuidv4(),
      ...entry,
    };
    patient.entries.push(newEntry);
    return patient;
  }

  return;
};
