import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, List, ListItem, ListItemText, Paper, Typography, IconButton, Menu, Button } from '@material-ui/core';
import { KeyboardArrowDown as Arrow } from '@material-ui/icons';

const styles = theme => ({
    paper: {
        position: 'relative',
        marginTop: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit,
        width: 200,
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
});

const Favorites = props => {
    const { classes, favs, modFavorites, transform, centerFunc } = props;
    const [collapseIn, handleCollapse] = useState(false);
    const [anchor, setAnchor] = useState({ name: '', anchorEl: null });
    return (
        <Paper className={classes.paper}>
            <Typography
                className={classes.headerText}
                aria-owns={collapseIn ? 'favorites-menu' : undefined}
                aria-haspopup="true"
                variant="overline"
                align="center"
                onClick={() => {
                    if (!favs.length) return handleCollapse(false);
                    else return handleCollapse(!collapseIn);
                }}
            >
                <IconButton disabled className={collapseIn ? classes.arrow : classes.arrowShift}>
                    <Arrow />
                </IconButton>
                Favorites
            </Typography>
            <Collapse in={collapseIn}>
                <List id="favorites-menu">
                    {favs.map((each, index) => {
                        return (
                            <ListItem
                                button
                                key={`[${each.location.toString()}]`}
                                id={`${each.name}_${each.location.toString()}`}
                                onClick={e => ListItemClick(e, each)}
                                onContextMenu={e => ListItemClick(e, each, `${each.name}_${each.location.toString()}`)}
                            >
                                <ListItemText primary={each.name} secondary={`[${each.location.toString()}]`} />
                                <Menu
                                    open={anchor.name === `${each.name}_${each.location.toString()}`}
                                    anchorEl={anchor.anchorEl}
                                    onClose={() => setAnchor({ name: '', anchorEl: null })}
                                >
                                    {/* // remove functionality here vvv */}
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            if (favs.length === 1) handleCollapse(false);
                                            modFavorites(favs => favs.filter(items => items !== each));
                                        }}
                                    >
                                        remove
                                    </Button>
                                    {/* // rename functionality here vvv */}
                                </Menu>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </Paper>
    );
    function ListItemClick(e, each, id) {
        // 'click' || 'contextmenu'
        if (e.type === 'contextmenu') {
            e.preventDefault();
            setAnchor({ name: id, anchorEl: e.target });
            return;
        } else {
            if (anchor.anchorEl) return;
            centerFunc(10, [0, 0], each.location);
            return transform(tf => {
                tf.selectedTile = each.location;
                return tf;
            });
        }
    }
};

export default withStyles(styles)(Favorites);
