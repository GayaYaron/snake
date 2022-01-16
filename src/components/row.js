import "../styles/game.css";
import { Cell } from "./cell";
export function Row(props) {
    const mapRolesToCells = () => {
        return (props.roles.map((cellRole, index) => <Cell key={index} role={cellRole}/>))
    }

    return(
        <div className="row">
            {mapRolesToCells()}
        </div>
    )
}