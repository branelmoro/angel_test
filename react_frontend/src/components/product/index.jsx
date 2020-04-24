import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Nav from "../common/nav";
import ProductForm from "./productForm";
import { productFetchRequest } from "../../reduxActions/productActions";
import { addToCartRequest } from "../../reduxActions/cartActions";

class Product extends React.Component {
    constructor (props) {
        super(props);
        // this.handleLogout = this.handleLogout.bind(this);
    }

    // handleLogout (event) {
    //     event.preventDefault();
    //     this.props.logoutRequest();
    // }

    componentDidMount () {
        this.props.productFetchRequest(this.props.session.sessionId);
    }

    render () {
        console.log("Product this.props--------", this.props);
        return (
            <div>
                <Nav />
                <ul>
                    {this.props.product && this.props.product.map(p => (
                        <li>
                            <ProductForm
                                sessionId={this.props.session.sessionId}
                                addToCartRequest={this.props.addToCartRequest}
                                {...p}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

Product.propTypes = {
    session: PropTypes.object,
    product: PropTypes.array
};

Product.defaultProps = {
    session: {},
    product: []
};

const mapStateToProps = state => {
    return {
        session: state.session,
        product: state.product
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        productFetchRequest: (sessionId) => dispatch(productFetchRequest(sessionId)),
        addToCartRequest: ({ productCode, qty, sessionId }) => dispatch(addToCartRequest({ productCode, qty, sessionId }))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);
