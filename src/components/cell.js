import "../styles/game.css";

export function Cell(props) {
    return (
        <div className={"cell " + props.color} />
    )
}
