import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/index";
import { SubmitButton } from "./SubmitButton";
import { useNavigate } from 'react-router-dom';
import { FormQuestion } from "./FormQuestion";
import { ServerError } from "./ServerError";
import "../styles/game.css"


function LoginFormComp(props) {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [nicknameStatus, setNicknameStatus] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("");
    const navigate = useNavigate();


    const onSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        props.login(target.nickname.value, target.password.value);
    };

    useEffect(() => {
        if (props.loginInfo.info) {
            navigate("main");
        }
    });

    const validateInput = (input) => {
        return (input === "" || input === null) ? "null error" : "valid";
    };

    const validateNickname = (event) => {
        let name = event.target.value;
        setNickname(name);
        setNicknameStatus(validateInput(name));
    };

    const validatePassword = (event) => {
        let password = event.target.value;
        setPassword(password);
        setPasswordStatus(validateInput(password));
    };

    const statusIsValid = (status) => {
        return status === "" || status === "valid";
    }

    const fieldError = (fieldName) => {
        if(fieldName === "nickname") {
            return (nicknameStatus === "null error") ? "You must enter a nickname" : null;
        }
        return (passwordStatus === "null error") ? "You must enter a password" : null;
    }

    return (
        <div className="popupForm col-12 col-sm-8 col-md-6 col-lg-4">
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={onSubmit}>
                <FormQuestion name="nickname" type="text" valid={statusIsValid(nicknameStatus)} placeholder="Nickname" value={nickname}
                    onChange={validateNickname} errorMessage={fieldError("nickname")} quesType="input" />
                <FormQuestion name="password" type="password" valid={statusIsValid(passwordStatus)} placeholder="Password" value={password}
                    onChange={validatePassword} errorMessage={fieldError("password")} quesType="input" />
                <ServerError error={props.loginInfo.error} />
                <SubmitButton disabled={nicknameStatus !== "valid" || passwordStatus !== "valid"}
                    text="Login" />
                <br />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.login
    };
};

const mapDispatchActions = () => {
    return {
        login
    };
};

export const LoginForm = connect(
    mapStateToProps, mapDispatchActions()
)(LoginFormComp);