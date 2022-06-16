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
 * The ratio representing how many of the current screen width of the Visual Studio companion program to this one – currently 816 pixels – is required to reach the current width of the screen of this web application when it is maximised to fullscreen: 1920 pixels since that is the width of a standard fullscreen desktop monitor.
 * @type {number}
 */
const widthScale = window.innerWidth / 816;
/**
 * The ratio representing how many of the current screen height of the Visual Studio companion program to this one – currently 489 pixels – is required to reach the current height of the screen of this web application when it is maximised to fullscreen: approximately 1080 pixels, for 1080 is the height of a standard fullscreen desktop monitor, but some room wall always be sifted of this due to the menus of our browser and operating system respectively.
 * @type {number}
 */
const heightScale = window.innerHeight / 489;

/**
 * Takes a given quantity, whether it be representative of a size of a length, etc., and multiplies it by the determined scale factor – whether that be horizontally or vertically. In short, this is useful for scalling up the dimensions, originally intended to fit a windows form, so that, with the help of this function, they can be germane to the dimensions of a fullscreen browser window instead.
 * @param {number} size – value that you want to be multiplied up by the windows forms to browser window scale factor – whether that be horizontally or vertically – before having this multiplied value returned by this function. 
 * @param {String} dimension – determines whether the value you supplied for the prior argument will be multiplied by the horizontal scale factor or the vertical one.
 * @returns {number} – the result of multiplying the given size by the determined scale factor – whether it be horizontal or vertical.
 */
function workOutSizeInRelationToRatioForWidthOrHeight(size, dimension){
    if(dimension !== 'width' || dimension !== 'height'){
        throw new Error("Error for 'workOutSizeInRelationToRatioForWidthOrHeight' function: second argument must either be 'width' or 'height' – both String values.");
    }
    if(dimension === 'width'){
        return size * widthScale;
    }
    if(dimension === 'height'){
        return size * heightScale;
    }
}

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

/**
 * Ascertain the control/s with the smallest top offset within a row, so that controls, within the same row, with a lower top offset than this can be pushed down in relation to this value: the smallest top offset that this function is tasked with eliciting.
 * @param {Object} row – An individual row, aka., an individual object from the Array of objects or rows (same thing) that, once ascertained and then modified appropriately from the original JSON file, determines how our web app's GUI is composed. In other words, an individual object found within the Array yielded by the 'positionCalculator' function.
 * @returns {number} – The smallest top offset found within the given row.
 */
function calculateSmallestYPositionWithinRow(row){
    let smallestYPosition = row.controls[0].Location.Y;
    row.controls.slice(1).forEach(control => {
        if(control.Location.Y < smallestYPosition){
            smallestYPosition = control.Location.Y;
        }
    });
    return smallestYPosition;
}

export {createUniqueRowPositionArray, findRowPositionBasedOnTheRowAboveThisOne, sortAnArrayOfControlsOnLocationEitherXOrY, workOutWidthFromControlObject,
    beginANewRowSizeLeeway, calculateSmallestYPositionWithinRow, workOutSizeInRelationToRatioForWidthOrHeight}