import React from 'react';
import { Button } from '@material-ui/core';

const HelperText = () => {
    return (
        <>
            <p>
                Send two Space GPS's through the teleporter at the console coord values, and record their actual
                position under GPS coord.
            </p>
            <p>When you're done, you can close the math table by clicking the "DO TELESCIENCE MATH" header.</p>
            <p>ALT + WASD, Arrow Keys, or Numpad to navigate via keyboard.</p>
            <p>Right click anywhere to add favorites.</p>
            <p>
                Stuck? Check the SS13 wiki on{`\t`}
                <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    href="https://wiki.ss13.co/Telescience#Decoding_the_teleporter"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    decoding the teleporter
                </Button>
            </p>
            <p>
                Need more info?{`\t`}
                <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    href="https://github.com/Kayle7777/telescience"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Click here
                </Button>
                {`\t`}for a detailed readme.
            </p>
        </>
    );
};

export default HelperText;
