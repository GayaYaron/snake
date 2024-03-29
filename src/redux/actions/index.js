import { generalApi, authApi } from "../../service/apiService";
import { ByError } from "../../model/ByError";
import { Design } from "../../model/Design";
import { ColorPack } from "../../model/ColorPack";

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
            dispatch(setCoins(response.data));
        }
    } catch (err) {
        dispatch(loginError(new ByError(err, "ADD-COINS")))
    }
}

export const setCoins = (coins) => {
    return {
        type: "LOG/INFO-COINS",
        payload: coins
    }
}

export const loadUserDesigns = () => async (dispatch) => {
    try{
    const response = await authApi.get("/design/all");
    const designs = response.data.map(json => turnJsonToDesign(json));
    dispatch(setUserDesigns(designs));
    } catch(err) {
        dispatch(designsError(new ByError(err, "LOAD-DESIGNS")));
    }
}

const turnJsonToDesign = (json) => {
    return new Design(json.id, json.name, json.snakeColor, json.borderColor, json.foodColor);
}

export const setUserDesigns = (designs) => {
    return {
        type: "DESIGN/SET",
        payload: designs
    }
}

export const designsError = (err) => {
    return {
        type: "DESIGN/ERROR",
        payload: err
    }
}

export const loadUserColors = () => async (dispatch) => {
    try{
        const response = await authApi.get("/colors");
        const designs = response.data.map(json => turnJsonToColorPack(json));
        dispatch(setUserDesigns(designs));
        } catch(err) {
            dispatch(designsError(err));
        }
}

const turnJsonToColorPack = (json) => {
    return new ColorPack(json.id, json.price, json.type+"", json.colors);
}

export const setUserColors = (userColors) => {
    return {
        type: "USER_COLOR/SET",
        payload: userColors
    }
}

export const userColorsError = (err) => {
    return {
        type: "USER_COLOR/ERROR",
        payload: err
    }
}
