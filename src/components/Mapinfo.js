import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import all from '../utils/mapdata';

const styles = theme => ({});

const Mapinfo = props => {
    const { classes, selectedMap, tileMath, imgCoords, imgPosition } = props;
    return <>{placeInfoMarkers(selectedMap)}</>;

    function placeInfoMarkers(selectedMap) {
        console.log(all[selectedMap]);
    }
};

export default withStyles(styles)(Mapinfo);
