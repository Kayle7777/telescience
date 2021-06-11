import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu, Button } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import spaceTile from '../space.png';
import Images from '../components/Images';
import Overlay from '../components/Overlay';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
        display: 'block',
        width: 1200 * 8,
        height: 1200 * 8,
        // transition: theme.transitions.create(['transform'], {
        //     duration: 100,
        // }),
    },
    image: {
        verticalAlign: 'middle',
        width: 1200,
        height: 1200,
    },
    imageUnclicked: {
        cursor: 'grab',
    },
    imageClicked: {
        cursor: 'grabbing',
    },
    noClick: {
        userSelect: 'none',
    },
});

const Main = props => {
    const { classes } = props;
    // tf.mouse is used to determine if the mouse moved during onClick
    const [tf, transform] = useState({
        initial: [0, 0],
        mouse: [0, 0],
        pos: [-2200, -2000],
        selectedTile: [139, 192],
    });
    const [selectedMap, selectMap] = useState('cogmap1');
    const [favorites, modFavorites] = useState({
        cogmap1: [
            { name: 'Telescience', location: [112, 123] },
            { name: 'AI core', location: [137, 146] },
        ],
        cogmap2: [
            { name: 'Telescience', location: [104, 120] },
            { name: 'AI core', location: [190, 220] },
        ],
        faintSignal: [
            { name: 'RobustTec Implants', location: [266, 132] },
            { name: 'Phaser', location: [285, 162] },
        ],
        oshan: [
            { name: 'AI Core', location: [196, 159] },
            { name: 'Telescience', location: [181, 174] },
        ],
        clarion: [
            { name: 'AI Core', location: [133, 99] },
            { name: 'Telescience', location: [153, 107] },
        ],
        destiny: [
            { name: 'AI Core', location: [154, 141] },
            { name: 'Telescience', location: [174, 104] },
        ],
        atlas: [
            { name: 'AI Core', location: [144, 180] },
            { name: 'Telescience', location: [140, 164] },
        ],
        samedi: [],
        horizon: [
            { name: 'AI Core', location: [114, 119] },
            { name: 'Telescience', location: [235, 154] },
        ],
        mushroom: [
            { name: 'AI Core', location: [185, 40] },
            { name: 'Telescience', location: [134, 103] },
        ],
        manta: [
            { name: 'AI Core', location: [145, 169] },
            { name: 'Telescience', location: [169, 128] },
        ],
        kondaru: [
            { name: 'AI Core', location: [217, 161] },
            { name: 'Telescience', location: [123, 92] },
        ],
        donut2: [
            { name: 'AI Core', location: [241, 73] },
            { name: 'Telescience', location: [251, 208] },
        ],
        fleet: [
            { name: 'AI Core', location: [128, 98] },
            { name: 'Telescience', location: [114, 69] },
        ],
        donut3: [
            { name: 'AI Core', location: [136, 133] },
            { name: 'Telescience', location: [156, 76] },
            { name: 'Clown Asylum', location: [244, 244] },
        ],
    });
    const [zoom, setZoom] = useState(7);
    const scale = zoom / 10;
    // mousedown / clickDown used for wheel and mousemove events
    const [mousedown, clickDown] = useState(false);
    // focussed / focus used for keydown events.
    const [focussed, focus] = useState(false);
    // menu / doMenu used for menu events (obviously)
    const [menu, doMenu] = useState({ mouse: [0, 0], target: null });

    // Check for an existing localStorage item, if it is different than the existing state localStorage item, set it as the state.
    useEffect(() => {
        const data = getStorage();
        if (data) modFavorites(data);
    }, []);

    // Set a new localStorage item every time a favorite is added or removed
    useEffect(
        () => {
            setStorage(favorites);
        },
        [JSON.stringify(favorites)]
    );

    const iStyles = {
        divStyle: {
            transformOrigin: `0 0`,
            transform: `translate3D(${tf.pos[0]}px, ${tf.pos[1]}px, 0) scale(${scale})`,
        },
        selectorStyle: {
            zIndex: 1,
            position: 'fixed',
            ...tilePosition(tf.selectedTile),
        },
    };

    const Svg = props => (
        <svg
            onClick={props.onClick}
            onWheel={props.onWheel ? props.onWheel : mouseWheel}
            onMouseDown={props.mouseDown}
            onMouseEnter={() => focus(true)}
            onContextMenu={props.onContextMenu ? props.onContextMenu : e => e.preventDefault()}
            className={`${classes.noClick} ${classes.imageUnclicked}`}
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
            {selectedMap === 'oshan' &&
                easterEgg(
                    // Ocean man OR sea of love
                    {
                        link:
                            Math.round(Math.random()) === 0
                                ? 'https://www.youtube.com/watch?v=6E5m_XtCX3c'
                                : 'https://youtu.be/3PgwDlbdew8?t=10',
                        pos: [150, 150],
                    },
                    // Tiburón bebé
                    { link: 'https://youtu.be/XqZsoesa55w?t=12', pos: [3, 4], color: '#6D7373' }
                )}
            <Overlay
                selectedTile={tf.selectedTile}
                centerCoords={centerCoords}
                selectMap={selectMap}
                selectedMap={selectedMap}
                zoom={zoom}
                favorites={favorites}
                modFavorites={modFavorites}
                transform={transform}
            />
            <div
                onMouseLeave={() => {
                    clickDown(false);
                    return focus(false);
                }}
                onMouseEnter={() => focus(true)}
                onContextMenu={contextMenu}
                onClick={mouseClick}
                onMouseDown={mouseDown}
                onMouseUp={() => clickDown(false)}
                onMouseMove={mouseMove}
                onWheel={mouseWheel}
            >
                <div className={classes.main} style={iStyles.divStyle}>
                    <Images
                        image={`${classes.image} ${classes.noClick} ${
                            mousedown ? classes.imageClicked : classes.imageUnclicked
                        }`}
                        selectedMap={selectedMap}
                    />
                </div>
                {favorites[selectedMap].length > 0 &&
                    favorites[selectedMap].map(fav => {
                        return (
                            <svg
                                key={`${fav.location.toString()}_SVG`}
                                onContextMenu={e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    return modFavorites(prev => ({
                                        ...prev,
                                        [selectedMap]: prev[selectedMap].filter(item => item !== fav),
                                    }));
                                }}
                                style={{
                                    zIndex: 1,
                                    position: 'fixed',
                                    ...tilePosition(fav.location),
                                }}
                                className={`${classes.noClick} ${classes.imageUnclicked}`}
                                width={32 * scale}
                                height={32 * scale}
                            >
                                <rect
                                    width={`${32 * scale}px`}
                                    height={`${32 * scale}px`}
                                    stroke="#39FF14"
                                    fill="transparent"
                                    strokeWidth="4"
                                />
                            </svg>
                        );
                    })}
            </div>
            <Svg
                color="white"
                style={iStyles.selectorStyle}
                onClick={() => transform(tf => ({ ...tf, selectedTile: [1, 1] }))}
                onContextMenu={contextMenu}
            />
            <Menu
                MenuListProps={{ disablePadding: true }}
                open={Boolean(menu.target)}
                anchorEl={menu.target}
                anchorPosition={{ top: menu.mouse[1], left: menu.mouse[0] }}
                anchorReference={'anchorPosition'}
                onContextMenu={e => {
                    e.preventDefault();
                    return closeMenu();
                }}
                onClose={() => closeMenu()}
            >
                <Button size="small" onClick={menuButtonClick}>
                    favorite
                </Button>
            </Menu>
        </div>
    );

    // This is used to place each tile selector over the image container just as if it had the 300/300 grid the game does.
    function tileMath(x, y) {
        return [1 + (x - (x % 32)) / 32, 300 - (y - (y % 32)) / 32];
    }

    // This is used to position each tile selector correctly, this is the CSS value applied to its absolute position.
    function tilePosition(x, y) {
        if (!y && typeof x === 'object') [x, y] = x;
        return {
            left: (x - 1) * 32 * scale + tf.pos[0],
            top: -(y - 300) * 32 * scale + tf.pos[1],
        };
    }

    // This is used to find the absolute pixel value of where a user clicked. The positioning of the image needs to be
    // subtracted from the X and Y value of a users click, and the scale needs to be removed to find this value.
    function imgCoords(x, y, funcScale = scale, pos = tf.pos) {
        return [x - pos[0], y - pos[1]].map(i => i / funcScale);
    }

    function mouseClick(e) {
        const { clientX, clientY } = e;
        // Detect if we moved
        if (tf.mouse[0] !== clientX || tf.mouse[1] !== clientY) return;
        return transform(tf => ({ ...tf, selectedTile: tileMath(...imgCoords(clientX, clientY)) }));
    }

    function mouseDown(e) {
        clickDown(true);
        const { clientX, clientY } = e;
        return transform(tf => ({ ...tf, mouse: [clientX, clientY], initial: imgCoords(clientX, clientY, 1) }));
    }

    function mouseMove(e) {
        if (!mousedown) return;
        const { clientX, clientY } = e;
        return transform(tf => ({ ...tf, pos: imgCoords(clientX, clientY, 1, tf.initial) }));
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
        const newScale = (deltaY > 0 ? zoom - val : zoom + val) / 10;
        const [imageX, imageY] = imgCoords(clientX, clientY);
        return transform(tf => ({ ...tf, pos: [-imageX * newScale + clientX, -imageY * newScale + clientY] }));
    }

    function centerCoords(centerScale = 12, modifier = [0, 0], newTile) {
        const tile = newTile ? newTile : tf.selectedTile;
        // Default to 1.2 scale, optional arg to change this
        setZoom(centerScale);
        const newScale = centerScale / 10;
        const [tileX, tileY] = [
            (tile[0] - 1 + modifier[0]) * 32 * newScale,
            -(tile[1] - 303 + modifier[1]) * 32 * newScale,
        ];
        const [centerX, centerY] = [window.screen.width / 2, window.screen.height / 2];
        return transform(tf => ({ ...tf, pos: [-tileX + centerX, -tileY + centerY] }));
    }

    function keyDown(e) {
        if (!focussed) return;
        let { key, altKey } = e;
        if (!altKey) return;
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
            return transform(tf => ({
                ...tf,
                selectedTile: [tf.selectedTile[0] + val[0], tf.selectedTile[1] + val[1]],
            }));
        }
    }

    function contextMenu(e) {
        e.preventDefault();
        const { clientX, clientY, target } = e;
        return doMenu(prev => ({ ...prev, target: target, mouse: [clientX, clientY] }));
    }

    function menuButtonClick(e) {
        closeMenu();
        return modFavorites(prev => {
            prev[selectedMap].push({
                name: `Favorite #${prev[selectedMap].length + 1}`,
                location: tileMath(...imgCoords(menu.mouse[0], menu.mouse[1])),
            });
            return prev;
        });
    }

    function closeMenu() {
        return doMenu(prev => ({ ...prev, target: null }));
    }

    function setStorage(favs) {
        if (typeof favs !== 'string') favs = JSON.stringify(favs);
        localStorage.setItem('telescienceFavorites', favs);
    }

    function getStorage() {
        let data = localStorage.getItem('telescienceFavorites');
        if (!data) return false;
        data = JSON.parse(data);
        let localKeys = Object.keys(data),
            stateKeys = Object.keys(favorites);
        if (localKeys.length !== stateKeys.length || JSON.stringify(localKeys) !== JSON.stringify(stateKeys)) {
            let missingKey = stateKeys.filter(oKey => !localKeys.includes(oKey));
            let extraKey = localKeys.filter(oKey => !stateKeys.includes(oKey));
            if (missingKey.length) {
                missingKey.forEach(key => {
                    let obj = {};
                    obj[key] = favorites[key];
                    data = { ...data, ...obj };
                });
            }
            if (extraKey.length) {
                extraKey.forEach(key => {
                    let obj = {};
                    localKeys.pop(...extraKey);
                    localKeys.forEach(key => {
                        obj[key] = data[key];
                    });
                    data = obj;
                });
            }
        }
        return data;
    }

    function easterEgg(...args) {
        return (
            <>
                {args.map((info, i) => {
                    if (!info.pos) info.pos = [150 + i, 151 + i];
                    info.pos[0]--;
                    info.pos[1] = 300 - info.pos[1];
                    return (
                        <a
                            key={`easteregg#${i + 1}`}
                            style={{ color: 'inherit' }}
                            href={info.link}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Info style={{ ...easterEggPos(...info.pos), color: info.color }} />
                        </a>
                    );
                })}
            </>
        );
    }

    function easterEggPos(x, y) {
        return {
            zIndex: 2,
            position: 'absolute',
            left: x * 32 * scale + tf.pos[0],
            top: y * 32 * scale + tf.pos[1],
            width: 32 * scale,
            height: 32 * scale,
        };
    }
};

export default withStyles(styles)(Main);
