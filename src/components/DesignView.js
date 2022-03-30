import "../styles/game.css"
import { indexIsBorder } from "../service/borderService";
import { CellBoard } from "./CellsBoard";

export function DesignView(props) {
    const boardSize = 64;

    const cellColor = (index) => {
        if (index === 29) {
            return props.design.foodColor;
        } else if (index >= 42 && index <= 44) {
            return props.design.snakeColor;
        } else if (indexIsBorder(index, boardSize, 8, 8)) {
            return props.design.borderColor;
        } else {
            return "backDefault";
        }
    }

    return (
        <div className="miniBoard" id={props.design.id}>
            <CellBoard boardSize={boardSize} getCellColor={cellColor}/>
        </div>
    )
}