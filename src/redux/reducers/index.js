import { combineReducers } from "redux";

const gameColorsReducer = (currentState = {border: null, snake: null, food: null}, action) => {
    switch(action.type) {
        case "GAME-COLOR/BORDER":
            return {...currentState, border: action.payload};
        case "GAME-COLOR/SNAKE":
            return {...currentState, snake: action.payload};
        case "GAME-COLOR/FOOD":
            return {...currentState, food: action.payload};
        default:
            return currentState;
    }
}

export default combineReducers({
    gameColors : gameColorsReducer
})