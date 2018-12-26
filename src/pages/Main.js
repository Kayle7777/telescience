import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';
import disableScroll from 'disable-scroll';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
        display: 'block',
    },
    image: {
        verticalAlign: 'middle',
    },
});

const Main = props => {
    const { classes } = props;
    const [tf, transform] = useState({ initial: [0, 0], offset: [0, 0] });
    const [zoom, setZoom] = useState(10);
    const [scrolling, scroll] = useState(false);
    const r = zoom / 10;

    useEffect(() => {
        disableScroll.on();
    }, []);

    const divStyle = {
        width: 1200 * 8 * r,
        height: 1200 * 8 * r,
        transform: `matrix(${r}, 0, 0, ${r}, ${tf.offset[0] * r}, ${tf.offset[1] * r})`,
    };

    const imgStyle = {
        width: 1200 * r,
        height: 1200 * r,
        WebkitUserDrag: 'none',
    };

    return (
        <div
            className={classes.main}
            style={divStyle}
            onMouseUp={() => scroll(false)}
            onMouseDown={e => mouseDown(e)}
            onMouseMove={e => mouseMove(e)}
            onWheel={e => mouseWheel(e)}
        >
            {genUrls().map(url => {
                return (
                    <img
                        className={classes.image}
                        style={imgStyle}
                        key={url}
                        alt={url}
                        src={require(`../../public/images/maps/cogmap1/${url}.png`)}
                    />
                );
            })}
        </div>
    );

    function mouseDown(e) {
        scroll(true);
        const [xOffset, yOffset] = tf.offset;
        const { clientX, clientY } = e;
        let initialX = clientX - xOffset,
            initialY = clientY - yOffset;
        return transform(tf => {
            tf.initial = [initialX, initialY];
            return tf;
        });
    }

    function mouseMove(e) {
        if (!scrolling) return;
        let { clientX, clientY } = e;
        const [initialX, initialY] = tf.initial;
        let currentX = clientX - initialX,
            currentY = clientY - initialY;
        return transform(tf => {
            tf.offset = [currentX, currentY];
            return tf;
        });
    }

    function mouseWheel(e) {
        let { clientX, clientY } = e;
        if (e.deltaY > 0) {
            if (zoom === 1) return;
            setZoom(zoom - 1);
        } else if (e.deltaY < 0) {
            setZoom(zoom + 1);
        }

        // transform(tf => {
        //     const [xOffset, yOffset] = tf.offset;
        //     tf.offset = [xOffset, yOffset];
        //     return tf;
        // });
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
