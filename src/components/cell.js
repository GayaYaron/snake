import "../styles/game.css";
import { connect } from "react-redux";

function CellComp(props) {
    const getCellClass = () => {
        // let classString = "cell ";
        // if (props.cellColor) {
        //     return classString + cellColor;
        // } else {
        //     switch (props.role) {
        //         case "BORDER":
        //             return classString + props.colors.border;
        //         case "FOOD":
        //             return classString + props.colors.food;
        //         case "SNAKE":
        //             return classString + props.colors.snake;
        //         default:
        //             return classString + "backDefault";
        //     }
        // }

        return "cell " + props.color;
    }

    return (
        <div className={"cell " + props.color}></div>
    )
}
