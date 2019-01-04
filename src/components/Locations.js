import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Collapse, IconButton } from '@material-ui/core';
import { KeyboardArrowDown as Arrow } from '@material-ui/icons';

const styles = theme => ({
    main: {
        // Height of button that's being translated
        marginTop: -48 + theme.spacing.unit,
    },
    line: {
        fontSize: theme.typography.caption.fontSize,
    },
    list: {
        maxHeight: '297px',
        overflow: 'auto',
    },
    arrow: {
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    arrowShift: {
        transform: 'rotate(180deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    headerText: {
        marginLeft: theme.spacing.unit * 2,
    },
});

const Locations = props => {
    const { classes, math } = props;
    const [collapseIn, collapse] = useState(false);
    return (
        <Paper className={classes.main}>
            <Typography
                onClick={() => collapse(!collapseIn)}
                align="center"
                variant="overline"
                className={classes.headerText}
            >
                expedition locations
                <IconButton disabled className={collapseIn ? classes.arrow : classes.arrowShift}>
                    <Arrow />
                </IconButton>
            </Typography>
            <Collapse in={collapseIn}>
                <Typography component="div" variant="body2" className={classes.list}>
                    <ul>
                        {[
                            { name: 'meat station', location: [209, 23] },
                            { name: 'solar observatory', location: [99, 85] },
                            { name: 'lava moon', location: [88, 106] },
                            { name: 'mars', location: [191, 135] },
                            { name: 'ice moon', location: [15, 150] },
                            { name: 'biodome', location: [120, 164] },
                            { name: 'unknown', location: [131, 212] },
                            { name: 'unknown', location: [236, 223] },
                        ].map(loc => {
                            const [xModifier, yModifier] = math.modifiers;
                            const [xDivisor, yDivisor] = math.divisors;
                            loc.location[0] = loc.location[0] / xDivisor + xModifier;
                            loc.location[1] = loc.location[1] / yDivisor + yModifier;
                            return (
                                <li key={`${loc.name}_${loc.location.toString()}`}>
                                    <p className={classes.line}>{loc.name.toUpperCase()}</p>
                                    {`X: ${loc.location[0]}, Y: ${loc.location[1]}`}
                                </li>
                            );
                        })}
                    </ul>
                </Typography>
            </Collapse>
        </Paper>
    );
};

export default withStyles(styles)(Locations);
