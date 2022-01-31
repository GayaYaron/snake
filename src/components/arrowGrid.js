import "../styles/game.css";

export function ArrowGrid(props) {
    const buttonCol = (direction, imgSrc) => {
        return (
            <div className="col">
                <img src={imgSrc} className="arrowBtn w-full" alt={direction} onClick={() => { props.arrowClick(direction) }} />
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col" />
                {buttonCol("U", "/upArrow.png")}
                <div className="col" />
            </div>
            <div className="row">
                {buttonCol("L", "/leftArrow.png")}
                {buttonCol("D", "/downArrow.png")}
                {buttonCol("R", "/rightArrow.png")}
            </div>
        </div>
    )
}