import React from "react";
import Nav from "../common/nav";
import { connect } from "react-redux";

class Home extends React.Component {
    render () {
        console.log("home this.props", this.props);
        const sessionId = this.props.session.sessionId;
        return (
            <div>
                <Nav />
                <h2>Hey, welcome to sample shopping cart. Your sessionId is - { sessionId }</h2>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return { session: state.session };
};

export default connect(
    mapStateToProps
)(Home);
