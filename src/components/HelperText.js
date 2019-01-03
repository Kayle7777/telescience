import React from 'react';

const HelperText = () => {
    return (
        <div>
            <p>
                Fill in the relevant fields under "DO TELESCIENCE MATH". The website will handle the math for you, and
                your new console coordinates will be shown under "CONSOLE COORDINATES"
            </p>
            <p>When you're done, you can close the math table by clicking the "DO TELESCIENCE MATH" header.</p>
            <p>
                If you want to center the screen on custom coordinates, input any coordinate you want under the "REAL
                COORDINATES" table, then click the center button icon, inbetween the two rows.
            </p>
            <p>
                You can move the tile selector by keyboard as long as the mouse is not in the control panel. Try WASD,
                Arrow Keys, or Numpad. Numpad 5 will center screen
            </p>
            <p>
                Click the "EXPEDITION LOCATIONS" header for a list of telescience expedition locations, their values
                will already have the math applied to them.
            </p>
            <p>
                Right click anywhere on the map to add a favorite. You can quick go-to it or remove it from the
                favorites menu
            </p>
        </div>
    );
};

export default HelperText;
