import React from 'react';
import Label from '../Controls/Label/Label';
import styles from './row.module.css';

function generateCorrectControl(row){
    let arrayOfControlJSX = [];

    arrayOfControlJSX = row.controls.map((control, index) => {
        // if(control.ControlType === 'LabelList'){
        //     return <Label control={control} key={index} />
        // }
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