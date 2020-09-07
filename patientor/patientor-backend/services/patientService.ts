import { Entry } from './../../patientor-frontend/src/types';
import { parseGender } from './../util';
import { Patient, NewPatientEntry } from './../types';
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
  patientId: string,
  entry: Entry
): Patient | undefined => {
  // get patient
  const patient = patientEntries.find((patient) => patient.id === patientId);

  // add entry
  if (patient) {
    console.log('💩: patient', patient);
    console.log('💩: patient.entries', patient.entries);
    patient.entries = { ...patient.entries };
    return patient;
  }

  return;
};
