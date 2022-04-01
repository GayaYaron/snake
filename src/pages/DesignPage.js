function DesignPageComp(props) {
    const userDesigns = () => {
        //map designs from props to views, add "add design" if necessary
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
                    {userDesigns()}
                </div>
            </div>
        }
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
        loginInfo: state.login
    };
};

const mapDispatchActions = () => {
    return {

    };
};

export const DesignPage = connect(mapStateToProps, mapDispatchActions())(DesignPageComp);