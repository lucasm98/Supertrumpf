import React from 'react';
import axios from 'axios';
import {render, waitFor, cleanup, fireEvent} from '@testing-library/react';
import Game from './Game';
import Animal from "../shared/models/Animal";
import CardTable from "./CardTable";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Game', () => {
    afterEach(cleanup);
    it('initialise correctly', async () => {
        mockedAxios.get.mockResolvedValue({
            data: [
                {
                    id: 3,
                    name: 'Nashorn',
                    image: 'placeholder.png',
                    size: 1.9,
                    weight: 2300,
                    age: 50,
                    offspring: 1,
                    speed: 50,
                },
                {
                    id: 4,
                    name: 'Krokodil',
                    image: 'placeholder.png',
                    size: 5.2,
                    weight: 1000,
                    age: 70,
                    offspring: 60,
                    speed: 29,
                },
            ],
            status: 200,
            statusText: 'OK',
            headers: [],
            config: {},
        });
        const { container, getByText } = render(<Game title="Testspiel" />);

        const krokodil = await waitFor(() => getByText(/Krokodil/));
        expect(krokodil).toBeDefined();
        const cards = await waitFor(() => container.querySelector('.cards'));
        expect(cards!.childNodes.length).toBe(2);
        expect(mockedAxios.get).toHaveBeenCalled();
    });

/*    it('should locate an element by testid', () => {
        const { getByTestId } = render(<game title="Testspiel" />);

        const cardsContainer = getByTestId('cards-container');

        expect(cardsContainer.childNodes.length).toBe(0);
    });*/

    describe('interaction with react-testing-library', ()=> {
        it('should emulate a click event', function () {
            const clickHandler = jest.fn();
            const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);
            const { container } = render(
                <CardTable
                    animal={animal}
                    darkMode={false}
                    onSelectProperty={clickHandler}
                />
            );
            fireEvent.click(container.querySelector('.size')!);
            expect(clickHandler).toHaveBeenCalledWith('size')
        });
    })
});