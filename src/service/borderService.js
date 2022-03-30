export const indexIsBorder = (index, boardSize, cols, rows) => {
    const insideBoard = (index >= 0) && (index < boardSize);
    const isTopRow = index < cols;
    const isLeftCol = index % cols === 0;
    const isBottomRow = index > cols * (rows - 1);
    const isRightCol = (index + 1) % cols === 0;

    return insideBoard && (isTopRow || isLeftCol || isBottomRow || isRightCol);
}