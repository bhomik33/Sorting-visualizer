import React from 'react';
import './SortingVisualizer.css';
import {getBubbleSortAnimations, getInsertionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';

const NUMBER_OF_ARRAY_BARS = 150;
const ANIMATION_SPEED_MS = 5;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i= 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5,950));
        }
        this.setState({array});
    }

    testBubbleSort() { 
        const javascriptSortedArray = this.state.array.slice().sort((a,b) => a - b);
        const sortedArray = getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < this.state.array.length; i++) {
            if (javascriptSortedArray.length !== sortedArray.length) console.log(false);
            if (javascriptSortedArray[i] !== sortedArray[i]) console.log(false); 
        }
        console.log(true);
    }




    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
           for(let i = 0; i < animations.length; i++){
            const isColorChange = i % 3 !== 2;
            if(isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 ===  0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS) 
            } else {
                setTimeout(() => {
                    const [barOneIdx, barTwoIdx] = animations[i -1];
                    const [barOneHeight, barTwoHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;                    
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                }, i * ANIMATION_SPEED_MS)
            }
        }

        


    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        var color = false;
        var isColorChange = false;
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < animations.length; i++) {
            isColorChange = !isColorChange;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';
                    console.log('color');
               }, i* ANIMATION_SPEED_MS)
            }
            else {
                setTimeout(() => {
                  const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
                  const barOneStyle = arrayBars[barOneIdx].style;
                   barOneStyle.height = `${barOneHeight}px`; 
                  const barTwoStyle = arrayBars[barTwoIdx].style;
                   barTwoStyle.height = `${barTwoHeight}px`;
                   barOneStyle.backgroundColor = 'turquoise';
                   barTwoStyle.backgroundColor = 'turquoise'; 
                }, i * ANIMATION_SPEED_MS)
            }
        }
    }

    selectionSort() {

    }


    quickSort() {

    }

    mergeSort() {

    }



    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
            {array.map((value,idx) => (
                <div className="array-bar" 
                    key={idx}
                    style={{height :`${value}px`}}>
                </div>
            ))}
            <div className="button-container">
            <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
            <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
            <button className="button" onClick={() => this.selectionSort()}>Selection Sort</button>
            <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
            </div>
        </div>

        )
    }
}

const randomIntFromInterval = (min, max) => {
    // the max and min, both are included
    return Math.floor(Math.random() * (max - min + 1) + min);
}