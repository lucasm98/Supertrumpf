import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Pflichtfeld, bitte einen Wert eintragen',
    notType: 'Bitte nur Zahlen eingeben',
  },
  number: {
    moreThan: 'Bitte nur Zahlen größer als 0 eingeben',
  },
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  image: Yup.mixed().required(),
  size: Yup.number()
    .moreThan(0)
    .required(),
  weight: Yup.number()
    .moreThan(0)
    .required(),
  age: Yup.number()
    .moreThan(0)
    .required(),
  offspring: Yup.number()
    .moreThan(0)
    .required(),
  speed: Yup.number()
    .moreThan(0)
    .required(),
});

export default validationSchema;