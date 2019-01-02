import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Paper } from '@material-ui/core';

const styles = theme => ({
    paper: {
        position: 'relative',
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    textField: {
        margin: theme.spacing.unit,
        width: `calc(100% - ${theme.spacing.unit * 2}px)`,
    },
});

const MapSelect = props => {
    const { classes, selectMap, selectedMap } = props;
    return (
        <Paper className={classes.paper}>
            <TextField
                InputProps={{ inputProps: { tabIndex: -1 } }}
                className={classes.textField}
                select
                label="Select Map"
                value={selectedMap}
                onChange={e => {
                    let val = e.target.value;
                    selectMap(val);
                }}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
            >
                <MenuItem value="cogmap1">Cogmap 1</MenuItem>
                <MenuItem value="cogmap2">Cogmap 2</MenuItem>
                <MenuItem value="faintSignal">Debris Field</MenuItem>
                <MenuItem value="oshan">Oshan</MenuItem>
                <MenuItem value="clarion">Clarion</MenuItem>
            </TextField>
        </Paper>
    );
};

export default withStyles(styles)(MapSelect);
