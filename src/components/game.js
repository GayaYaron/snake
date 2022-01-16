import { useState } from "react";
import { Cell } from "./cell";

function GameComp(props) {
    const [cells, setCells] = useState([]);

    const cols = 17;
    const rows = 22;
    const boardSize = cols*rows;

    const createCells = () => {
        const cellArr = [];
        for(let i=0; i<boardSize; i++) {
            cellArr.push(<Cell key={i} role={}/>);
        }
    }

    const getInitialRoles = (index) => {
        
    }

    const isBorder = (index) => {
        const insideBoard = (index>0) && (index<boardSize);
        const isTopRow = index<cols;
        const isLeftCol = index%cols===0;
        const isBottomRow = index>cols*(rows-1);
        const isRightCol = (index+1)%cols===0;

        return insideBoard && (isTopRow || isLeftCol || isBottomRow || isRightCol);
    }

    return (
        <div className="board">

        </div>
    )
}