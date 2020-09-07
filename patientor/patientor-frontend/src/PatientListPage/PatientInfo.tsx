import React from 'react';
import { useParams } from 'react-router';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient, Entry } from '../types';
import EntryDetails from './Entry';

export const PatientInfo = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async (patientId: string): Promise<void> => {
      if (patientId && patients[patientId]) {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patientId}`
          );
          dispatch(addPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      }
      fetchPatient(patientId);
    };
  }, [dispatch]);

  return (
    <>
      {patientId && patients[patientId] && (
        <>
          <h1>{patients[patientId].name}</h1>
          <span>gender: {patients[patientId].gender}</span>
          <br />
          <span>ssn: {patients[patientId].ssn}</span>
          <br />
          <span>occupation: {patients[patientId].occupation}</span>
          {patients[patientId].entries && <h2>Entries</h2>}
          {patients[patientId].entries?.map((entry, index) => (
            <EntryDetails key={index} entry={entry} />
          ))}
        </>
      )}
    </>
  );
};
export default PatientInfo;
