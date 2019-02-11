import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
    Fab,
} from '@material-ui/core';
import { Help, KeyboardArrowDown as Arrow, VerticalAlignCenter as GoTo } from '@material-ui/icons';
import Locations from './Locations';
import MapSelect from './MapSelect';
import FavoritesMenu from './FavoritesMenu';
import HelperPopover from './HelperPopover';

const styles = theme => ({
    textField: {
        width: 75,
    },
    main: {
        zIndex: 2,
        position: 'fixed',
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        width: 257,
    },
    resultsPos: {
        zIndex: 2,
        position: 'relative',
        marginTop: theme.spacing.unit,
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
    popOver: {
        marginLeft: theme.spacing.unit,
    },
    popOverText: {
        margin: theme.spacing.unit,
        maxWidth: 257 + theme.spacing.unit * 30,
    },
    goto: {
        zIndex: 2,
        transform: 'translate(102px, -127px)',
    },
    rightPanel: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        right: 0,
        width: 300,
    },
    helpButton: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        marginBottom: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
});

const Overlay = props => {
    const { classes, selectedTile, centerCoords, selectMap, selectedMap, zoom, favorites, modFavorites } = props;
    // anchorEl / doAnchor used for HelperPopover popover
    const [anchorEl, doAnchor] = useState(null);
    // mathIn / toggleMath used for math menu collapse
    const [mathIn, toggleMath] = useState(true);
    const [gpsValues, setValue] = useState({ input: [100, 50], actualX: [6, 7], actualY: [49, 51] });
    const xDivisor = gpsValues.actualX[1] - gpsValues.actualX[0],
        yDivisor = gpsValues.actualY[1] - gpsValues.actualY[0],
        xModifier = gpsValues.input[0] - gpsValues.actualX[0] / xDivisor,
        yModifier = gpsValues.input[1] - gpsValues.actualY[0] / yDivisor;
    return (
        <>
            <div className={classes.main}>
                <Paper>
                    <Typography
                        className={classes.headerText}
                        onClick={() => toggleMath(!mathIn)}
                        variant="overline"
                        align="center"
                        id="tableTitle"
                    >
                        Do telescience math
                        <IconButton disabled className={mathIn ? classes.arrow : classes.arrowShift}>
                            <Arrow />
                        </IconButton>
                    </Typography>
                    <Collapse in={mathIn}>
                        <Table padding="dense">
                            <TableHead>
                                {/* HEADER */}
                                <TableRow>
                                    <TableCell align="center">Console coord</TableCell>
                                    <TableCell align="center">GPS coord</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody data-testid="telescience-gps">
                                {/* CONSOLE X1 // ACTUAL X1 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'input', 0)}
                                            value={gpsValues.input[0]}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">X1</InputAdornment>,
                                                'data-testid': 'input-1-0',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualX', 0)}
                                            value={gpsValues.actualX[0]}
                                            InputProps={{
                                                'data-testid': 'actual-x-0',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* CONSOLE Y1 // ACTUAL Y1 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'input', 1)}
                                            value={gpsValues.input[1]}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Y1</InputAdornment>,
                                                'data-testid': 'input-1-1',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualY', 0)}
                                            value={gpsValues.actualY[0]}
                                            InputProps={{
                                                'data-testid': 'actual-y-0',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* CONSOLE X2 // ACTUAL X2 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            value={gpsValues.input[0] + 1}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">X2</InputAdornment>,
                                                'data-testid': 'input-2-0',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualX', 1)}
                                            value={gpsValues.actualX[1]}
                                            InputProps={{
                                                'data-testid': 'actual-x-1',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                {/* CONSOLE Y2 // ACTUAL Y2 */}

                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            value={gpsValues.input[1] + 1}
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Y2</InputAdornment>,
                                                'data-testid': 'input-2-1',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className={classes.textField}
                                            disabled={!mathIn}
                                            onChange={e => update(e, 'actualY', 1)}
                                            value={gpsValues.actualY[1]}
                                            InputProps={{
                                                'data-testid': 'actual-y-1',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Collapse>
                </Paper>
                <Paper className={classes.resultsPos}>
                    <Typography className={classes.headerText} variant="overline" align="center" id="tableTitle">
                        Real Coordinates
                    </Typography>
                    <Table padding="dense">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        value={selectedTile[0]}
                                        onChange={e => {
                                            let val = parseInt(e.target.value);
                                            if (!val) val = 0;
                                            return props.transform(tf => ({
                                                ...tf,
                                                selectedTile: [val, tf.selectedTile[1]],
                                            }));
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">X</InputAdornment>,
                                            'data-testid': 'selected-x',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        value={selectedTile[1]}
                                        onChange={e => {
                                            let val = parseInt(e.target.value);
                                            if (!val) val = 0;
                                            return props.transform(tf => ({
                                                ...tf,
                                                selectedTile: [tf.selectedTile[0], val],
                                            }));
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Y</InputAdornment>,
                                            'data-testid': 'selected-y',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography variant="overline" align="center">
                        Console Coordinates
                    </Typography>
                    <Table padding="dense">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        disabled
                                        className={classes.textField}
                                        value={selectedTile[0] / xDivisor + xModifier}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">X</InputAdornment>,
                                            'data-testid': 'console-x',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        disabled
                                        className={classes.textField}
                                        value={selectedTile[1] / yDivisor + yModifier}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Y</InputAdornment>,
                                            'data-testid': 'console-y',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
                <HelperPopover
                    classes={classes}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => doAnchor(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                />
                <IconButton tabIndex={-1} className={classes.goto} onClick={() => centerCoords()}>
                    <GoTo />
                </IconButton>
                <Locations math={{ divisors: [xDivisor, yDivisor], modifiers: [xModifier, yModifier] }} />
            </div>
            <div className={classes.rightPanel}>
                <MapSelect selectMap={selectMap} selectedMap={selectedMap} />
                <FavoritesMenu
                    zoom={zoom}
                    centerCoords={centerCoords}
                    favorites={favorites}
                    selectedMap={selectedMap}
                    modFavorites={modFavorites}
                    math={{ divisors: [xDivisor, yDivisor], modifiers: [xModifier, yModifier] }}
                />
                <Fab
                    className={classes.helpButton}
                    onClick={event => {
                        let val = event.currentTarget;
                        doAnchor(val);
                    }}
                >
                    <Help style={{ height: '100%', width: '100%', transform: 'scale(1.21, 1.21)' }} />
                </Fab>
            </div>
        </>
    );
    function update(e, target, index) {
        let val = parseInt(e.target.value);
        if (!val) val = 0;
        return setValue(prev => {
            let newArr = prev[target];
            newArr[index] = val;
            return { ...prev, [target]: newArr };
        });
    }
};

export default withStyles(styles)(Overlay);
