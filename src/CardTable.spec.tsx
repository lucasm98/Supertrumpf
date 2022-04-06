import React from 'react';
import renderer from 'react-test-renderer';
import Animal from './Animal';
import CardTable from './CardTable';

describe('CardTable', () => {
    it('should highlight a certain row correctly', () => {
        const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);
        const component = renderer.create(
            <CardTable animal={animal} darkMode={false} selectedProperty="size" />
        );
        const rootInstance = component.root;
        const activeRow = rootInstance.findByProps({ active: true });
        expect(activeRow.props.className).toBe('size');
    });
});