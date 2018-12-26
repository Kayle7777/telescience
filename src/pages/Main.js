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
    const [tf, transform] = useState([0, 0]);
    const [zoom, setZoom] = useState(10);
    const [scrolling, scroll] = useState(false);

    useEffect(() => {
        disableScroll.on();
    }, []);

    const r = zoom / 10;
    const divStyle = {
        width: 1200 * 8 * r,
        height: 1200 * 8 * r,
        transform: `matrix(${r}, 0, 0, ${r}, ${tf[0] * r}, ${tf[1] * r})`,
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
            onMouseDown={() => scroll(true)}
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

    function doTransform(e, tf) {
        // tf = [num, num]
        // e = event
        const { pageX, pageY, clientX, clientY } = e;
    }

    function mouseMove(e) {
        if (!scrolling) return;
        // transform();
    }

    function wheel(e) {
        if (e.deltaY > 0) {
            if (zoom === 1) return;
            setZoom(zoom - 1);
        } else if (e.deltaY < 0) {
            setZoom(zoom + 1);
        }
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
