import "../styles/game.css";
import { connect } from "react-redux";

function CellComp(props) {
    const getCellClass = () => {
        let classString = "cell ";
        switch (props.role) {
            case "BORDER":
                return classString + props.colors.border;
            case "FOOD":
                return classString + props.colors.food;
            case "SNAKE":
                return classString + props.colors.snake;
            default:
                return classString + "backDefault";
        }
    }

    return (
        <div className={getCellClass()}></div>
    )
}

const mapStateToProps = (state) => {
    return {
        colors : state.gameColors
    }
}

export const Cell = connect(mapStateToProps)(CellComp);