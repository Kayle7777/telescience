import React from 'react';
import { Button, Popover, Typography } from '@material-ui/core';

const HelperText = () => {
    return (
        <>
            <h3>Help, I'm stuck!</h3>
            <hr />
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
            <hr />
            <p>Check out the alpha version of my ChemHelper site. Plenty more features are in store!</p>
            <Button
                color="secondary"
                variant="outlined"
                size="small"
                href="https://kayle7777.github.io/chemhelper/"
                rel="noopener noreferrer"
                target="_blank"
            >
                ChemHelper
            </Button>
        </>
    );
};

const HelperPopover = props => {
    const { classes, open, anchorEl, onClose, anchorOrigin } = props;
    return (
        <Popover
            className={classes.popOver}
            aria-label="Math help"
            id="math-tips"
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Typography variant="caption" className={classes.popOverText}>
                <HelperText />
            </Typography>
        </Popover>
    );
};

export default HelperPopover;
