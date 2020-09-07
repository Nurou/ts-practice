import { Gender, HealthCheckRating } from './../patientor-frontend/src/types';
import { NewPatientEntry, NewEntry } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDob(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: object.entries,
  };
  return newEntry;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDob = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

export const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const newEntry: NewEntry = {
    type: object.type,
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
    diagnosisCodes: object.diagnosisCodes,
    ...(object.healthCheckRating && {
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    }),
    ...(object.employerName && {
      employerName: parseEmployerName(object.employerName),
    }),
    ...(object.sickLeave && {
      sickLeave: parseSickLeave(object.sickLeave),
    }),
    ...(object.discharge && {
      discharge: parseDischarge(object.discharge),
    }),
  };
  return newEntry;
};

const parseHealthCheckRating = (HealthCheckRating: any): HealthCheckRating => {
  if (
    !HealthCheckRating ||
    isNaN(HealthCheckRating) ||
    !isHealthCheckRating(HealthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing HealthCheckRating: ' + HealthCheckRating
    );
  }

  return HealthCheckRating;
};
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }

  return specialist;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }

  return employerName;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseSickLeave = (sickLeave: any): string => {
  if (
    !sickLeave ||
    !isString(sickLeave.startDate) ||
    !isString(sickLeave.endDate)
  ) {
    throw new Error('Incorrect or missing sick leave: ' + sickLeave);
  }
  return sickLeave;
};
const parseDischarge = (discharge: any): string => {
  if (
    !discharge ||
    !isString(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};
