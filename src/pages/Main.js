import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';
import Images from '../components/Images';
import DoMath from '../components/DoMath';
import MapSelect from '../components/MapSelect';
import Favorites from '../components/Favorites';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
        display: 'block',
        width: 1200 * 8,
        height: 1200 * 8,
    },
    image: {
        verticalAlign: 'middle',
        width: 1200,
        height: 1200,
    },
    noClick: {
        userSelect: 'none',
    },
    rightPanel: {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

const Main = props => {
    const { classes } = props;
    const [tf, transform] = useState({
        initial: [0, 0],
        pos: [-1300, -1300],
        selectedTile: [137, 146],
    });
    const [zoom, setZoom] = useState(5);
    const scale = zoom / 10;
    // Consider putting in one "status" state
    const [moved, move] = useState(false);
    const [mousedown, clickDown] = useState(false);
    const [focussed, focus] = useState(false);
    // Consider putting in one "status" state
    const [selectedMap, selectMap] = useState('cogmap1');
    const [favorites, modFavorites] = useState([
        { name: 'AI Core', location: [137, 146] },
        { name: 'Cloning', location: [136, 101] },
    ]);

    const iStyles = {
        divStyle: {
            transformOrigin: `0 0`,
            transform: `translate3D(${tf.pos[0]}px, ${tf.pos[1]}px, 0) scale(${scale})`,
        },
        svgStyle: {
            zIndex: 1,
            position: 'absolute',
            left: (tf.selectedTile[0] - 1) * 32 * scale + tf.pos[0],
            top: -(tf.selectedTile[1] - 300) * 32 * scale + tf.pos[1],
        },
    };

    const Svg = () => (
        <svg
            onClick={() =>
                transform(tf => {
                    tf.selectedTile = [1, 1];
                    return tf;
                })
            }
            onWheel={e => mouseWheel(e)}
            onMouseEnter={() => focus(true)}
            className={classes.noClick}
            width={32 * scale}
            height={32 * scale}
            style={iStyles.svgStyle}
        >
            <rect
                width={`${32 * scale}px`}
                height={`${32 * scale}px`}
                stroke="white"
                fill="transparent"
                strokeWidth="4"
            />
        </svg>
    );

    return (
        <div className={classes.noClick} onKeyDown={e => keyDown(e)} tabIndex={0}>
            <div className={classes.rightPanel}>
                <MapSelect selectMap={selectMap} selectedMap={selectedMap} />
                <Favorites
                    favs={favorites}
                    modFavorites={modFavorites}
                    transform={transform}
                    centerFunc={centerCoords}
                />
            </div>
            <DoMath selectedTile={tf.selectedTile} transform={transform} centerFunc={centerCoords} />
            <div
                className={classes.main}
                style={iStyles.divStyle}
                onMouseLeave={() => {
                    clickDown(false);
                    focus(false);
                }}
                onMouseEnter={() => focus(true)}
                onMouseUp={e => mouseUp(e)}
                onMouseDown={e => mouseDown(e)}
                onMouseMove={e => mouseMove(e)}
                onWheel={e => mouseWheel(e)}
            >
                <Images image={`${classes.image} ${classes.noClick}`} selectedMap={selectedMap} />
            </div>
            <Svg />
        </div>
    );

    function mouseUp(e) {
        clickDown(false);
        // This works because mouseMove never fires unless you actually move the mouse. If mouseMove fires, we don't want to continue the rest of this.
        if (moved) return move(false);
        else moved && move(false);
        const { clientX, clientY } = e;
        const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
        transform(tf => {
            // Select each "tile", where each tile is 32 pixels by 32 pixels. Also, the game grid begins at [1,1] from the bottom left. Weird right?
            tf.selectedTile = [1 + (imageX - (imageX % 32)) / 32, 300 - (imageY - (imageY % 32)) / 32];
            return tf;
        });
    }

    function mouseDown(e) {
        clickDown(true);
        const { clientX, clientY } = e;
        return transform(tf => {
            tf.initial = [clientX - tf.pos[0], clientY - tf.pos[1]];
            return tf;
        });
    }

    function mouseMove(e) {
        if (!mousedown) return;
        move(true);
        const { clientX, clientY } = e;
        return transform(tf => {
            tf.pos = [clientX - tf.initial[0], clientY - tf.initial[1]];
            return tf;
        });
    }

    function mouseWheel(e, val = 1) {
        if (mousedown) return;
        let { deltaY, clientX, clientY } = e;
        if (deltaY > 0) {
            if (zoom === 2) return;
            setZoom(zoom - val);
        } else {
            if (zoom === 15) return;
            setZoom(zoom + val);
        }
        return transform(tf => {
            // This is because setZoom is async, but we want to use it right now. So we just build it ourselves
            const newScale = (deltaY > 0 ? zoom - val : zoom + val) / 10;
            // These are the true pixel coordinates of the mouse on the image at normal scale
            const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
            // Apply the new scale to the true pixel coords, and add the clientX / clientY, because we subtracted it in zoomTarget.
            tf.pos[0] = -imageX * newScale + clientX;
            tf.pos[1] = -imageY * newScale + clientY;
            return tf;
        });
    }

    function centerCoords(centerScale = 12, modifier = [0, 0], newTile) {
        const tile = newTile ? newTile : tf.selectedTile;
        // Default to max 1.2 scale, optional arg to change this
        setZoom(centerScale);
        const newScale = centerScale / 10;
        const [tileX, tileY] = [
            (tile[0] - 1 + modifier[0]) * 32 * newScale,
            -(tile[1] - 303 + modifier[1]) * 32 * newScale,
        ];
        const [centerX, centerY] = [window.screen.width / 2, window.screen.height / 2];
        return transform(tf => {
            tf.pos[0] = -tileX + centerX;
            tf.pos[1] = -tileY + centerY;
            return tf;
        });
    }

    function keyDown(e) {
        if (!focussed) return;
        let { key } = e;
        if (key === '5') return centerCoords(zoom);
        let acceptableKeys = {
            w: [0, 1],
            a: [-1, 0],
            s: [0, -1],
            d: [1, 0],
            ArrowUp: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowDown: [0, -1],
            ArrowRight: [1, 0],
            '1': [-1, -1],
            '2': [0, -1],
            '3': [1, -1],
            '4': [-1, 0],
            '6': [1, 0],
            '7': [-1, 1],
            '8': [0, 1],
            '9': [1, 1],
            '+': 2,
            '-': -2,
        };
        if (!Object.keys(acceptableKeys).includes(key)) return;
        else {
            const val = acceptableKeys[key];
            if (key === '+' || key === '-') {
                if (key === '+' && zoom >= 15) return;
                if (key === '-' && zoom <= 3) return;
                setZoom(zoom + val);
                return centerCoords(zoom + val);
            }
            centerCoords(zoom, val);
            return transform(tf => {
                tf.selectedTile[0] += val[0];
                tf.selectedTile[1] += val[1];
                return tf;
            });
        }
    }
};

export default withStyles(styles)(Main);
