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
    const [tf, transform] = useState({ initial: [0, 0], pos: [0, 0], zoomTarget: [0, 0], zoomPoint: [0, 0] });
    const [zoom, setZoom] = useState(10);
    const [scrolling, scroll] = useState(false);
    const scale = zoom / 10;

    useEffect(() => {
        disableScroll.on();
    }, []);

    const divStyle = {
        width: 1200 * 8,
        height: 1200 * 8,
        transformOrigin: `0 0`,
        transform: `translate3D(${tf.pos[0]}px, ${tf.pos[1]}px, 0) scale(${scale})`,
    };

    const imgStyle = {
        width: 1200,
        height: 1200,
        WebkitUserDrag: 'none',
    };

    return (
        <div
            className={classes.main}
            style={divStyle}
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
        const [xpos, ypos] = tf.pos;
        const { clientX, clientY } = e;
        return transform(tf => {
            tf.initial = [clientX - xpos, clientY - ypos];
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
            tf.pos = [currentX, currentY];
            return tf;
        });
    }

    function mouseWheel(e) {
        let { deltaY, clientX, clientY } = e;
        deltaY = Math.max(-1, Math.min(1, deltaY));
        if (deltaY > 0) {
            if (zoom === 3) return;
            setZoom(zoom - 1);
        } else {
            setZoom(zoom + 1);
        }

        let newScale = (deltaY > 0 ? zoom - 1 : zoom + 1) / 10;
        return transform(tf => {
            tf.zoomPoint[0] = clientX;
            tf.zoomPoint[1] = clientY;
            tf.zoomTarget[0] = (tf.zoomPoint[0] - tf.pos[0]) / scale;
            tf.zoomTarget[1] = (tf.zoomPoint[1] - tf.pos[1]) / scale;
            tf.pos[0] = -tf.zoomTarget[0] * newScale + tf.zoomPoint[0];
            tf.pos[1] = -tf.zoomTarget[1] * newScale + tf.zoomPoint[1];
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
