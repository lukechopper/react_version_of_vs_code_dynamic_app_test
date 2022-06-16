import React from 'react';

function TextBox({control, marginLeft, topOffset}){

    const textBoxStyles = {
        fontFamily: control.Font.Name,
        fontSize: control.Font.Size+'px',
        marginLeft: marginLeft+'px',
        marginTop: topOffset+'px',
        width: control.Size.Width+'px',
        height: control.Size.Height+'px'
    }
    

    return(
        <input type="text" name={control.Name} style={textBoxStyles} />
    )
}

export default TextBox;