import React from 'react';

function Label({control}){

    const labelStyles = {
        fontFamily: control.Font.Name,

    };

    return(
        <h1>
            This is a label
        </h1>
    )
}

export default Label;