import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, Paper } from '@material-ui/core';

const styles = theme => ({
    paper: {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        right: 0,
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    textField: {
        margin: theme.spacing.unit,
        width: 150 - theme.spacing.unit * 2,
    },
    menu: {
        width: 200,
    },
});

const MapSelect = props => {
    const { classes, selectMap, selectedMap } = props;
    return (
        <Paper className={classes.paper}>
            <TextField
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
