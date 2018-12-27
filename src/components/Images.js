import React from 'react';

const Images = ({ selectedMap, image }) => {
    return (
        <>
            {(() => {
                const info = mapInfo(selectedMap);
                const arr = [];
                for (let i = 0; i < info.nW; i++) {
                    for (let g = 0; g < info.nH; g++) {
                        arr.push(`${i},${g}`);
                    }
                }
                return arr;
            })().map(url => {
                return (
                    <img
                        className={image}
                        key={url}
                        alt={url}
                        src={require(`../../public/images/maps/${selectedMap}/${url}.png`)}
                    />
                );
            })}
        </>
    );
    function mapInfo(selectedMap) {
        const info = {
            cogmap1: {
                nW: 8,
                nH: 8,
            },
            faintSignal: {
                nW: 8,
                nH: 8,
            },
        };
        return info[selectedMap];
    }
};

export default Images;
