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

    useEffect(() => {
        disableScroll.on();
    }, []);

    const r = zoom / 10;
    const divStyle = {
        width: 1200 * 8 * r,
        height: 1200 * 8 * r,
        transform: `matrix(${r}, 0, 0, ${r}, ${tf.offset[0]}, ${tf.offset[1]})`,
    };

    const imgStyle = {
        width: 1200 * (zoom / 10),
        height: 1200 * (zoom / 10),
        WebkitUserDrag: 'none',
    };

    return (
        <div
            className={classes.main}
            style={divStyle}
            onMouseUp={() => scroll(false)}
            onMouseDown={e => mouseDown(e)}
            onMouseMove={e => mouseMove(e)}
            onWheel={e => wheel(e)}
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
        transform(tf => {
            tf.initial = [(clientX - xOffset) * (zoom / 10), (clientY - yOffset) * (zoom / 10)];
            return tf;
        });
    }

    function doTransform(e) {
        let { clientX, clientY } = e;
        // const [xOffset, yOffset] = tf.offset;
        const [initialX, initialY] = tf.initial;
        let currentX = (clientX - initialX) * (zoom / 10),
            currentY = (clientY - initialY) * (zoom / 10);
        return transform(tf => {
            tf.offset = [currentX, currentY];
            return tf;
        });
    }

    function mouseMove(e) {
        if (!scrolling) return;
        doTransform(e);
    }

    function wheel(e) {
        if (e.deltaY > 0) {
            if (zoom === 1) return;
            setZoom(zoom - 1);
        } else if (e.deltaY < 0) {
            setZoom(zoom + 1);
        }
        console.log(doTransform(e));
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
