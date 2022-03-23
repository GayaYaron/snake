import { generalApi, authApi } from "../../service/apiService";
import { ByError } from "../../model/ByError";

export const login = (nickname, password) => async (dispatch) => {
    const body = {
        nickname,
        password
    };
    try {
        const response = await generalApi.post("user/login", body);
        dispatch(addLoginDataToState(response.data.jwtToken, response.data.id, response.data.nickname, response.data.expiration, response.data.chsenDesign, response.data.coins));
    } catch (err) {
        dispatch(loginError(new ByError(err, "LOGIN")));
    }

}

export const addLoginDataToState = (userToken, userId, userNickname, tokenExpiration, userChosenDesign, userCoins) => {
    return {
        type: "LOG/IN",
        payload: {
            userToken, 
            userId, 
            userNickname, 
            tokenExpiration, 
            userChosenDesign, 
            userCoins
        }
    }
}

export const logout = () => {
    return {
        type: "LOG/OUT",
        payload: null
    }
}

export const loginError = (error) => {
    return {
        type: "LOG/ERROR",
        payload: error
    }
}

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

export const addCoins = (amount) => async (dispatch) => {
    try {
        const response = await authApi.put("coins", null, {params:{amount}});
        if(response.status < 300) {
            dispatch(addCoinsToState(amount));
        }
    } catch (err) {
        dispatch(loginError(new ByError(err, "ADD-COINS")))
    }
}

export const addCoinsToState = (amount) => {
    return {
        type: "LOG/INFO-COINS",
        payload: amount
    }
}
