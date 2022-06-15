import React from 'react';

function ComboBoxString({control, marginLeft}){

    const comboBoxStringStyles = {
        fontFamily: control.Font.Name,
        fontSize: control.Font.Size+'px',
        marginLeft: marginLeft+'px',
        width: control.Size.Width+'px',
        height: control.Size.Height+'px'
    }
    

    return(
        <select name={control.Name} style={comboBoxStringStyles} >
        {control.DataSource.map((dataSource, index) => (
            <option value={dataSource} key={index} >{dataSource}</option>
        ))}
        </select>
    )
}

export default ComboBoxString;