import { useEffect, useState } from "react";
import { Cell } from "../components/Cell";
import "../styles/game.css"
import { GamePosition } from "../model/GamePosition";
import { ArrowGrid } from "../components/ArrowGrid";
import { connect } from "react-redux";
import { login } from "../redux/actions";

function GamePageComp(props) {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [timer, setTimer] = useState(null);
    const [direction, setDirection] = useState("R");

    const cols = 17;
    const rows = 17;
    const boardSize = cols * rows;
    const initialPos = new GamePosition([226, 227, 228], 197, 1000, 0, "READY");

    useEffect(() => {
        if (currentPosition?.status === "OVER" && timer !== null) {
            clearTimeout(timer);
            setTimer(null);
        } else if (currentPosition?.status === "PLAY") {
            setTimer(setTimeout(move, currentPosition.delay))
        } else if (currentPosition?.status === "READY" && direction !== "R") {
            setDirection("R");
        }
    }, [currentPosition]);

    const setInitialValues = () => {
        setCurrentPosition(initialPos)
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

    const nextHeadCell = (checkDirec) => {
        let nextCell = currentPosition.snake[currentPosition.snake.length - 1];
        let direc = checkDirec ? checkDirec : direction;
        switch (direc) {
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
        let status = "PLAY";
        let headNext = nextHeadCell();
        let snakeCells = currentPosition.snake;
        let tailIndex = 1;
        let foodIndex = currentPosition.food;
        let delayMillis = currentPosition.delay;
        let score = currentPosition.score;

        if (headNext === foodIndex) {
            tailIndex = 0;
            foodIndex = generateFood();
            delayMillis *= 0.9;
            score += 1;
        } else if (isBorder(headNext) || currentPosition.snake.includes(headNext)) {
            status = "OVER";
        }

        snakeCells.push(headNext);
        snakeCells = snakeCells.slice(tailIndex, snakeCells.length);
        setCurrentPosition(new GamePosition(snakeCells, foodIndex, delayMillis, score, status));
    }

    const isEmpty = (index) => {
        const snakeCells = currentPosition.snake;
        return !(snakeCells.includes(index) || isBorder(index) || (index === currentPosition.food));
    }

    const generateFood = () => {
        let randomPlace;
        do {
            randomPlace = Math.floor(Math.random() * boardSize);
        } while (!isEmpty(randomPlace));
        return randomPlace;
    }

    const arrowClicked = (arrow) => {
        let arrowIsDirection = ("R" === arrow || "L" === arrow || "U" === arrow || "D" === arrow);
        if (arrowIsDirection && currentPosition.status === "PLAY") {
            if (nextHeadCell(arrow) !== currentPosition.snake[currentPosition.snake.length - 2]) {
                setDirection(arrow);
            }
        }
    }

    const playBtn = () => {
        const locationClass = "d-block mx-auto mb-2";
        switch (currentPosition?.status) {
            case "READY":
                return (
                    <button type="button" className={"btn btn-success " + locationClass} onClick={startGame}>Start Game</button>
                );
            case "PLAY":
                return (
                    <button type="button" className={"btn btn-danger " + locationClass} onClick={endGame}>End Game</button>
                );
            default:
                return (
                    <button type="button" className={"btn btn-success " + locationClass} onClick={setInitialValues}>Reset</button>
                );
        }

    }

    const startGame = () => {
        setCurrentPosition({ ...currentPosition, status: "PLAY" });
    }

    const endGame = () => {
        setCurrentPosition({ ...currentPosition, status: "OVER" });
    }

    const endBannerClass = () => {
        return (currentPosition?.status === "OVER") ?
            "fs-1 text-center redText position-absolute top-50 start-50 translate-middle bg-white" :
            "d-none";
    }

    const getScore = () => {
        return currentPosition? currentPosition.score: 0;
    }

    const scoreOrCoins = () => {
        return (loginInfo.info && currentPosition?.status === "READY") ? "Coins" : "Score";
    }

    return (
        <div className='d-flex justify-content-evenly mt-2'>
            <div />
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <div className="gamePage">
                    <div className="board position-relative">
                        <div className={endBannerClass()}>
                            Game Over
                        </div>
                        {createCells()}
                    </div>
                    <div className="mx-auto w-third">
                        <ArrowGrid arrowClick={arrowClicked} />
                        {playBtn()}
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <h5>
                    {scoreOrCoins()}
                </h5>
                <p>
                    {getScore()}
                </p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginInfo : state.login
    };
};

const mapDispatchActions = () => {
    return {

    };
};

export const GamePage = connect(mapStateToProps, mapDispatchActions())(GamePageComp);
