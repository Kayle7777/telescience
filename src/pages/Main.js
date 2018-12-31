import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';
import Images from '../components/Images';
import DoMath from '../components/DoMath';
import MapSelect from '../components/MapSelect';

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
        pos: [-1300, -1300],
        selectedTile: [137, 146],
    });
    const [zoom, setZoom] = useState(5);
    const scale = zoom / 10;
    const [moved, move] = useState(false);
    const [mousedown, clickDown] = useState(false);
    const [selectedMap, selectMap] = useState('cogmap1');

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
        <div className={classes.noClick}>
            <MapSelect selectMap={selectMap} selectedMap={selectedMap} />
            <DoMath selectedTile={tf.selectedTile} transform={transform} centerFunc={centerCoords} />
            <div
                className={classes.main}
                style={iStyles.divStyle}
                onMouseLeave={() => clickDown(false)}
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

    function mouseWheel(e) {
        if (mousedown) return;
        let { deltaY, clientX, clientY } = e;
        if (deltaY > 0) {
            if (zoom === 2) return;
            setZoom(zoom - 1);
        } else {
            if (zoom === 15) return;
            setZoom(zoom + 1);
        }
        return transform(tf => {
            // This is because setZoom is async, but we want to use it right now. So we just build it ourselves
            const newScale = (deltaY > 0 ? zoom - 1 : zoom + 1) / 10;
            // These are the true pixel coordinates of the mouse on the image at normal scale
            const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
            // Apply the new scale to the true pixel coords, and add the clientX / clientY, because we subtracted it in zoomTarget.
            tf.pos[0] = -imageX * newScale + clientX;
            tf.pos[1] = -imageY * newScale + clientY;
            return tf;
        });
    }

    function centerCoords(centerScale = 15) {
        // Default to max 1.5 scale, optional arg to change this
        setZoom(centerScale);
        const newScale = centerScale / 10;
        const [tileX, tileY] = [(tf.selectedTile[0] - 1) * 32 * newScale, -(tf.selectedTile[1] - 303) * 32 * newScale];
        const [centerX, centerY] = [window.screen.width / 2, window.screen.height / 2];
        return transform(tf => {
            tf.pos[0] = -tileX + centerX;
            tf.pos[1] = -tileY + centerY;
            return tf;
        });
    }
};

export default withStyles(styles)(Main);
