import { Game } from "../components/game";
import "../styles/game.css";

export function GamePage(props) {
    return (
        <div className="gamePage">
            <Game />
        </div>
    )
}