import React from 'react';
import {workOutSizeInRelationToRatioForWidthOrHeight} from '../../../hooks/positionCalculator/utils';

function TextBox({control, marginLeft, topOffset}){

    const textBoxStyles = {
        fontFamily: control.Font.Name,
        fontSize: workOutSizeInRelationToRatioForWidthOrHeight(control.Font.Size, 'width')+'px',
        marginLeft: workOutSizeInRelationToRatioForWidthOrHeight(marginLeft, 'width')+'px',
        marginTop: workOutSizeInRelationToRatioForWidthOrHeight(topOffset, 'height')+'px',
        width: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Width, 'width')+'px',
        height: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Height, 'height')+'px'
    }
    

    return(
        <input type="text" name={control.Name} style={textBoxStyles} />
    )
}

export default TextBox;