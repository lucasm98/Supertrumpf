import React, {useContext} from 'react';
import classNames from 'classnames';

import './Card.scss';
import Animal from './Animal';
import DarkMode from './DarkMode';

interface Props {
  animal: Animal;
  uncovered: boolean;
  onSelectProperty?: (property: keyof Animal) => void;
  selectedProperty?: keyof Animal | '';
}

export default function Card ({
  animal,
  uncovered,
  onSelectProperty,
  selectedProperty,
}: Props) {
  const front = (
    <>
      <h1>{animal.name ? animal.name : 'Unbekannt'}</h1>
      {animal.image && (
        <img
          alt={animal.name}
          src={`${process.env.PUBLIC_URL}/${animal.image}`}
          height="200"
          width="200"
        />
      )}
      <table>
        <tbody>
          {Object.keys(Animal.properties).map((property) => {
            const animalProperty = Animal.properties[property];
            const propertyValue = animal[property as keyof Animal];
            return (
              <tr
                key={property}
                className={selectedProperty === property ? 'active' : ''}
                onClick={() => {
                  onSelectProperty &&
                  onSelectProperty(property as keyof Animal);
                }}
              >
                <td>{animalProperty.label}</td>
                <td>
                  {propertyValue}
                  &nbsp;
                  {animalProperty.unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
  const back = <div className="card back" />;

  const darkMode = useContext(DarkMode);
  const cardClasses = classNames('card', {
    back: !uncovered,
    light: !darkMode,
    dark: darkMode,
  });

  return <div className={cardClasses}>{uncovered? front : ''}</div>;
}