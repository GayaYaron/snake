export function CellBoard(props) {
    if (props.needsLoading) {
        props.load();
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        const cellArr = [];
        for (let i = 0; i < props.boardSize; i++) {
            cellArr.push(<Cell key={i} color={props.getCellColor(i)} />);
        }
        return cellArr;
    }
}