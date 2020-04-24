import React from "react";
import Nav from "../common/nav";

class ThankYou extends React.Component {
    render () {
        console.log("ThankYou this.props", this.props);
        return (
            <div>
                <Nav />
                <h2>Thank you very much for shopping</h2>
            </div>
        );
    }
}

export default ThankYou;
