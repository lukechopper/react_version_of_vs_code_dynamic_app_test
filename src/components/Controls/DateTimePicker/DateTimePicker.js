import React, {useEffect, useRef} from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

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
        fontSize: control.Font.Size+'px',
        marginLeft: marginLeft+'px',
        marginTop: topOffset+'px',
        width: control.Size.Width+'px',
        height: control.Size.Height+'px'
    }

    return(
        <>
        <input type="date" name={control.Name} style={dateTimePickerStyles} ref={datePickerEle} />
        </>
    )
}

export default DateTimePicker;