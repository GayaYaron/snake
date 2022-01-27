export function ArrowGrid(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col" />
                <button className="col btn btn-secondary" onClick={props.upClicked}><i className="fas fa-arrow-up"></i></button>
                <div className="col" />
            </div>
            <div className="row">
                <button className="col btn btn-secondary" onClick={props.leftClicked}><i className="fas fa-arrow-left"></i></button>
                <button className="col btn btn-secondary" onClick={props.downClicked}><i className="fas fa-arrow-down"></i></button>
                <button className="col btn btn-secondary" onClick={props.rightClicked}><i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    )
}