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
    const [tf, transform] = useState({ initial: [0, 0], pos: [-1300, -1300] });
    const [zoom, setZoom] = useState(5);
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
        const { clientX, clientY } = e;
        return transform(tf => {
            tf.initial = [clientX - tf.pos[0], clientY - tf.pos[1]];
            return tf;
        });
    }

    function mouseMove(e) {
        if (!scrolling) return;
        const { clientX, clientY } = e;
        return transform(tf => {
            tf.pos = [clientX - tf.initial[0], clientY - tf.initial[1]];
            return tf;
        });
    }

    function mouseWheel(e) {
        if (scrolling) return;
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
            // Zoom target = your mouse coord relative to the image, I.E clientX - tf.pos[0], at the OLD scale.
            const zoomTarget = [(clientX - tf.pos[0]) / scale, (clientY - tf.pos[1]) / scale];
            // Apply the new scale to the zoom target, and add the clientX / clientY, because we subtracted it in zoomTarget.
            tf.pos[0] = -zoomTarget[0] * newScale + clientX;
            tf.pos[1] = -zoomTarget[1] * newScale + clientY;
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
