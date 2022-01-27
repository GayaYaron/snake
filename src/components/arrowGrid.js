export function ArrowGrid(props) {
    const buttonCol = (direction, iconString) => {
        return (
            <div className="col-auto">
                <button className="btn btn-secondary" onClick={() => { props.arrowClick(direction) }}>
                    <i className={iconString}></i>
                </button>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col" />
                {buttonCol("U", "fas fa-arrow-up")}
                <div className="col" />
            </div>
            <div className="row">
                {buttonCol("L", "fas fa-arrow-left")}
                {buttonCol("D", "fas fa-arrow-down")}
                {buttonCol("R", "fas fa-arrow-right")}
            </div>
        </div>
    )
}