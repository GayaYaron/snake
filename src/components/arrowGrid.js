export function ArrowGrid(props) {
    const buttonCol = (clickFunc, iconString) => {
        return (
            <div className="col-auto">
                <button className="btn btn-secondary" onClick={clickFunc}><i className={iconString}></i></button>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col" />
                {buttonCol(props.upClicked, "fas fa-arrow-up")}
                <div className="col" />
            </div>
            <div className="row">
                {buttonCol(props.leftClicked, "fas fa-arrow-left")}
                {buttonCol(props.downClicked, "fas fa-arrow-down")}
                {buttonCol(props.rightClicked, "fas fa-arrow-right")}
            </div>
        </div>
    )
}