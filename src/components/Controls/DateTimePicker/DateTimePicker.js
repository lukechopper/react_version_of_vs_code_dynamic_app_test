import React from 'react';

function DateTimePicker({control, marginLeft}){

    const dateTimePickerStyles = {
        fontFamily: control.Font.Name,
        fontSize: control.Font.Size+'px',
        marginLeft: marginLeft+'px',
        width: control.Size.Width+'px',
        height: control.Size.Height+'px'
    }
    

    return(
        <>
        <input type="date" name={control.Name} style={dateTimePickerStyles} />
        </>
    )
}

export default DateTimePicker;