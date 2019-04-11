import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, Paper, Typography, IconButton, TextField, InputAdornment } from '@material-ui/core';
import { KeyboardArrowDown as Arrow, Close, MyLocation } from '@material-ui/icons';

const styles = theme => ({
    paper: {
        position: 'relative',
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
    },
    headerText: {
        marginRight: theme.spacing.unit * 6,
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
    listHeight: {
        maxHeight: 538 - 48 * 2 - theme.spacing.unit * 4,
        overflowY: 'auto',
    },
});

const FavoritesMenu = props => {
    const { classes, centerCoords, zoom, favorites, modFavorites, math, selectedMap } = props;
    // This is to handle a sort of auto open, auto close thing
    const [collapseIn, handleCollapse] = useState(false);
    const [permaCollapse, doPermaCollapse] = useState(false);

    useEffect(() => {
        if (favorites[selectedMap].length >= 1 && !collapseIn && !permaCollapse) return handleCollapse(true);
        else if (favorites[selectedMap].length < 1) return handleCollapse(false);
    }, [props]);

    return (
        <Paper className={classes.paper}>
            <Typography
                className={classes.headerText}
                aria-owns={collapseIn ? 'favorites-menu' : undefined}
                aria-haspopup="true"
                variant="overline"
                align="center"
                onClick={() => {
                    if (!favorites[selectedMap].length) return handleCollapse(false);
                    else {
                        doPermaCollapse(true);
                        return handleCollapse(!collapseIn);
                    }
                }}
            >
                <IconButton disabled className={collapseIn ? classes.arrow : classes.arrowShift}>
                    <Arrow />
                </IconButton>
                Favorites
            </Typography>
            <Collapse in={collapseIn}>
                <List id="favorites-menu" className={classes.listHeight}>
                    {favorites[selectedMap].map((each, index) => {
                        return (
                            <ListItem key={`${each.location}_key`}>
                                <TextField
                                    value={each.name}
                                    onChange={e => {
                                        let val = e.target.value;

                                        return modFavorites(favorites => {
                                            favorites[selectedMap][index].name = val;
                                            return { ...favorites };
                                        });
                                    }}
                                    FormHelperTextProps={{ style: { textAlign: 'center' } }}
                                    helperText={`Real: [${each.location.toString()}] ----- Console: [${each
                                        .location[0] /
                                        math.divisors[0] +
                                        math.modifiers[0]},${each.location[1] / math.divisors[1] + math.modifiers[1]}]`}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    onClick={() => centerCoords(zoom, [0, 0], each.location)}
                                                    aria-label="go to"
                                                >
                                                    <MyLocation />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        if (favorites.length === 1) handleCollapse(false);
                                                        return modFavorites(favs => ({
                                                            ...favs,
                                                            [selectedMap]: favs[selectedMap].filter(
                                                                items => items !== each
                                                            ),
                                                        }));
                                                    }}
                                                    aria-label="delete"
                                                >
                                                    <Close />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </Paper>
    );
};

export default withStyles(styles)(FavoritesMenu);
