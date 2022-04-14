import React from "react";
import Animal from "../game/Animal";
import { Label, Row, Form, Error, Field} from './Form.styles';

import { Formik, ErrorMessage} from "formik";
import validationSchema from "./validationSchema";

interface Props {
  onSubmit: (animal: Animal) => void;
  animal?: Animal;
}

export default function From({
  onSubmit,
  animal = new Animal('', '', '', '', '', '', ''),
}: Props) {
  return (
    <Formik
      initialValues={animal}
      validationSchema={validationSchema}
      onSubmit={(e, actions) => {
        onSubmit(e!);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form>
          <Row>
            <Label htmlFor="name">Name:</Label>
            <Field
              id="name"
              type="text"
              name="name"
              className={errors.name && 'error'}
            />
            <ErrorMessage name="name" component={Error}/>
          </Row>
          <Row>
            <Label htmlFor="image">Bild:</Label>
            <input
              type="file"
              id="image"
              onChange={event => {
                setFieldValue('image', event.currentTarget.files![0]);
              }}
            />
            <ErrorMessage name="image" component={Error}/>
          </Row>
          {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
            property => {
              return (
                <Row key={property}>
                  <Label htmlFor={property}>
                    {Animal.properties[property].label}:
                  </Label>
                  <Field
                    type="text"
                    id={property}
                    name={property}
                    className={errors[property] && 'error'}
                  />
                  <ErrorMessage name={property} component={Error}/>
                </Row>
              );
            }
          )}
          <div>
            <button type="submit" disabled={isSubmitting}>Speichern</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}