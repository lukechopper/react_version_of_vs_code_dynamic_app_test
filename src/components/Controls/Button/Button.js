import React from 'react';
import {workOutSizeInRelationToRatioForWidthOrHeight} from '../../../hooks/positionCalculator/utils';

function Button({control, marginLeft, topOffset}){

    const buttonStyles = {
        fontFamily: control.Font.Name,
        fontSize: workOutSizeInRelationToRatioForWidthOrHeight(control.Font.Size, 'width')+'px',
        marginLeft: workOutSizeInRelationToRatioForWidthOrHeight(marginLeft, 'width')+'px',
        marginTop: workOutSizeInRelationToRatioForWidthOrHeight(topOffset, 'height')+'px',
        width: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Width, 'width')+'px',
        height: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Height, 'height')+'px',
        cursor: 'pointer'
    }
    

    return(
        <button type="button" name={control.Name} style={buttonStyles}>{control.Text}</button>
    )
}

export default Button;