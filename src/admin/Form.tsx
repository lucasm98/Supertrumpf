import React from "react";
import Animal from "../game/Animal";
import useCardAdmin from "./useCardAdmin";
import { Label, Row, Form as StyledForm} from './Form.styles';

interface Props {
  onSubmit: (animal: Animal) => void;
  animal?: Animal;
}

export default function Form({ onSubmit, animal: initialAnimal }: Props) {
  const [animal, changeProperty] = useCardAdmin(initialAnimal);
  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        onSubmit(animal);
      }}
    >
      <Row>
        <Label htmlFor = "name">Name:</Label>
        <input
          type="text"
          id="name"
          value={animal.name}
          onChange={changeProperty}
        />
      </Row>
      <Row>
        <Label htmlFor="image">Bild:</Label>
        <input type="file" id="image" onChange={changeProperty}/>
      </Row>
      {Object.keys(Animal.properties).map(property => {
        let value = (animal as any)[property];
        value = value === 0 ? '' : value;
        return (
          <Row key={property}>
            <Label htmlFor={property}>
              {Animal.properties[property].label}:
            </Label>
            <input
              type="text"
              id={property}
              value={value}
              onChange={changeProperty}
            />
          </Row>
        );
      })}
      <div>
        <button type="submit">Speichern</button>
      </div>
    </StyledForm>
  );
}