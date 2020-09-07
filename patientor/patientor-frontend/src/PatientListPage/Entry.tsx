import React from 'react';
import { Entry } from '../types';

export const EntryDetails = ({ entry }: { entry: Entry }) => {
  console.log(entry);
  switch (entry.type) {
    case 'Hospital':
      break;
    case 'OccupationalHealthcare':
      break;
    case 'HealthCheck':
      break;
    default:
      return assertNever(entry);
  }
  return (
    <div
      style={{ border: '1px gray solid', padding: '1rem', margin: '1rem 0' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{entry.date}</h2>
        {entry.type === 'HealthCheck' && (
          <span>Health Rating: {entry.healthCheckRating}</span>
        )}
      </div>
      <p>
        <em>{entry.description}</em>
      </p>
      <span>
        Type of entry: <strong>{entry.type}</strong>
      </span>
      {entry.type === 'OccupationalHealthcare' && (
        <>
          <span style={{ display: 'block' }}>
            Employer: <strong>{entry.employerName}</strong>
          </span>
          <br />
          {entry.sickLeave && (
            <>
              Sick Leave: <strong>{entry.sickLeave?.startDate} - </strong>
              <strong>{entry.sickLeave?.endDate}</strong>
            </>
          )}
        </>
      )}
      {entry.type === 'Hospital' && (
        <>
          <span style={{ display: 'block' }}>
            Discharged on: <strong>{entry.discharge.date}</strong>
          </span>
          <span style={{ display: 'block' }}>
            Criteria: <strong>{entry.discharge.criteria}</strong>
          </span>
        </>
      )}
      {entry.diagnosisCodes && (
        <div style={{ margin: '1rem 0' }}>
          Diagnosis Codes:
          {entry.diagnosisCodes.map((code) => (
            <span
              style={{
                margin: '0.2rem',
                padding: '0.3rem',
                backgroundColor: 'lightgray',
              }}
            >
              {code}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EntryDetails;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
