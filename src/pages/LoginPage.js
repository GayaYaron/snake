import { useNavigate } from "react-router-dom"
import { LoginForm } from "../components/LoginForm"
import "../styles/game.css"

export function LoginPage(props) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <img src="/backArrow.png" className="imgButton ms-2" alt="go back" onClick={goBack} />
            <div className="centerContent mt-5">
                <LoginForm />
            </div>
        </div>
    )
}