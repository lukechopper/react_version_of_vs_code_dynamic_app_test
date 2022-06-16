import React, {useEffect, useRef} from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import {workOutSizeInRelationToRatioForWidthOrHeight} from '../../../hooks/positionCalculator/utils';

function DateTimePicker({control, marginLeft, topOffset}){

    const datePickerEle = useRef(null);

    useEffect(() => {
        //Test whether a new date input falls back to a text input or not
        const test = document.createElement('input');
        try {
            test.type = 'date';
          } catch (e) {
            
          }
        //If it does, then we need to fall back and use jQuerys date picker as, clearly, our browser does not have a datepicker of its own.
          if(test.type === 'text'){
            $(datePickerEle.current).datepicker();
          }
    }, []);

    const dateTimePickerStyles = {
        fontFamily: control.Font.Name,
        fontSize: workOutSizeInRelationToRatioForWidthOrHeight(control.Font.Size, 'width')+'px',
        marginLeft: workOutSizeInRelationToRatioForWidthOrHeight(marginLeft, 'width')+'px',
        marginTop: workOutSizeInRelationToRatioForWidthOrHeight(topOffset, 'height')+'px',
        width: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Width, 'width')+'px',
        height: workOutSizeInRelationToRatioForWidthOrHeight(control.Size.Height, 'height')+'px'
    }

    return(
        <>
        <input type="date" name={control.Name} style={dateTimePickerStyles} ref={datePickerEle} />
        </>
    )
}

export default DateTimePicker;