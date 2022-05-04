import React from "react";
import { Form, Error, Field, TextField } from './Form.styles';
import { Formik, ErrorMessage, FieldProps} from "formik";
import validationSchema from "../../validationSchema";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@material-ui/core";

import Animal from "../../../shared/models/Animal";

interface Props {
  onSubmit: (animal: Animal) => void;
  onClose: () => void;
  getAnimal: (id?: number) => Animal;
  id?: number;
}

export default function From({
  onSubmit,
  getAnimal,
  onClose,
  id
}: Props) {
  let animal = getAnimal(id);
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      aria-describedby="form-dialog-description"
    >
      <Formik
        initialValues={animal}
        validationSchema={validationSchema}
        onSubmit={(e, actions) => {
          onSubmit(e!);
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, setFieldValue, touched}) => (
          <Form>
            <DialogTitle id="form-dialog-title">
              {animal.id ? 'Karte bearbeiten' : 'Neue Karte anlegen'}
            </DialogTitle>
            <DialogContent id="confirm-dialog-description">
              <div>
                <Field id="name" name="name" >
                  {({field} : FieldProps) => (
                    <TextField
                      {...field}
                      error={!!(errors.name && touched.name)}
                      label="Name" />
                  )}
                </Field>
                <ErrorMessage name="name" component="label"/>
              </div>
              <div>
                <Field id="image" name="image">
                  {({field} : FieldProps) => (
                    <TextField
                      {...field}
                      error={!!(errors.name && touched.name)}
                      label="Name" />
                  )}
                </Field>
                <ErrorMessage name="image" component={Error}/>
              </div>
              {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
                property => {
                  return (
                    <div key={property}>
                      <Field id={property} name={property}>
                        {({field}: FieldProps) => (
                          <TextField
                            error={!!(errors[property] && touched[property])}
                            {...field}
                            label={Animal.properties[property].label}
                          />
                        )}
                      </Field>
                      <ErrorMessage name={property} component={Error}/>
                    </div>
                  );
                }
              )}
              <div />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onClose}>
                Abbrechen
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Speichern
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}