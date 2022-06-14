import React from 'react';
import Row from '../Row/Row';

function GUIBuilder({positionObjects}){

    return(
        positionObjects.map((row, index) => (
            <Row key={index} row={row} />
        ))
    );
}

export default GUIBuilder;