import "../styles/cell.css";
import { connect } from "react-redux";

function CellComp(props) {
    const getBackColor = () => {
        switch (props.role) {
            case "BORDER":
                return props.colors.border;
            case "FOOD":
                return props.colors.food;
            case "SNAKE":
                return props.colors.snake;
            default:
                return "#FFFFFF"
        }
    }

    return (
        <div className="cell" style={{backgroundColor: getBackColor()}}></div>
    )
}

const mapStateToProps = (state) => {
    return {
        colors : state.gameColors
    }
}

export const Cell = connect(mapStateToProps)(CellComp);