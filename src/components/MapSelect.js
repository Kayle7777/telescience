import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, Paper } from '@material-ui/core';

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
            <FormControl className={classes.textField}>
                <Select
                    MenuProps={classes.menu}
                    native
                    value={selectedMap}
                    onChange={e => {
                        let val = e.target.value;
                        return selectMap(val);
                    }}
                >
                    <option value="cogmap1">Cogmap 1</option>
                    <option value="cogmap2">Cogmap 2</option>
                    <option value="faintSignal">Debris Field</option>
                    <option value="oshan">Oshan</option>
                    <option value="clarion">Clarion</option>
                    <option value="destiny">Destiny</option>
                    <option value="samedi">Samedi</option>
                    <option value="horizon">Horizon</option>
                </Select>
            </FormControl>
            {/* <TextField
                InputProps={{ inputProps: { tabIndex: -1 } }}
                className={classes.textField}
                select
                label="Select Map"
                value={selectedMap}
                onChange={e => {
                    let val = e.target.value;
                    return selectMap(val);
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
                <MenuItem value="destiny">Destiny</MenuItem>
                <MenuItem value="samedi">Samedi</MenuItem>
                <MenuItem value="horizon">Horizon</MenuItem>
            </TextField> */}
        </Paper>
    );
};

export default withStyles(styles)(MapSelect);
