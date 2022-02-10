import { useEffect, useState } from "react";
import { Cell } from "../components/cell";
import "../styles/game.css"
import { GamePosition } from "../model/GamePosition";
import { ArrowGrid } from "../components/arrowGrid";

export function GamePage(props) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [status, setStatus] = useState("LOADING");

    const cols = 17;
    const rows = 17;
    const boardSize = cols * rows;
    let direction = "R";

    useEffect(() => {
        if (status === "PLAY") {
            if (isAlive()) {
                setTimeout(move, currentPosition.delay);
            } else {
                endGame();
            }
        } else if (status === "READY") {
            setInitialValues();
        }
    }, [currentPosition, status]);

    const setInitialValues = () => {
        direction = "R";
        setCurrentPosition(new GamePosition([226, 227, 228], 197, 1000))
    };

    const createCells = () => {
        if (status === "LOADING") {
            readyGame();
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
        let headNext = nextHeadCell();
        let snakeCells = currentPosition.snake;
        let tailIndex = 1;
        let foodIndex = currentPosition.food;
        let delayMillis = currentPosition.delay;

        if (headNext === foodIndex) {
            tailIndex = 0;
            foodIndex = generateFood();
            delayMillis *= 0.9;
        }

        snakeCells.push(headNext);
        snakeCells = snakeCells.slice(tailIndex, snakeCells.length);
        setCurrentPosition(new GamePosition(snakeCells, foodIndex, delayMillis));
    }

    const isAlive = () => {
        let lastIndex = currentPosition.snake.length - 1;
        let headCell = currentPosition.snake[lastIndex];
        let tail = currentPosition.snake.slice(0, lastIndex);
        return (!isBorder(headCell) && !tail.includes(headCell));
    }

    const isEmpty = (index) => {
        const snakeCells = currentPosition.snake;
        return !(snakeCells.includes(index) || isBorder(index) || (index === currentPosition.food));
    }

    const generateFood = () => {
        let randomPlace = Math.floor(Math.random() * boardSize);
        while (!isEmpty(randomPlace)) {
            randomPlace = Math.random() * boardSize;
        }
        return randomPlace;
    }

    const arrowClicked = (arrow) => {
        if (status === "PLAY") {
            direction = arrow;
        }
    }

    const playBtn = () => {
        const locationClass = "d-block mx-auto mb-2";
        switch (status) {
            case "READY":
                return (
                    <button type="button" className={"btn btn-success " + locationClass} onClick={startGame}>Start Game</button>
                )
            case "PLAY":
                return (
                    <button type="button" className={"btn btn-danger " + locationClass} onClick={endGame}>End Game</button>
                )
            default:
                return (
                    <button type="button" className={"btn btn-success " + locationClass} onClick={readyGame}>Reset</button>
                )
        }

    }

    const startGame = () => {
        setStatus("PLAY");
    }

    const endGame = () => {
        setStatus("OVER");
    }

    const readyGame = () => {
        setStatus("READY");
    }

    const endBannerClass = () => {
        return (status === "OVER") ? "fs-1 text-center redText position-absolute top-50 start-50 translate-middle" : "d-none";
    }

    return (
        <div className="gamePage">
            <div className="board position-relative">
                <div className={endBannerClass()}>
                    Game Over
                </div>
                {createCells()}
            </div>
            <div className="mx-auto w-third">
                {playBtn()}
                <ArrowGrid arrowClick={arrowClicked} />
            </div>
        </div>
    )
}