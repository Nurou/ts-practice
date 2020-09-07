import React from 'react';
import { useParams } from 'react-router';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient, Entry } from '../types';
import EntryDetails from './Entry';
import AddPatientEntryModal from '../AddPatientEntryModal';
import { EntryFormValues } from '../AddPatientEntryModal/AddPatientEntryForm';
import { Button } from 'semantic-ui-react';

export const PatientInfo = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      console.log(`${apiBaseUrl}/patients/${patientId}/entries`);
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      console.log(updatedPatient);
      dispatch({ type: 'ADD_PATIENT', payload: updatedPatient });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
          <AddPatientEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewPatientEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </>
      )}
    </>
  );
};
export default PatientInfo;
