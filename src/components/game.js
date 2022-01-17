import { useEffect, useState } from "react";
import { Cell } from "./cell";
import "../styles/game.css"

export function Game(props) {
    const [snakeCells, setSnakeCells] = useState([]);
    const [foodCell, setFoodCell] = useState(0);
    const [direction, setDirection] = useState("");

    const cols = 17;
    const rows = 17;
    const boardSize = cols*rows;
    const easyMillis = 1000;
    const playing = false;

    useEffect(() => {
        setInitialValues()
    },[]);

    const setInitialValues = () => {
        setSnakeCells([226,227,228]);
        setHeadTail({head : 228, tail : 226});
        setFoodCell(197);
        setDirection("R");
    }

    const createCells = () => {
        const cellArr = [];
        for(let i=0; i<boardSize; i++) {
            cellArr.push(<Cell key={i} role={getRole(i)}/>);
        }
        return cellArr;
    }

    const getRole = (index) => {
        if(foodCell === index){
                return "FOOD";
        }else if(snakeCells.includes(index)){
            return "SNAKE";
        }else if(isBorder(index)){
            return "BORDER";
        }else {
            return "EMPTY";
        }
    }

    const isBorder = (index) => {
        const insideBoard = (index>=0) && (index<boardSize);
        const isTopRow = index<cols;
        const isLeftCol = index%cols===0;
        const isBottomRow = index>cols*(rows-1);
        const isRightCol = (index+1)%cols===0;

        return insideBoard && (isTopRow || isLeftCol || isBottomRow || isRightCol);
    }

    const delaySetPlaying = (value) => {
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(value);
            }, easyMillis);
          });
    }

    const nextHeadCell = () => {
        let nextCell = snakeCells[snakeCells.length-1];
        switch(direction) {
            case "R":
                nextCell+=1;
            case "U":
                nextCell-=cols;
            case "D":
                nextCell+=cols;
            default:
                nextCell-=1;
        }
        return nextCell;
    }

    const move = async () => {
        while(playing) {
            let isAlive = true;
            const headNext = nextHeadCell();
            while(playing) {
                let newCells = snakeCells;
                newCells = newCells.push(headNext);
                let tailIndex = 1;
                if(headNext === foodCell) {
                    tailIndex = 0;
                }else if(snakeCells.includes(headNext) || isBorder(headNext)) {
                    isAlive = false;
                }
                newCells = newCells.slice(tailIndex, newCells.length);
                playing = await delaySetPlaying(isAlive);
                
            }
        }
    }

    return (
        <div className="board">
            {createCells()}
        </div>
    )
}