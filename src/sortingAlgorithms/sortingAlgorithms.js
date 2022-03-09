/*
Bubble sort is a sorting algorithm which basically compares two adjacent elements
and swaps them if they are in wrong order
In order to slighty optimize this algorithm, in every iteration, we are not checking the last element
*/
export const getBubbleSortAnimations = (array) => {
    const animations = [];
    let isSorted = false;
    let counter = 0;
    while(!isSorted){
        isSorted = true
        for(let i = 0; i < array.length - counter -1; i++) {
            // color the array bars to red
            animations.push([i, i+1]);
            // switch the colors back to turquoise
            animations.push([i, i+1]);
            if(array[i] > array[i+1]){
                swap(i, i+1, array);
                isSorted = false
            }
            // push the values or height value in the animations array
                animations.push([array[i], array[i + 1]])
        }
        counter += 1;
    }
    return animations;
}


// Insertion sort is a sorting algorithm that builds a final sorted array
// by inserting one element at a time into the tentatively sorted list

export const getInsertionSortAnimations = (array) => {
    const animations = [];
    for(let i = 1; i < array.length; i++){
        let j = i;
        while(j>0 && array[j] < array[j-1]){
           // pushing the values into the animations array which we are comparing
            // for coloring them
            animations.push([j,j-1]);
            swap(j,j-1,array);
            // swapping the values if the left index is greater than the right index
            animations.push([j,j-1, array[j],array[j-1]])
            j -= 1;
        }
    }
    return animations;
}

// Selection sort is a sorting algorithm in which smallest element selected and from the unsorted array
// swapped with the leftmost element in the array

// one sublist represents the sorted number
// other list represents the unsorted number 
export const getSelectionSortAnimations = (array) => {
    const animations = [];
    let currentIdx = 0;
    while(currentIdx < array.length -1){
       let smallestIdx = currentIdx;
       for(let i = currentIdx + 1; i < array.length; i++){
           animations.push([currentIdx, i]);
           animations.push([currentIdx, i]);
           if(array[smallestIdx] > array[i]) {
               smallestIdx = i;
            } 
        }
        swap(currentIdx, smallestIdx, array);
        animations.push([currentIdx, smallestIdx]);
        animations.push([array[currentIdx], array[smallestIdx]]);
        currentIdx += 1;
    }
    return animations;
}


export const getMergeSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);

      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }


function swap(i,j,array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}