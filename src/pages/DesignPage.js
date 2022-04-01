function DesignPageComp(props) {
    <div className="mx-4">
        <h3 className="text-center mb-2">Your Designs</h3>
        <div className="d-flex flex-wrap justify-content-center mx-2 my-1">
            
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchActions = () => {
    return {

    };
};

export const DesignPage = connect(mapStateToProps, mapDispatchActions())(DesignPageComp);