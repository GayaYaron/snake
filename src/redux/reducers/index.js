import { combineReducers } from "redux";

const gameColorsReducer = (currentState = {border: "backBlack", snake: "backGrey", food: "backRed"}, action) => {
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

const loginReducer = (currentState = {info: null, error: null}, action) => {
    const state = {...currentState, error: null};
    switch (action.type) {
        case "LOG/IN":
            return {...state, info: action.payload};
        case "LOG/OUT":
            return {...state, info: null};
        case "LOG/ERROR":
            return {...state, error: action.payload};
        default:
            return currentState;
    }
}

export default combineReducers({
    gameColors : gameColorsReducer,
    login : loginReducer
})