import React from 'react';
import { Entry } from '../types';

export const EntryDetails = ({ entry }: { entry: Entry }) => {
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
      <h2>{entry.date}</h2>
      <p>
        <em>{entry.description}</em>
      </p>
      <span>
        Type of entry: <strong>{entry.type}</strong>
      </span>
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
