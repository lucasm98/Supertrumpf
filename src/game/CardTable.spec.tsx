import React from 'react';
import renderer from 'react-test-renderer';
import Animal from '../shared/models/Animal';
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

    it('should handel a click correctly', function () {
        const clickHandler = jest.fn();

        const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);
        const component = renderer.create(
            <CardTable
                animal={animal}
                darkMode={false}
                onSelectProperty={clickHandler}
            />
        );
        const rootInstance = component.root;
        const sizeRow = rootInstance.findByProps({className: 'size'});
        sizeRow.props.onClick();

        expect(clickHandler).toHaveBeenCalledWith('size');
    });
});