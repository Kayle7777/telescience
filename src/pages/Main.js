import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu, Button } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import spaceTile from '../space.png';
import Images from '../components/Images';
import DoMath from '../components/DoMath';

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
});

const Main = props => {
    const { classes } = props;
    const [tf, transform] = useState({
        initial: [0, 0],
        mouse: [0, 0],
        pos: [-1300, -1300],
        selectedTile: [137, 146],
    });
    const [zoom, setZoom] = useState(5);
    const scale = zoom / 10;
    const [mousedown, clickDown] = useState(false);
    const [focussed, focus] = useState(false);
    const [menu, doMenu] = useState({ mouse: [0, 0], target: null, removeTarget: null });
    const [selectedMap, selectMap] = useState('cogmap1');
    const [favorites, modFavorites] = useState({ cogmap1: [], cogmap2: [], faintSignal: [], oshan: [], clarion: [] });

    const iStyles = {
        divStyle: {
            transformOrigin: `0 0`,
            transform: `translate3D(${tf.pos[0]}px, ${tf.pos[1]}px, 0) scale(${scale})`,
        },
        selectorStyle: {
            zIndex: 1,
            position: 'absolute',
            left: (tf.selectedTile[0] - 1) * 32 * scale + tf.pos[0],
            top: -(tf.selectedTile[1] - 300) * 32 * scale + tf.pos[1],
        },
        oceanMan: {
            zIndex: 2,
            position: 'absolute',
            left: 149 * 32 * scale + tf.pos[0],
            top: 150 * 32 * scale + tf.pos[1],
            width: 32 * scale,
            height: 32 * scale,
        },
    };
    const Svg = props => (
        <svg
            onClick={props.onClick}
            onWheel={e => mouseWheel(e)}
            onMouseEnter={() => focus(true)}
            onContextMenu={e => e.preventDefault()}
            className={classes.noClick}
            width={32 * scale}
            height={32 * scale}
            style={props.style}
        >
            <rect
                width={`${32 * scale}px`}
                height={`${32 * scale}px`}
                stroke={props.color}
                fill="transparent"
                strokeWidth="4"
            />
        </svg>
    );

    return (
        <div className={classes.noClick} onKeyDown={e => keyDown(e)} tabIndex={0}>
            {selectedMap === 'oshan' && (
                <a
                    style={{ color: 'inherit' }}
                    href="https://www.youtube.com/watch?v=6E5m_XtCX3c"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Info style={iStyles.oceanMan} />
                </a>
            )}
            <DoMath
                selectedTile={tf.selectedTile}
                transform={transform}
                centerCoords={centerCoords}
                selectMap={selectMap}
                selectedMap={selectedMap}
                zoom={zoom}
                favorites={favorites}
                modFavorites={modFavorites}
            />
            <div
                className={classes.main}
                style={iStyles.divStyle}
                onMouseLeave={() => {
                    clickDown(false);
                    focus(false);
                }}
                onMouseEnter={() => focus(true)}
                onContextMenu={e => contextMenu(e)}
                onClick={e => mouseClick(e)}
                onMouseDown={e => mouseDown(e)}
                onMouseUp={() => clickDown(false)}
                onMouseMove={e => mouseMove(e)}
                onWheel={e => mouseWheel(e)}
            >
                <Images image={`${classes.image} ${classes.noClick}`} selectedMap={selectedMap} />
            </div>
            <Svg
                color="white"
                style={iStyles.selectorStyle}
                onClick={() =>
                    transform(tf => {
                        tf.selectedTile = [1, 1];
                        return tf;
                    })
                }
            />
            <Menu
                MenuListProps={{ disablePadding: true }}
                open={Boolean(menu.target)}
                anchorEl={menu.target}
                anchorPosition={{ top: menu.mouse[1], left: menu.mouse[0] }}
                anchorReference={'anchorPosition'}
                onContextMenu={e => {
                    e.preventDefault();
                    closeMenu();
                }}
                onClose={() => closeMenu()}
            >
                <Button size="small" onClick={e => menuButtonClick(e)}>
                    favorite
                </Button>
            </Menu>
            {favorites[selectedMap].length > 0 &&
                favorites[selectedMap].map(fav => {
                    return (
                        <div
                            key={`${fav.location.toString()}_SVG`}
                            onContextMenu={e => {
                                const { target, clientX, clientY } = e;
                                doMenu(prev => {
                                    prev.removeTarget = target;
                                    prev.mouse = [clientX, clientY];
                                    return prev;
                                });
                            }}
                        >
                            <Svg
                                color="#39FF14"
                                style={{
                                    zIndex: 1,
                                    position: 'fixed',
                                    left: (fav.location[0] - 1) * 32 * scale + tf.pos[0],
                                    top: -(fav.location[1] - 300) * 32 * scale + tf.pos[1],
                                }}
                            />
                        </div>
                    );
                })}
        </div>
    );

    function mouseClick(e) {
        const { clientX, clientY } = e;
        if (tf.mouse[0] !== clientX || tf.mouse[1] !== clientY) return;
        const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
        transform(tf => {
            tf.selectedTile = [1 + (imageX - (imageX % 32)) / 32, 300 - (imageY - (imageY % 32)) / 32];
            return tf;
        });
    }

    function mouseDown(e) {
        clickDown(true);
        const { clientX, clientY } = e;
        return transform(tf => {
            tf.mouse = [clientX, clientY];
            tf.initial = [clientX - tf.pos[0], clientY - tf.pos[1]];
            return tf;
        });
    }

    function mouseMove(e) {
        if (!mousedown) return;
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
            const newScale = (deltaY > 0 ? zoom - val : zoom + val) / 10;
            const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
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
        if (key === '5' || key === ' ') return centerCoords(zoom);
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

    function contextMenu(e) {
        e.preventDefault();
        const { clientX, clientY, target } = e;
        doMenu(prev => {
            prev.target = target;
            prev.mouse = [clientX, clientY];
            return prev;
        });
    }

    function menuButtonClick(e) {
        closeMenu();
        const [imageX, imageY] = [menu.mouse[0] - tf.pos[0], menu.mouse[1] - tf.pos[1]].map(i => i / scale);
        // Add to favorites here
        modFavorites(prev => {
            prev[selectedMap].push({
                name: `Favorite # ${prev[selectedMap].length + 1}`,
                location: [1 + (imageX - (imageX % 32)) / 32, 300 - (imageY - (imageY % 32)) / 32],
            });
            return prev;
        });
    }

    function closeMenu() {
        doMenu(prev => {
            prev.target = null;
            prev.removeTarget = null;
            return prev;
        });
    }
};

export default withStyles(styles)(Main);
