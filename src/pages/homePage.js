import { Outlet } from "react-router-dom";
import { MainMenu } from "../components/MainMenu";

export function HomePage(props){
    return(
        <div>
            <MainMenu />
            <Outlet />
        </div>
    )
}