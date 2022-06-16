import React from 'react';
import {workOutSizeInRelationToRatioForWidthOrHeight, defaultControlWidth} from '../../../hooks/positionCalculator/utils';

function getLabelWidth(control){
    let returnWidth = workOutSizeInRelationToRatioForWidthOrHeight(defaultControlWidth, 'width')+'px';
    if(control.Size){
        if(control.Size.Width) returnWidth = workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Width, 'width')+'px';
    }
    return returnWidth;
}

function Label({control, marginLeft, topOffset}){

    const labelStyles = {
        fontFamily: control.Font.Name,
        fontSize: workOutSizeInRelationToRatioForWidthOrHeight(control.Font.Size, 'width')+'px',
        marginLeft: workOutSizeInRelationToRatioForWidthOrHeight(marginLeft, 'width')+'px',
        marginTop: workOutSizeInRelationToRatioForWidthOrHeight(topOffset, 'height')+'px',
        width: getLabelWidth(control),
        whiteSpace: 'nowrap'
    };

    return(
        <label style={labelStyles}>{control.Text}</label>
    )
}

export default Label;