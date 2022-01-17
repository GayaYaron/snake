import { Outlet } from 'react-router-dom';
import { GamePage } from './gamePage';

export function GeneralPage(props) {
    return (
        <div className='d-flex justify-content-center mt-2 w-100'>
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <GamePage />
            </div>
        </div>
    )
}