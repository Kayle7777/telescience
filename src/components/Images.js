import React from 'react';

const Images = ({ selectedMap, image }) => {
    const info = mapInfo(selectedMap);
    return (
        <>
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
        </>
    );
    function mapInfo(selectedMap) {
        const info = {
            cogmap1: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/cogmap/z1`,
            },
            faintSignal: {
                nW: 8,
                nH: 8,
                url: `https://goonhub.com/images/maps/cogmap2/z3`,
            },
        };
        return info[selectedMap];
    }
};

export default Images;
