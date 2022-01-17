import { Outlet } from 'react-router-dom';
import { GamePage } from './gamePage';

export function GeneralPage(props) {
    return (
        <div className='d-flex justify-content-center mt-5 w-100'>
            <div className="col-12 col-md-6 col-lg-4">
                <GamePage />
            </div>
        </div>
    )
}