import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Collapse,
    List,
    ListItem,
    Paper,
    Typography,
    IconButton,
    Menu,
    Button,
    TextField,
    InputAdornment,
} from '@material-ui/core';
import { KeyboardArrowDown as Arrow, Create, MyLocation } from '@material-ui/icons';

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
});

const Favorites = props => {
    const { classes, transform, centerFunc, zoom, addedFavorites } = props;
    const [favorites, modFavorites] = useState([
        { name: 'AI Core', location: [137, 146], enabled: false },
        { name: 'Cloning', location: [136, 101], enabled: false },
        ...addedFavorites,
    ]);

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
                    if (!favorites.length) return handleCollapse(false);
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
                    {favorites.map((each, index) => {
                        return (
                            <ListItem
                                key={`${each.location}_key`}
                                onContextMenu={e => listItemClick(e, each, `${each.name}_${each.location.toString()}`)}
                            >
                                <TextField
                                    disabled={!each.enabled}
                                    value={each.name}
                                    onChange={e => {
                                        let val = e.target.value;
                                        modFavorites(favorites => {
                                            favorites[index].name = val;
                                            return favorites;
                                        });
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    onClick={() =>
                                                        modFavorites(favorites => {
                                                            favorites[index].enabled = !favorites[index].enabled;
                                                            return favorites;
                                                        })
                                                    }
                                                    aria-label="edit name"
                                                >
                                                    <Create />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={e => listItemClick(e, each)} aria-label="go to">
                                                    <MyLocation />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Menu
                                    open={anchor.name === `${each.name}_${each.location.toString()}`}
                                    anchorEl={anchor.anchorEl}
                                    onClose={() => setAnchor({ name: '', anchorEl: null })}
                                >
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            if (favorites.length === 1) handleCollapse(false);
                                            modFavorites(favs => favs.filter(items => items !== each));
                                        }}
                                    >
                                        remove
                                    </Button>
                                </Menu>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </Paper>
    );
    function listItemClick(e, each, id) {
        // 'click' || 'contextmenu'
        if (e.type === 'contextmenu') {
            e.preventDefault();
            setAnchor({ name: id, anchorEl: e.target });
            return;
        } else {
            if (anchor.anchorEl) return;
            centerFunc(zoom, [0, 0], each.location);
            return transform(tf => {
                tf.selectedTile = each.location;
                return tf;
            });
        }
    }
};

export default withStyles(styles)(Favorites);
