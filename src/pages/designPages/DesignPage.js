import { DesignView } from "../../components/DesignView";
import { loadUserDesigns } from "../../redux/actions";
import { ServerError } from "../../components/ServerError";
import { useNavigate } from "react-router-dom"
import { authApi } from "../../service/apiService";

function DesignPageComp(props) {
    const navigate = useNavigate();

    const addDesign = () => {
        navigate("/add");
    }

    const userDesigns = (designs) => {
        const divClass = "col-2 col-sm-3";
        let designList = designs.map(design =>
            <div key={design.id + ""} className={divClass}>
                <DesignView design={design} />
            </div>)

        if (designList < 5) {
            designList.push(<div key="add" className={divClass}>
                <img src="/plus.png" className="d-block w-full" alt="add design" onClick={addDesign} />
            </div>)
        }
        return designList;
    }

    const loadDesigns = () => {
        const designsInfo = props.designsInfo;
        if (designsInfo.designs) {
            return userDesigns(designsInfo.designs);
        } else if (designsInfo.error?.by === "LOAD-DESIGNS") {
            return (<ServerError error={designsInfo.error} sender="LOAD-DESIGNS" />);
        } else {
            loadUserDesigns();
            return (<p>Loading your designs...</p>);
        }

    }

    const designsOrNote = () => {
        if (!props.loginInfo.info) {
            return (
                <h2 className="text-center text-danger">
                    You are not logged-in. Logged-in users can buy and create designs for their game with the points they earn.
                </h2>
            )
        } else {
            <div>
                <div className="d-flex flex-wrap justify-content-center mx-2 my-1">
                    {loadDesigns()}
                </div>
            </div>
        }
    }

    const loadColorPacks = () => {
        authApi.get("/colors/all")
            .then((response) => {

            })
            .catch((err) => {
                
            })
    }

    return (
        < div className="mx-4" >
            <h3 className="text-center mb-2">Your Designs</h3>
            {designsOrNote()}
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        designsInfo: state.designs
    };
};

const mapDispatchActions = () => {
    return {
        loadUserDesigns
    };
};

export const DesignPage = connect(mapStateToProps, mapDispatchActions())(DesignPageComp);