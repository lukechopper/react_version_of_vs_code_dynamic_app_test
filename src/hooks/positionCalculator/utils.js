/**
 * Any difference in height, aka. y location, greater than this value between sequential controls will be treated as an opportunity to end the current row and begin a new one.
 * @type {number}
 */
const beginANewRowSizeLeeway = 5;
/**
 * The default width of a control providing that it has not come with a width of its own discretion. Very common for 'label' controls.
 * @type {number}
 */
const defaultControlWidth = 100;

/**
 * Returns an array harbouring, from small to high, the current y positions of each control.
 * @param {Array} arrayOfIndividualControlObjects – Array harbouring all of the objects manifesting each control respectively, originally from the JSON file
 * @returns {Array} – An ordered array of the unique y positions, i.e., the row position or absolute position from top, of each control from small to large.
 */
function createUniqueRowPositionArray(arrayOfIndividualControlObjects){
    const uniqueRowPositionArray = [];
    arrayOfIndividualControlObjects.forEach(individualControl => {
        if(!uniqueRowPositionArray.find(rowPos => rowPos === individualControl['Location']['Y'])){
            uniqueRowPositionArray.push(individualControl['Location']['Y']);
        }
    });
    uniqueRowPositionArray.sort((a,b) => a - b);
    return uniqueRowPositionArray;
}

/**
 * Works out how much margin-top the row that the incumbent control will belong to needs to have for it to be positioned truthfully to its config file.
 * @param {object} individualControl – Since this function will be called within a loop going through each control object, this parameter will represent each of these control objects one by one.
 * @param {Array} uniqueRowPositionArray – An ordered array of unique y positions, considering all the controls, viz., the array generated from the 'createUniqueRowPositionArray' function.
 * @returns {number} – Represents how much margin-top the row that the incumbent control will belong to needs to have for it to be positioned truthfully to its config file.
 */
function findRowPositionBasedOnTheRowAboveThisOne(individualControl, uniqueRowPositionArray){
    let rowPositionBasedOnAboveRow = 0;
    const currentRowPos = individualControl['Location']['Y'];
    //If the new row is the very first row
    if(currentRowPos <= uniqueRowPositionArray[0]){
        rowPositionBasedOnAboveRow = currentRowPos;
    }else if(currentRowPos > uniqueRowPositionArray[0]){
        let prevRowYPos = uniqueRowPositionArray[(uniqueRowPositionArray.indexOf(currentRowPos))-1];
        rowPositionBasedOnAboveRow = currentRowPos - prevRowYPos;
    }
    return rowPositionBasedOnAboveRow;
}

/**
 * Returns an ordered Array of controls based on the one passed into it, with the order – from lowest to highest – based on the 'Location' property specified via the second parameter.
 * @param {Array} arrayOfIndividualControlObjects – Array harbouring all of the objects manifesting each control respectively, originally from the JSON file
 * @param {String} xOrY – The 'Location' property that we want to order the controls by: either 'X' or 'Y' (needs to be capitalised).
 * @returns {Array} – The ordered Array of controls as derived from the one passed into it, viz., the first argument of this function.
 */
function sortAnArrayOfControlsOnLocationEitherXOrY(arrayOfIndividualControlObjects, xOrY){
    if(!xOrY){
        throw new SyntaxError('Second argument cannot be left out');
    }
    const sortedLocationArray = arrayOfIndividualControlObjects.sort((a, b) => {
        return (a['Location'][xOrY]>b['Location'][xOrY] ? 1 : -1);
    });
    return sortedLocationArray;
}

/**
 * 
 * @param {Object} controlObj – Individual control manifested within an Object, as initially derived from the JSON file.
 * @returns {number} – The width from the control supplied providing that it can be ascertained, if not, then simply use 100: the default that windows forms uses for controls that do not have explicit widths set.
 */
function workOutWidthFromControlObject(controlObj){
    if(!controlObj['Size']) return defaultControlWidth;
    let width = controlObj['Size']['Width'];
    return width;
}

export {createUniqueRowPositionArray, findRowPositionBasedOnTheRowAboveThisOne, sortAnArrayOfControlsOnLocationEitherXOrY, workOutWidthFromControlObject,
    beginANewRowSizeLeeway}