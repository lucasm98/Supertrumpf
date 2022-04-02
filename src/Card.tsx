import React, {useContext} from 'react';
import classNames from 'classnames';

import './Card.scss';
import Animal from './Animal';
import DarkMode from './DarkMode';
import CardTable from './CardTable';

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
  const darkMode = useContext(DarkMode);
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
      <CardTable
        animal={animal}
        onSelectProperty={onSelectProperty}
        selectedProperty={selectedProperty}
        darkMode={darkMode}
      />
    </>
  );

  const cardClasses = classNames('card', {
    back: !uncovered,
    light: !darkMode,
    dark: darkMode,
  });

  return <div className={cardClasses}>{uncovered? front : ''}</div>;
}