import React from 'react';
import { render } from 'react-testing-library';
import Main from '../pages/Main';

describe('testing Main.js', () => {
    test('it renders', () => {
        render(<Main />);
    });
});
