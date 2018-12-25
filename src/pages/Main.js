import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
    },
    image: {
        verticalAlign: 'middle',
    },
});

const Main = props => {
    const { classes } = props;
    const [zoom, setZoom] = useState(20);
    const [imgUrls, pushUrls] = useState([]);

    useEffect(() => {
        pushUrls(genUrls());
    }, []);

    const imgStyle = {
        width: 1200 * (zoom / 30),
        height: 1200 * (zoom / 30),
    };

    const divStyle = {
        width: 1200 * 8 * (zoom / 30),
        height: 1200 * 8 * (zoom / 30),
    };

    return (
        <div className={classes.main} style={divStyle} onWheel={e => wheel(e)}>
            {imgUrls.map(url => {
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

    function wheel(e) {
        if (e.deltaY > 0) {
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
