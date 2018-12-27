import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';
import disableScroll from 'disable-scroll';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
        display: 'block',
        userSelect: 'none',
        WebkitUserDrag: 'none',
    },
    image: {
        verticalAlign: 'middle',
        width: 1200,
        height: 1200,
        userSelect: 'none',
        WebkitUserDrag: 'none',
    },
});

const Main = props => {
    const { classes } = props;
    const [tf, transform] = useState({ initial: [0, 0], pos: [-1300, -1300] });
    const [zoom, setZoom] = useState(5);
    const [mousedown, scroll] = useState(false);
    const scale = zoom / 10;

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
            top: 0,
            left: 0,
        },
    };

    // Here, [..., 30, 30] need to be calculated based on the rendered height / width of tiles
    // console.log(1200 * 8 * 38, 'number of "tiles"');
    const [minX, minY, width, height] = [0, 0, 30, 30];
    const Svg = () => (
        <svg width={width} height={height} style={iStyles.svgStyle}>
            <rect
                x={`${minX}px`}
                y={`${minY}px`}
                width={`${width}px`}
                height={`${height}px`}
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
                className={classes.main}
                style={iStyles.divStyle}
                onClick={e => mouseClick(e)}
                onMouseLeave={() => scroll(false)}
                onMouseUp={() => scroll(false)}
                onMouseDown={e => mouseDown(e)}
                onMouseMove={e => mouseMove(e)}
                onWheel={e => mouseWheel(e)}
            >
                {genUrls().map(url => {
                    return (
                        <img
                            className={classes.image}
                            key={url}
                            alt={url}
                            src={require(`../../public/images/maps/cogmap1/${url}.png`)}
                        />
                    );
                })}
            </div>
        </>
    );

    function mouseClick(e) {
        if (mousedown) return;
        // amount of pixels in the entire image
        let pixelNum = 1200 * 8 * 1200 * 8;
        let numOfTiles = pixelNum / 36;
        console.log(numOfTiles);
        const { clientX, clientY } = e;
        // get mouse coordinates on image, relative to scale
        // These are the "true" pixel coordinates of the mouse on the image and true scale
        const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
    }

    function mouseDown(e) {
        scroll(true);
        const { clientX, clientY } = e;
        return transform(tf => {
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

    function mouseWheel(e) {
        if (mousedown) return;
        let { deltaY, clientX, clientY } = e;
        if (deltaY > 0) {
            if (zoom === 3) return;
            setZoom(zoom - 1);
        } else {
            setZoom(zoom + 1);
        }

        // This is because setZoom is async, but we want to use it right now. So we just build it ourselves
        let newScale = (deltaY > 0 ? zoom - 1 : zoom + 1) / 10;
        return transform(tf => {
            // get mouse coordinates on image, relative to current scale
            // These are the "true" pixel coordinates of the mouse on the image
            const [imageX, imageY] = [clientX - tf.pos[0], clientY - tf.pos[1]].map(i => i / scale);
            // Apply the new scale to the true pixel coords, and add the clientX / clientY, because we subtracted it in zoomTarget.
            tf.pos[0] = -imageX * newScale + clientX;
            tf.pos[1] = -imageY * newScale + clientY;
            return tf;
        });
    }

    function genUrls() {
        const arr = [];
        for (let i = 0; i < 8; i++) {
            for (let g = 0; g < 8; g++) {
                arr.push(`${i},${g}`);
            }
        }
        return arr;
    }
};

export default withStyles(styles)(Main);
