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
} from '@material-ui/core';

const styles = theme => ({
    textField: {
        width: 75,
    },
    main: {
        zIndex: 2,
        position: 'fixed',
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        maxWidth: 600 + theme.spacing.unit * 8,
        width: 249,
        userSelect: 'none',
    },
    resultsPos: {
        zIndex: 2,
        position: 'relative',
        marginTop: theme.spacing.unit * 2,
    },
});

const DoMath = props => {
    const { classes, selectedTile } = props;
    const [gpsValues, setValue] = useState({ input: [100, 50], actualX: [6, 7], actualY: [49, 51] });
    const [mathIn, toggleMath] = useState(true);
    const xDivisor = gpsValues.actualX[1] - gpsValues.actualX[0],
        yDivisor = gpsValues.actualY[1] - gpsValues.actualY[0],
        xModifier = gpsValues.input[0] - gpsValues.actualX[0] / xDivisor,
        yModifier = gpsValues.input[1] - gpsValues.actualY[0] / yDivisor;

    return (
        <div className={classes.main}>
            <Collapse in={mathIn} collapsedHeight={'31px'}>
                <Paper>
                    <Typography onClick={() => toggleMath(!mathIn)} variant="overline" align="center" id="tableTitle">
                        Do telescience math
                    </Typography>
                    <Table padding="dense">
                        <TableHead>
                            {/* HEADER */}
                            <TableRow>
                                <TableCell align="center">Console coord</TableCell>
                                <TableCell align="center">GPS coord</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* CONSOLE X1 // ACTUAL X1 */}

                            <TableRow>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        onChange={e => update(e, 'input', 0)}
                                        value={gpsValues.input[0]}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">X1</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        onChange={e => update(e, 'actualX', 0)}
                                        value={gpsValues.actualX[0]}
                                    />
                                </TableCell>
                            </TableRow>

                            {/* CONSOLE Y1 // ACTUAL Y1 */}

                            <TableRow>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        onChange={e => update(e, 'input', 1)}
                                        value={gpsValues.input[1]}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Y1</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        onChange={e => update(e, 'actualY', 0)}
                                        value={gpsValues.actualY[0]}
                                    />
                                </TableCell>
                            </TableRow>

                            {/* CONSOLE X2 // ACTUAL X2 */}

                            <TableRow>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        key="gpsX1"
                                        value={gpsValues.input[0] + 1}
                                        disabled
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">X2</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        onChange={e => update(e, 'actualX', 1)}
                                        value={gpsValues.actualX[1]}
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
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className={classes.textField}
                                        value={gpsValues.actualY[1]}
                                        onChange={e => update(e, 'actualY', 1)}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Collapse>
            <Paper className={classes.resultsPos}>
                <Typography variant="overline" align="center" id="tableTitle">
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
                                        props.transform(prev => {
                                            prev.selectedTile[0] = val;
                                            return prev;
                                        });
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">X</InputAdornment>,
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
                                        props.transform(prev => {
                                            prev.selectedTile[1] = val;
                                            return prev;
                                        });
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Y</InputAdornment>,
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
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
    function update(e, target, index) {
        let val = parseInt(e.target.value);
        if (!val) val = 0;
        setValue(prev => {
            prev[target][index] = val;
            return prev;
        });
    }
};

export default withStyles(styles)(DoMath);
