import React from "react";
import PropTypes from "prop-types";

class CartProduct extends React.Component {
    constructor (props) {
        super(props);
        console.log("calling CartProduct constructor---", this.props);
        this.handleChange = this.handleChange.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    componentDidMount () {
        // this.props.productFetchRequest(this.props.session.sessionId);
    }

    handleChange (event) {
        event.preventDefault();
        if (event.target.value <= 0) {
            // alert("Quantity can't be less than 0!!");
            return;
        }
        // this.setState({ inputQuantity: event.target.value });
        const qty = event.target.value;
        console.log({ productCode: this.props.productCode, qty: qty, sessionId: this.props.sessionId });
        this.props.changeQuantityRequest({
            productCode: this.props.productCode,
            qty: qty,
            sessionId: this.props.sessionId
        });
    }

    removeProduct (event) {
        event.preventDefault();
        console.log({ productCode: this.props.productCode, sessionId: this.props.sessionId });
        this.props.removeProductRequest({
            productCode: this.props.productCode,
            sessionId: this.props.sessionId
        });
    }

    render () {
        console.log("CartProduct this.props--------", this.props);
        return (
            <div>
                {this.props.productCode} - Quantity: <input type="number" value={this.props.quantity} onChange={this.handleChange} />
                <a href="#" onClick={this.removeProduct}>Remove From Cart</a>
            </div>
        );
    }
}

CartProduct.propTypes = {
    sessionId: PropTypes.string
};

CartProduct.defaultProps = {
    sessionId: ""
};

export default CartProduct;
