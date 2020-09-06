import React from 'react';
import { useParams } from 'react-router';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient } from '../types';

export const PatientInfo = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

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
          {patients[patientId].entries && (
            <>
              <h2>entries</h2>
              {patients[patientId].entries!.map((entry) => (
                <React.Fragment key={entry.description}>
                  <span>{entry.date}</span>
                  <br />
                  <p>{entry.description}</p>
                  {entry.diagnosisCodes && (
                    <ul>
                      {entry.diagnosisCodes.map((code) => (
                        <li key={code}>{code}</li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default PatientInfo;
