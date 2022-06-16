import React from 'react';

function Button({control, marginLeft, topOffset}){

    const buttonStyles = {
        fontFamily: control.Font.Name,
        fontSize: control.Font.Size+'px',
        marginLeft: marginLeft+'px',
        marginTop: topOffset+'px',
        width: control.Size.Width+'px',
        height: control.Size.Height+'px',
        cursor: 'pointer'
    }
    

    return(
        <button type="button" name={control.Name} style={buttonStyles}>{control.Text}</button>
    )
}

export default Button;