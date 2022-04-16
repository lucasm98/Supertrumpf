import React from "react";
import { Form, Error, Field, TextField } from './Form.styles';
import { Formik, ErrorMessage, FieldProps} from "formik";
import validationSchema from "./validationSchema";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@material-ui/core";

import Animal from "../game/Animal";

interface Props {
  onSubmit: (animal: Animal) => void;
  animal?: Animal;
  open: boolean;
  onClose: () => void;
}

export default function From({
  onSubmit,
  animal = new Animal('', '', '', '', '', '', ''),
  open,
  onClose,
}: Props) {
  return (
    <Dialog
      open={open}
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
                <Field
                  id="name"
                  name="name"
                  render={({field} : FieldProps) => (
                    <TextField
                      {...field}
                      error={!!(errors.name && touched.name)}
                      label="Name" />
                  )}
                />
                <ErrorMessage name="name" component="label"/>
              </div>
              <div>
                <Field
                  id="image"
                  name="image"
                  render={()=> (
                    <Button variant="contained" component="label">
                      Bild
                      <input
                        type="file"
                        style={{display: 'none'}}
                        onChange={event => {
                          setFieldValue('image', event.currentTarget.files![0]);
                        }}
                      />
                    </Button>
                  )}
                />
                <ErrorMessage name="image" component={Error}/>
              </div>
              {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
                property => {
                  return (
                    <div key={property}>
                      <Field
                        id={property}
                        name={property}
                        render={({field}: FieldProps) => (
                          <TextField
                            error={!!(errors[property] && touched[property])}
                            {...field}
                            label={Animal.properties[property].label}
                          />
                        )}
                      />
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