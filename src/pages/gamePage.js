import { useEffect, useState } from "react";
import { Cell } from "../components/cell";
import "../styles/game.css"
import { GamePosition } from "../model/GamePosition";
import { ArrowGrid } from "../components/arrowGrid";

export function GamePage(props) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [direction, setDirection] = useState("");

    const cols = 17;
    const rows = 17;
    const boardSize = cols * rows;
    let playing = false;

    useEffect(() => {
        if (playing) {
            setTimeout(move, currentPosition.delay);
        }
    }, [currentPosition]);

    const setInitialValues = () => {
        setCurrentPosition(new GamePosition([226, 227, 228], 197, 1000))
        setDirection("R");
    };

    const createCells = () => {
        if (currentPosition === null) {
            setInitialValues();
            return (
                <div>
                    Loading game...
                </div>
            )
        } else {
            const cellArr = [];
            for (let i = 0; i < boardSize; i++) {
                cellArr.push(<Cell key={i} role={getRole(i)} />);
            }
            return cellArr;
        }
    };

    const getRole = (index) => {
        if (currentPosition.food === index) {
            return "FOOD";
        } else if (currentPosition.snake.includes(index)) {
            return "SNAKE";
        } else if (isBorder(index)) {
            return "BORDER";
        } else {
            return "EMPTY";
        }
    }

    const isBorder = (index) => {
        const insideBoard = (index >= 0) && (index < boardSize);
        const isTopRow = index < cols;
        const isLeftCol = index % cols === 0;
        const isBottomRow = index > cols * (rows - 1);
        const isRightCol = (index + 1) % cols === 0;

        return insideBoard && (isTopRow || isLeftCol || isBottomRow || isRightCol);
    }

    const nextHeadCell = () => {
        let nextCell = currentPosition.snake[currentPosition.snake.length - 1];
        switch (direction) {
            case "R":
                nextCell += 1;
                break;
            case "U":
                nextCell -= cols;
                break;
            case "D":
                nextCell += cols;
                break;
            default:
                nextCell -= 1;
        }
        return nextCell;
    }

    const move = () => {
        let isAlive = true;
        const headNext = nextHeadCell();
        let snakeCells = currentPosition.snake;
        let tailIndex = 1;
        let foodIndex = currentPosition.food;
        let delayMillis = currentPosition.delay;

        if (headNext === foodIndex) {
            tailIndex = 0;
            foodIndex = generateFood();
            delayMillis *= 0.8;
        } else if (!isEmpty(headNext)) {
            isAlive = false;
        }
        snakeCells = snakeCells.push(headNext);
        snakeCells = snakeCells.slice(tailIndex, snakeCells.length);
        playing = isAlive;
        setCurrentPosition(new GamePosition(snakeCells, foodIndex, delayMillis));
    }

    const isEmpty = (index) => {
        const snakeCells = currentPosition.snake;
        return !(snakeCells.includes(index) || isBorder(index) || (index === currentPosition.food));
    }

    const generateFood = () => {
        let randomPlace = Math.random() * boardSize;
        while (!isEmpty(randomPlace)) {
            randomPlace = Math.random() * boardSize;
        }
        return randomPlace;
    }
 
    return (
        <div className="gamePage">
            <div className="board">
                {createCells()}
            </div>
            <div>
                <ArrowGrid arrowClick={(arrow)=>{setDirection(arrow)}} />
            </div>
        </div>
    )
}