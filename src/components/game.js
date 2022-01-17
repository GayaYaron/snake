import { useEffect, useState } from "react";
import { Cell } from "./cell";
import "../styles/game.css"

export function Game(props) {
    const [snakeCells, setSnakeCells] = useState([]);
    const [foodCell, setFoodCell] = useState(0);

    const cols = 17;
    const rows = 17;
    const boardSize = cols*rows;

    useEffect(() => {
        setInitialValues()
    },[]);

    const setInitialValues = () => {
        setSnakeCells([226,227,228]);
        setFoodCell(197);
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

    return (
        <div className="board">
            {createCells()}
        </div>
    )
}