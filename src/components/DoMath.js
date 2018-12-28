import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TextField,
    InputAdornment,
    Typography,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        zIndex: 1,
        position: 'fixed',
        marginLeft: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
        maxWidth: 600 + theme.spacing.unit * 8,
    },
    textField: {
        width: 55,
    },
});

const DoMath = props => {
    const { classes } = props;
    const [gpsValues, setValue] = useState({ input: [100, 50], actualX: [6, 7], actualY: [49, 51] });
    return (
        <Paper className={classes.root}>
            <Typography variant="h6" align="center" id="tableTitle">
                Do yer math
            </Typography>
            <Table>
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
                                onChange={e => {
                                    let val = parseInt(e.target.value);
                                    if (!val) val = 0;
                                    setValue(prev => {
                                        prev.input[0] = val;
                                        return prev;
                                    });
                                }}
                                value={gpsValues.input[0]}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">X1</InputAdornment>,
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                className={classes.textField}
                                onChange={e => {
                                    let val = parseInt(e.target.value);
                                    if (!val) val = 0;
                                    setValue(prev => {
                                        prev.actualX[0] = val;
                                        return prev;
                                    });
                                }}
                                value={gpsValues.actualX[0]}
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
                                onChange={e => {
                                    let val = parseInt(e.target.value);
                                    if (!val) val = 0;
                                    setValue(prev => {
                                        prev.actualX[1] = val;
                                        return prev;
                                    });
                                }}
                                value={gpsValues.actualX[1]}
                            />
                        </TableCell>
                    </TableRow>

                    {/* CONSOLE Y1 // ACTUAL Y1 */}

                    <TableRow>
                        <TableCell>
                            <TextField
                                className={classes.textField}
                                onChange={e => {
                                    let val = parseInt(e.target.value);
                                    if (!val) val = 0;
                                    setValue(prev => {
                                        prev.input[1] = val;
                                        return prev;
                                    });
                                }}
                                value={gpsValues.input[1]}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Y1</InputAdornment>,
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField
                                className={classes.textField}
                                onChange={e => {
                                    let val = parseInt(e.target.value);
                                    if (!val) val = 0;
                                    setValue(prev => {
                                        prev.actualY[0] = val;
                                        return prev;
                                    });
                                }}
                                value={gpsValues.actualY[0]}
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
                                onChange={e => {
                                    let val = parseInt(e.target.value);
                                    if (!val) val = 0;
                                    setValue(prev => {
                                        prev.actualY[1] = val;
                                        return prev;
                                    });
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

export default withStyles(styles)(DoMath);
