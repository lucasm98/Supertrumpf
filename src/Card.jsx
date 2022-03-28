import * as React from 'react';
import PropTypes from 'prop-types';

import './Card.css';
import Animal from './Animal';
import DarkMode from './DarkMode';

export default function Card({
  animal,
  uncovered,
  onSelectProperty,
  selectedProperty,
}) {
  const front = (
    <div className="card">
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
            return (
              <tr
                key={property}
                className={selectedProperty === property ? 'active' : ''}
                onClick={() => {
                  onSelectProperty(property);
                }}
              >
                <td>{animalProperty.label}</td>
                <td>
                  {animal[property]}
                  &nbsp;
                  {animalProperty.unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  const back = <div className="card back" />;

  return (
    <DarkMode.Consumer>
      {darkMode => {
        const darkModeClassName = darkMode ? 'dark' : 'light';
        return (
          <div className={darkModeClassName}>{uncovered? front : back}</div>
        );
      }}
    </DarkMode.Consumer>
  )
}

Card.propTypes = {
  uncovered: PropTypes.bool.isRequired,
  animal: PropTypes.object.isRequired,
  onSelectProperty: PropTypes.func,
  selectedProperty: PropTypes.string,
};
