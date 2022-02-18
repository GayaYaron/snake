import { Outlet } from 'react-router-dom';
import { Game } from '../components/game';

export function GamePage(props) {
    const centerVals = [12, 10, 8, 6, 4];

    const widthClass = (isCenter) => {
        let vals = centerVals;
        if(!isCenter) {
            vals = vals.map(val => (12-val)/2);
        }
        return "col-"+vals[0]+" col-sm-"+vals[1]+" col-md-"+vals[2]+" col-lg-"+vals[3]+" col-xl-"+vals[4];
    }

    return (
        <div className='d-flex justify-content-evenly mt-2'>
            <div/>
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <Game />
            </div>
            <div className='text-center'>
                <h5>
                    SCORE
                </h5>
                <p>
                    0
                </p>
            </div>
        </div>
    )
}