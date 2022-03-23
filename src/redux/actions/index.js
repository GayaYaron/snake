import { generalApi } from "../../service/apiService";

export const login = (nickname, password) => async (dispatch) => {
    const body = {
        nickname,
        password
    };
    try {
        const response = await generalApi.post("user/login", body);
        dispatch(addLoginDataToState(response.data.jwtToken, response.data.id, response.data.nickname, response.data.expiration, response.data.chsenDesign, response.data.coins));
    } catch (err) {
        dispatch(loginError(err));
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

export const addCoins = (amount) => {
    
}