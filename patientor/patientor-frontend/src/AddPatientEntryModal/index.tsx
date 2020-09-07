import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddHospitalCheckForm from './AddHospitalCheckForm';
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
} from '../types';
import AddOccupationalHealthForm from './AddOccupationalHealthForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  type: string;
  error?: string;
}

export type EntryFormValues =
  | Omit<HealthCheckEntry, 'id'>
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthCareEntry, 'id'>;

const AddPatientEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  type,
  error,
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      {type === 'healthCheck' && (
        <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
      )}
      {type === 'hospital' && (
        <AddHospitalCheckForm onSubmit={onSubmit} onCancel={onClose} />
      )}
      {type === 'occupational' && (
        <AddOccupationalHealthForm onSubmit={onSubmit} onCancel={onClose} />
      )}
    </Modal.Content>
  </Modal>
);

export default AddPatientEntryModal;
