import {createUniqueRowPositionArray, findRowPositionBasedOnTheRowAboveThisOne, sortAnArrayOfControlsOnLocationEitherXOrY,
    workOutWidthFromControlObject, beginANewRowSizeLeeway} from './utils';


/**
 * Take all objects manifesting each control on the original JSON object and insert them into an Array on their own standing.
 * @param {object} dynamicCodeGeneration – Original JSON object from JSON file
 * @returns {Array} – All objects manifesting each control respectively now harboured within their own Array sequentially as opposed to being held on their own Arrays, each belonging to their own fields on the original JSON file split up by their control type.
 */
function createAnArrayOfIndividualControlObjects(dynamicCodeGeneration){ 
    const arrayOfIndividualControlObjects = [];
    for(let key in dynamicCodeGeneration){ 
        const individualControlList = dynamicCodeGeneration[key];
        individualControlList.forEach(individualControl => {
            individualControl['ControlType'] = key;
            arrayOfIndividualControlObjects.push(individualControl);
        });
    }
    return arrayOfIndividualControlObjects;
 }

 /**
  * Create the rows our application needs based on an Array of controls.
  * @param {Array} arrayOfIndividualControlObjects – Array harbouring all of the objects manifesting each control respectively, originally from the JSON file, now ordered from closest to the top of the GUI to the ones furthest down on it: an order the row creation GUI that we are using here requires.
  * @returns {Array} – Array of objects with each object representing all the rows of our React GUI.
  */
 function createRowsForPositionObject(arrayOfIndividualControlObjects){
    const uniqueRowPositionArray = createUniqueRowPositionArray(arrayOfIndividualControlObjects);
     const positionObjects = [];
     let sameRowObj = null; let previousRowPositionAboveThisOne = null;
     for(let i = 0; i < arrayOfIndividualControlObjects.length; i++){
         let individualControl = arrayOfIndividualControlObjects[i];
         let rowPositionAboveThisOne = findRowPositionBasedOnTheRowAboveThisOne(individualControl, uniqueRowPositionArray);
         
         if(!sameRowObj){
             sameRowObj = {rowTop: rowPositionAboveThisOne, controls: [individualControl]}
         }else if(rowPositionAboveThisOne < beginANewRowSizeLeeway || rowPositionAboveThisOne === previousRowPositionAboveThisOne){
             sameRowObj.controls.push(individualControl);
         }else{
             positionObjects.push(sameRowObj);
             sameRowObj = null;
             i--;
         }
         previousRowPositionAboveThisOne = rowPositionAboveThisOne;
     }
     if(sameRowObj){ positionObjects.push(sameRowObj); }
     return positionObjects;
 }

 /**
  * Take the original rows array, as supplied by the 'createRowsForPositionObject' function, and modify it to calculate the margin that each, individual, control within a row needs to have for it to be properly spaced out from its proceeding element, whilst staying true to the layout as stipulated by the original JSON file, can be ascertained from this Array.
  * @param {Array} positionObjects – Array of rows, each of which containing objects manifesting controls as derived from the original JSON file, aka., the Array straight out of the 'createRowsForPositionObject' function.
  * @returns {Array} – Modified Array of rows, i.e., the Array this function was supplied with, with each of its rows now having an extra 'rowLeft' property representing the spacing, on the X axis, that each of its rows should be from each other at full screen size, ordered from the left of the row to the right of the row.
  */
 function calculateSpacingOfControlsWithinSameRow(positionObjects){
    positionObjects.forEach(row => {
        const rowControlsInOrder = sortAnArrayOfControlsOnLocationEitherXOrY(row['controls'], 'X');
        let startingXPosition = rowControlsInOrder[0]['Location']['X']; let startingWidth = workOutWidthFromControlObject(rowControlsInOrder[0]);
        row['rowLeft'] = [startingXPosition];
        rowControlsInOrder.slice(1).forEach(control => {
            row['rowLeft'].push(control['Location']['X'] - (startingXPosition + startingWidth));
            startingXPosition = control['Location']['X']; startingWidth = workOutWidthFromControlObject(control);
        });
    });
    return positionObjects;
 }

/**
 * Directly take in the JSON content and use it to return a new Array containing rows which jointly represent how the GUI of our web application should be structured.
 * @param {Object} dynamicCodeGeneration – The unadulterated contents straight from the original GUI config JSON file.
 */
function positionCalculator(dynamicCodeGeneration){ 
    let positionObjects = [];
    let arrayOfIndividualControlObjects = createAnArrayOfIndividualControlObjects(dynamicCodeGeneration);
    arrayOfIndividualControlObjects = sortAnArrayOfControlsOnLocationEitherXOrY(arrayOfIndividualControlObjects, 'Y');
    
    positionObjects = createRowsForPositionObject(arrayOfIndividualControlObjects);
    
    //Work out how far spaced individual controls within a row should be
    positionObjects = calculateSpacingOfControlsWithinSameRow(positionObjects);

    return positionObjects;
}

export default positionCalculator;