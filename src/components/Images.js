import React from 'react';

const Images = ({ selectedMap, image }) => {
    const info = mapInfo(selectedMap);
    return (
        <div onDragStart={e => e.preventDefault()}>
            {(() => {
                const arr = [];
                for (let i = 0; i < info.nW; i++) {
                    for (let g = 0; g < info.nH; g++) {
                        arr.push(`${i},${g}`);
                    }
                }
                return arr;
            })().map(url => {
                return <img className={image} key={url} alt={url} src={`${info.url}/${url}.png`} />;
            })}
        </div>
    );
    function mapInfo(selectedMap) {
        const info = {
            cogmap1: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/cogmap/z1`,
            },
            cogmap2: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/cogmap2/z1`,
            },
            faintSignal: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/cogmap2/z3`,
            },
            oshan: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/oshan/z1`,
            },
            clarion: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/clarion/z1`,
            },
            destiny: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/destiny/z1`,
            },
            samedi: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/samedi/z1`,
            },
        };
        return info[selectedMap];
    }
};

export default Images;
