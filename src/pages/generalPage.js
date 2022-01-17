import { Outlet } from 'react-router-dom';
import { GamePage } from './gamePage';

export function GeneralPage(props) {
    return(
        <div className='d-flex justify-content-center mt-20 w-100'>
            <GamePage />
        </div>
    )
}