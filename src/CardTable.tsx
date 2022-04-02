import React from 'react';
import Radium from 'radium';

import Animal from './Animal';
import styles from './CardTable.styles';

interface Props {
  animal: Animal;
  onSelectProperty?: (property: keyof Animal) => void;
  selectedProperty?: keyof Animal | '';
  darkMode: boolean;
}

function CardTable({
 animal,
 onSelectProperty,
 selectedProperty,
 darkMode,
}: Props){
  const mode = darkMode ? 'dark' : 'light';
  return (
    <table style={styles.table}>
      <tbody>
      {Object.keys(Animal.properties).map((property, index) => {
        const animalProperty = Animal.properties[property];
        const propertyValue = animal[property as keyof Animal];
        return (
          <tr
            style={
              ([
                styles.tr,
                index % 2 === 0 ? styles[mode].tr : '',
                selectedProperty === property ? styles.activeRow : '',
              ] as unknown) as React.CSSProperties
            }
            key={property}
            onClick={() => {
              onSelectProperty && onSelectProperty(property as keyof Animal);
            }}
          >
            <td style={styles.td}>{animalProperty.label}</td>
            <td style={styles.td}>
              {propertyValue}
              &nbsp;
              {animalProperty.unit}
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}

export default Radium(CardTable);