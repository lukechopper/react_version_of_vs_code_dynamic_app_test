import React from 'react';
import Label from '../Controls/Label/Label';
import TextBox from '../Controls/TextBox/TextBox';
import Button from '../Controls/Button/Button';
import DateTimePicker from '../Controls/DateTimePicker/DateTimePicker';
import ComboBoxString from '../Controls/ComboBoxString/ComboBoxString';
import styles from './row.module.css';

function yieldControl(_control, _marginLeft, _topOffset, _key, Component){
    return <Component control={_control} marginLeft={_marginLeft} topOffset={_topOffset} key={_key} />
}

function generateCorrectControl(row){
    let arrayOfControlJSX = [];

    arrayOfControlJSX = row.controls.map((control, index) => {
        if(control.ControlType === 'LabelList'){
            return yieldControl(control, row.rowLeft[index], row.topOffsets[index], index, Label);
        }
        if(control.ControlType === 'TextBoxList'){
            return yieldControl(control, row.rowLeft[index], row.topOffsets[index], index, TextBox);
        }
        if(control.ControlType === 'ButtonList'){
            return yieldControl(control, row.rowLeft[index], row.topOffsets[index], index, Button);
        }
        if(control.ControlType === 'DateTimePickerList'){
            return yieldControl(control, row.rowLeft[index], row.topOffsets[index], index, DateTimePicker);
        }
        if(control.ControlType === 'ComboBoxStringList'){
            return yieldControl(control, row.rowLeft[index], row.topOffsets[index], index, ComboBoxString);
        }
        return <div key={index} style={{marginLeft: row.rowLeft[index]+'px'}}>{control.ControlType}</div>
    });

    return arrayOfControlJSX;
}

function Row({row}){

    return(
        <div style={{
            marginTop: row.rowTop
        }} className={styles.row}>
            {generateCorrectControl(row)}
        </div>
    )
}

export default Row;