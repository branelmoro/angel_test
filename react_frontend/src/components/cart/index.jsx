import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Nav from "../common/nav";
import CartProduct from "./cartProduct";
import { cartFetchRequest, changeQuantityRequest, removeProductRequest } from "../../reduxActions/cartActions";
import { confirmOrderRequest } from "../../reduxActions/orderActions";

class Cart extends React.Component {
    constructor (props) {
        super(props);
        this.handleOrder = this.handleOrder.bind(this);
    }

    componentDidMount () {
        this.props.cartFetchRequest(this.props.session.sessionId);
    }

    handleOrder (event) {
        event.preventDefault();
        this.props.confirmOrderRequest(this.props.session.sessionId);
    }

    render () {
        console.log("Cart this.props--------", this.props);
        return (
            <div>
                <Nav />
                { this.props.cartProducts.length === 0 && "No Products in Cart!!" }
                { this.props.cartProducts.length > 0 &&
                    <div>
                        <ul>
                            {this.props.cartProducts && this.props.cartProducts.map(p => (
                                <li>
                                    <CartProduct
                                        sessionId={this.props.session.sessionId}
                                        changeQuantityRequest={this.props.changeQuantityRequest}
                                        removeProductRequest={this.props.removeProductRequest}
                                        {...p}
                                    />
                                </li>
                            ))}
                        </ul>
                        <a href="#" onClick={this.handleOrder}>Confirm Order</a>
                    </div>
                }
            </div>
        );
    }
}

Cart.propTypes = {
    session: PropTypes.object,
    cartProducts: PropTypes.array,
    cartFetchRequest: PropTypes.func,
    removeProductRequest: PropTypes.func,
    changeQuantityRequest: PropTypes.func,
    confirmOrderRequest: PropTypes.func
};

Cart.defaultProps = {
    session: {},
    cartProducts: []
};

const mapStateToProps = state => {
    return {
        session: state.session,
        cartProducts: state.cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        cartFetchRequest: (sessionId) => dispatch(cartFetchRequest({ sessionId })),
        changeQuantityRequest: ({ productCode, qty, sessionId }) => dispatch(changeQuantityRequest({ productCode, qty, sessionId })),
        removeProductRequest: ({ productCode, sessionId }) => dispatch(removeProductRequest({ productCode, sessionId })),
        confirmOrderRequest: (sessionId) => dispatch(confirmOrderRequest({ sessionId }))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
