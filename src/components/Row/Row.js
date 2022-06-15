import React from 'react';
import Label from '../Controls/Label/Label';
import TextBox from '../Controls/TextBox/TextBox';
import Button from '../Controls/Button/Button';
import DateTimePicker from '../Controls/DateTimePicker/DateTimePicker';
import ComboBoxString from '../Controls/ComboBoxString/ComboBoxString';
import styles from './row.module.css';

function generateCorrectControl(row){
    let arrayOfControlJSX = [];

    arrayOfControlJSX = row.controls.map((control, index) => {
        if(control.ControlType === 'LabelList'){
            return <Label control={control} marginLeft={row.rowLeft[index]} key={index} />
        }
        if(control.ControlType === 'TextBoxList'){
            return <TextBox control={control} marginLeft={row.rowLeft[index]} key={index} />
        }
        if(control.ControlType === 'ButtonList'){
            return <Button control={control} marginLeft={row.rowLeft[index]} key={index} />
        }
        if(control.ControlType === 'DateTimePickerList'){
            return <DateTimePicker control={control} marginLeft={row.rowLeft[index]} key={index} />
        }
        if(control.ControlType === 'ComboBoxStringList'){
            return <ComboBoxString control={control} marginLeft={row.rowLeft[index]}  key={index} />
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