import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import spaceTile from '../space.png';

const styles = theme => ({
    main: {
        backgroundImage: `url(${spaceTile})`,
        width: 1200 * 8,
        height: 1200 * 8,
    },
    image: {
        verticalAlign: 'middle',
    },
});

const Main = props => {
    const { classes, theme } = props;
    const [imgUrls, pushUrls] = useState([]);
    const [zoom, setZoom] = useState(0.2);

    useEffect(() => {
        pushUrls(genUrls());
    }, []);

    return (
        <div className={classes.main} onWheel={e => console.log(e)}>
            {imgUrls.map(url => {
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
    );

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

export default withStyles(styles, { withTheme: true })(Main);
