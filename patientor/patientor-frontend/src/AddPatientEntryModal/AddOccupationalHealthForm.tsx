import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField } from './FormField';

import { NumberField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useStateValue } from '../state/';
import { OccupationalHealthCareEntry } from '../types';

interface Props {
  onSubmit: (values: Omit<OccupationalHealthCareEntry, 'id'>) => void;
  onCancel: () => void;
}

/**
 * Supports adding entries of type 'HealthCheck'
 * @param param
 */
export const AddOccupationalHealthForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: 'OccupationalHealthcare',
        date: '',
        specialist: '',
        description: '',
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.sickLeave) {
          errors.sickLeave = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder=''
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder=''
              name='description'
              component={TextField}
            />
            <Field
              label='Employer Name'
              placeholder=''
              name='employerName'
              component={TextField}
            />
            <Field
              label='Sick Leave Start'
              placeholder='YYYY-MM-DD'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label='Sick Leave End'
              placeholder='YYYY-MM-DD'
              name='sickLeave.endDate'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthForm;
