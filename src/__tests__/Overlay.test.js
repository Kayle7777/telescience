import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Overlay from '../components/Overlay';

const overlayProps = {
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

const setup = testID => {
    const utils = render(<Overlay {...overlayProps} />);
    const got = utils.getByTestId(testID || 'telescience-gps');
    return {
        got,
        ...utils,
    };
};

describe('testing Overlay.js', () => {
    test('checking values of gps inputs', () => {
        const [inputX1, inputY1, inputX2, inputY2, actualX0, actualX1, actualY0, actualY1] = [
            setup('input-1-0'),
            setup('input-1-1'),
            setup('input-2-0'),
            setup('input-2-1'),
            setup('actual-x-0'),
            setup('actual-x-1'),
            setup('actual-y-0'),
            setup('actual-y-1'),
        ].map(e => e.got.children[0].children[1]);
        expect(inputX1.value).toBe('100');
        expect(inputY1.value).toBe('50');
        expect(inputX2.value).toBe('101');
        expect(inputY2.value).toBe('51');
        // Change first two inputs
        fireEvent.change(inputX1, { target: { value: '150' } });
        fireEvent.change(inputY1, { target: { value: '100' } });
        // X2 and Y2 should still be one above X1 and Y1
        expect(inputX2.value).toBe('151');
        expect(inputY2.value).toBe('101');
    });
});
