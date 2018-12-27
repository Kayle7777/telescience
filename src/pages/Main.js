import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';
import disableScroll from 'disable-scroll';
import Images from '../components/Images';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
        display: 'block',
    },
    image: {
        verticalAlign: 'middle',
        width: 1200,
        height: 1200,
    },
    noClick: {
        userSelect: 'none',
        WebkitUserDrag: 'none',
    },
});

const Main = props => {
    const { classes } = props;
    const [tf, transform] = useState({
        initial: [0, 0],
        pos: [130, 130],
        selectedTile: [0, 0],
    });
    const [zoom, setZoom] = useState(10);
    const scale = zoom / 10;
    const [moved, move] = useState(false);
    const [mousedown, click] = useState(false);
    //eslint-disable-next-line
    const [selectedMap, selectMap] = useState('cogmap1');

    useEffect(() => {
        disableScroll.on();
    }, []);

    const iStyles = {
        divStyle: {
            width: 1200 * 8,
            height: 1200 * 8,
            transformOrigin: `0 0`,
            transform: `translate3D(${tf.pos[0]}px, ${tf.pos[1]}px, 0) scale(${scale})`,
        },
        // Here top and left need to be placed upon the image
        svgStyle: {
            zIndex: 1,
            position: 'absolute',
            left: tf.selectedTile[0] * 32 * scale + tf.pos[0],
            top: tf.selectedTile[1] * 32 * scale + tf.pos[1],
        },
    };

    const Svg = () => (
        <svg
            onClick={() =>
                transform(tf => {
                    tf.selectedTile = [0, 0];
                    return tf;
                })
            }
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
        <>
            <Svg />
            <div
                className={`${classes.main} ${classes.noClick}`}
                style={iStyles.divStyle}
                onMouseLeave={() => click(false)}
                onMouseUp={e => mouseUp(e)}
                onMouseDown={e => mouseDown(e)}
                onMouseMove={e => mouseMove(e)}
                onWheel={e => mouseWheel(e)}
            >
                <Images image={`${classes.image} ${classes.noClick}`} selectedMap={selectedMap} />
            </div>
        </>
    );

    function mouseUp(e) {
        click(false);
        const { clientX, clientY } = e;
        // This works because mouseMove never fires unless you actually move the mouse. If mouseMove fires, we don't want to continue the rest of this.
        if (moved) return move(false);
        else moved && move(false);
        // get mouse coordinates on image, relative to scale
        const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
        // clickTile is the function for to move the SVG. Needs to accept an array of coordinates, which have to be calculated here
        transform(tf => {
            tf.selectedTile = [(imageX - (imageX % 32)) / 32, (imageY - (imageY % 32)) / 32];
            return tf;
        });
    }

    function mouseDown(e) {
        click(true);
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
            if (zoom === 3) return;
            setZoom(zoom - 1);
        } else {
            setZoom(zoom + 1);
        }
        return transform(tf => {
            // This is because setZoom is async, but we want to use it right now. So we just build it ourselves
            const newScale = (deltaY > 0 ? zoom - 1 : zoom + 1) / 10;
            // These are the true pixel coordinates of the mouse on the image at normal scale
            const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
            const [tileX, tileY] = [clientX - tf.selectedTile[0], clientY - tf.selectedTile[0]].map(i => i / scale);
            // Apply the new scale to the true pixel coords, and add the clientX / clientY, because we subtracted it in zoomTarget.
            tf.pos[0] = -imageX * newScale + clientX;
            tf.pos[1] = -imageY * newScale + clientY;
            return tf;
        });
    }
};

export default withStyles(styles)(Main);
