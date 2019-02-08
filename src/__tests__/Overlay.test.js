import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Overlay from '../components/Overlay';

const overlayTestProps = {
    selectedTile: [150, 150],
    centerCoords: () => console.log('This called the centerCoords function'),
    selectMap: () => console.log('This called the selectMap function'),
    selectedMap: 'cogmap1',
    zoom: 10,
    modFavorites: () => console.log('This called modFavorites'),
    favorites: {
        cogmap1: [
            { name: 'Telescience', location: [112, 123] },
            { name: 'AI core', location: [137, 146] },
            { name: "Captain's Locker", location: [85, 166] },
        ],
    },
};

describe('testing Overlay.js', () => {
    const overlay = render(<Overlay {...overlayTestProps} />);
    const id = arg => overlay.getByTestId(arg);

    // If it has an inputadornment, it selects children[1]
    const [inputX0, inputY0, inputX1, inputY1, selectedX, selectedY, consoleX, consoleY] = [
        id('input-1-0'),
        id('input-1-1'),
        id('input-2-0'),
        id('input-2-1'),
        id('selected-x'),
        id('selected-y'),
        id('console-x'),
        id('console-y'),
    ].map(inputContainer => inputContainer.children[1]);

    // If it has no inputadornment, it selects children[0]
    const [actualX0, actualY0, actualX1, actualY1] = [
        id('actual-x-0'),
        id('actual-y-0'),
        id('actual-x-1'),
        id('actual-y-1'),
    ].map(inputContainer => inputContainer.children[0]);

    test('checking values of gps inputs', () => {
        expect(inputX0.value).toBe('100');
        expect(inputY0.value).toBe('50');
        expect(inputX1.value).toBe('101');
        expect(inputY1.value).toBe('51');
        // Change first two inputs
        eventChange({ name: inputX0, value: '150' }, { name: inputY0, value: '100' });
    });

    test('checking if math is right', () => {
        // Current selected tile ["150", "150"], and current calculated coordinates as present on the DOM
        const selectedTile = [selectedX.value, selectedY.value];
        const calculatedValue = calculateConsole(selectedTile);
        const consoleCoords = [consoleX.value, consoleY.value].map(str => Number(str));
        // Expect the math to work
        expect(calculatedValue).toEqual(consoleCoords);

        // But the old value will not work if we change it and recalculate it.
        expect(calculateConsole([139, 185])).not.toEqual(consoleCoords);
    });

    function calculateConsole(coords) {
        coords = coords.map(str => Number(str));
        const xDivisor = actualX1.value - actualX0.value,
            yDivisor = actualY1.value - actualY0.value,
            xModifier = inputX0.value - actualX0.value / xDivisor,
            yModifier = inputY0.value - actualY0.value / yDivisor;
        return [coords[0] / xDivisor + xModifier, coords[1] / yDivisor + yModifier];
    }
});

async function eventChange(...args) {
    return args.forEach(each => {
        return fireEvent.change(each.name, { target: { value: each.value } });
    });
}
