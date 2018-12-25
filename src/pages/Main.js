import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

const Main = props => {
    const [imgUrls, pushUrls] = useState([]);

    useEffect(() => {
        pushUrls(genUrls());
    }, []);

    console.log(imgUrls);
    console.log(process.env.PUBLIC_URL);
    return (
        <div>
            {imgUrls.map(url => {
                return <img key={url} alt={url} src={require(`../../public/images/maps/cogmap1/${url}.png`)} />;
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

export default withStyles({})(Main);
