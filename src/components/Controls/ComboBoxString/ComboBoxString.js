import React from 'react';
import {workOutSizeInRelationToRatioForWidthOrHeight} from '../../../hooks/positionCalculator/utils';

function ComboBoxString({control, marginLeft, topOffset}){

    const comboBoxStringStyles = {
        fontFamily: control.Font.Name,
        fontSize: workOutSizeInRelationToRatioForWidthOrHeight(control.Font.Size,'width')+'px',
        marginLeft: workOutSizeInRelationToRatioForWidthOrHeight(marginLeft,'width')+'px',
        marginTop: workOutSizeInRelationToRatioForWidthOrHeight(topOffset,'height')+'px',
        width: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Width,'width')+'px',
        height: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Height,'height')+'px'
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