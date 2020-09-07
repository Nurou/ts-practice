import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { TextField } from './FormField';
import { HospitalEntry } from '../types';

interface Props {
  onSubmit: (values: Omit<HospitalEntry, 'id'>) => void;
  onCancel: () => void;
}

/**
 * Supports adding entries of type 'HealthCheck'
 * @param param
 */
export const AddHospitalCheckForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        date: '',
        specialist: '',
        description: '',
        discharge: {
          date: '',
          criteria: '',
        },
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
        if (!values.discharge) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
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
              label='Discharge Date'
              placeholder='YYYY-MM-DD'
              name='discharge.date'
              component={TextField}
            />
            <Field
              label='Discharge Criteria'
              placeholder=''
              name='discharge.criteria'
              component={TextField}
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

export default AddHospitalCheckForm;
