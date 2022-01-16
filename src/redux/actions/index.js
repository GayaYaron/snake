export const setBorderColor = (color) => {
    return {
        type: "GAME-COLOR/BORDER",
        payload: color
    }
}

export const setSnakeColor = (color) => {
    return {
        type: "GAME-COLOR/SNAKE",
        payload: color
    }
}

export const setFoodColor = (color) => {
    return {
        type: "GAME-COLOR/FOOD",
        payload: color
    }
}