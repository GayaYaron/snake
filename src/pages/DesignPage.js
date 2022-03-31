function DesignPageComp(props) {
    <div className="mx-4">
        <h3 className="text-center mb-2">Your Designs</h3>
        
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