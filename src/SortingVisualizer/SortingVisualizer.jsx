import React from 'react';
import './SortingVisualizer.css';
import {getBubbleSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations, getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row,Col,Navbar, Nav, Button } from 'react-bootstrap';

const NUMBER_OF_ARRAY_BARS = 20;
const ANIMATION_SPEED_MS = 15;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array : []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i= 0; i < NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(5,700));
        }
        this.setState({array});
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


    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'red' : 'turquoise';
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    render() {
        const {array} = this.state;
        return (
            <>
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Sorting Visualizer</Navbar.Brand>
                <Nav className="me-auto">
                <Button  onClick={() => this.resetArray()} variant="primary">Generate New Array</Button>{' '}
                <Button  onClick={() => this.bubbleSort()} variant="primary">Bubble Sort</Button>{' '}
                <Button  onClick={() => this.insertionSort()} variant="primary">Insertion Sort</Button>{' '}
                <Button  onClick={() => this.mergeSort()} variant="primary">Merge Sort</Button>{' '}

                </Nav>
                </Container>
            </Navbar>
            <Container fluid>
            <Row>
            <Col> 
                <div className="array-container">
                {array.map((value,idx) => (
                    <div className="array-bar" 
                        key={idx}
                        style={{height :`${value}px`}}>
                    </div>
                ))}    
            </div>
                </Col>
            </Row>
            </Container>
            </>
           

        )
    }
}

const randomIntFromInterval = (min, max) => {
    // the max and min, both are included
    return Math.floor(Math.random() * (max - min + 1) + min);
}