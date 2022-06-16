import React from 'react';

function getLabelWidth(control){
    let returnWidth = '';
    if(control.Size){
        if(control.Size.Width) returnWidth = control.Size.Width+'px';
    }
    return returnWidth;
}

function Label({control, marginLeft, topOffset}){

    const labelStyles = {
        fontFamily: control.Font.Name,
        fontSize: control.Font.Size+'px',
        marginLeft: marginLeft+'px',
        marginTop: topOffset+'px',
        width: getLabelWidth(control),
    };

    return(
        <label style={labelStyles}>{control.Text}</label>
    )
}

export default Label;