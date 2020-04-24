import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Link to="/">home</Link>&nbsp;
                <Link to="/products">Products</Link>&nbsp;
                <Link to="/cart">Cart</Link>&nbsp;
                <Link to="/unknown">unknown</Link>
            </div>
        );
    }
}

export default Nav;
