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
    textField: {
        width: 55,
    },
});

const DoMath = props => {
    const { classes, position, selectedTile } = props;
    const [gpsValues, setValue] = useState({ input: [100, 50], actualX: [6, 7], actualY: [49, 51] });
    return (
        <Paper className={position}>
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
                {/* God damn this is messy. There's gotta be a better way, but they all need unique updater functions... */}
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
