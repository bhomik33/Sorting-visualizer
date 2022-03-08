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



function swap(i,j,array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}