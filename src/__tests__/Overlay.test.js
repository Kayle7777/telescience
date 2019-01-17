import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
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

    test('checking values of gps inputs', () => {
        const [inputX1, inputY1, inputX2, inputY2] = [
            overlay.getByTestId('input-1-0'),
            overlay.getByTestId('input-1-1'),
            overlay.getByTestId('input-2-0'),
            overlay.getByTestId('input-2-1'),
        ].map(e => e.children[0].children[1]);

        expect(inputX1.value).toBe('100');
        expect(inputY1.value).toBe('50');
        expect(inputX2.value).toBe('101');
        expect(inputY2.value).toBe('51');
        // Change first two inputs
        eventChange({ name: inputX1, value: '150' }, { name: inputY1, value: '100' });
        // X2 and Y2 should still be one above X1 and Y1
        expect(inputX2.value).toBe('151');
        expect(inputY2.value).toBe('101');
    });
});

function eventChange(...args) {
    return args.forEach(each => {
        return fireEvent.change(each.name, { target: { value: each.value } });
    });
}
