import React from 'react';
import { useParams } from 'react-router';
import { useStateValue, addPatient } from '../state';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient } from '../types';
import EntryDetails from './Entry';
import { Button } from 'semantic-ui-react';
import AddPatientEntryModal, { EntryFormValues } from '../AddPatientEntryModal';

export const PatientInfo = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  // const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [healthCheckModal, setHealthCheckModal] = React.useState<boolean>(
    false
  );
  const [
    occupationalHealthCareModal,
    setOccupationalHealthCareModal,
  ] = React.useState<boolean>(false);
  const [hospitalModal, setHospitalModal] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const closeModal = (): void => {
    setHealthCheckModal(false);
    setOccupationalHealthCareModal(false);
    setHospitalModal(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
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
          {/* modals for all of the entry types */}
          <AddPatientEntryModal
            modalOpen={healthCheckModal}
            onSubmit={submitNewPatientEntry}
            error={error}
            onClose={closeModal}
            type='healthCheck'
          />
          <AddPatientEntryModal
            modalOpen={occupationalHealthCareModal}
            onSubmit={submitNewPatientEntry}
            error={error}
            onClose={closeModal}
            type='occupational'
          />
          <AddPatientEntryModal
            modalOpen={hospitalModal}
            onSubmit={submitNewPatientEntry}
            error={error}
            onClose={closeModal}
            type='hospital'
          />
          <Button onClick={() => setHealthCheckModal(true)}>
            Add Health Check Entry
          </Button>
          <Button onClick={() => setOccupationalHealthCareModal(true)}>
            Add Occupational Health Care Entry
          </Button>
          <Button onClick={() => setHospitalModal(true)}>
            Add Hospital Entry
          </Button>
        </>
      )}
    </>
  );
};
export default PatientInfo;
