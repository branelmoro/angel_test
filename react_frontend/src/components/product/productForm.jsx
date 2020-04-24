import React from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import Nav from "../common/nav";
// import { productFetchRequest } from "../../reduxActions/productActions";

class ProductForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            inputQuantity: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        // this.props.productFetchRequest(this.props.session.sessionId);
    }

    handleChange (event) {
        event.preventDefault();
        this.setState({ inputQuantity: event.target.value });
    }

    handleSubmit (event) {
        event.preventDefault();
        console.log({ productCode: this.props.productCode, qty: this.state.inputQuantity, sessionId: this.props.sessionId });
        this.props.addToCartRequest({
            productCode: this.props.productCode,
            qty: this.state.inputQuantity,
            sessionId: this.props.sessionId
        });
    }

    render () {
        console.log("ProductForm this.props--------", this.props);
        const { inputQuantity } = this.state;
        return (
            <div>
                {this.props.productCode} ({this.props.productName})
                { this.props.availableQuantity > 0 &&
                    <form onSubmit={this.handleSubmit}>
                        <input type="number" value={inputQuantity} onChange={this.handleChange} />
                        <input type="submit" value="Add To Cart" />
                        <span>AvailableQuantity : {this.props.availableQuantity}</span>
                    </form>
                }
                {!this.props.availableQuantity && "[Product is sold out]"}
            </div>
        );
    }
}

ProductForm.propTypes = {
    sessionId: PropTypes.string
};

ProductForm.defaultProps = {
    sessionId: ""
};

export default ProductForm;

// const mapStateToProps = state => {
//     return {
//         session: state.session.sessionId,
//         product: state.product
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         productFetchRequest: (sessionId) => dispatch(productFetchRequest(sessionId))
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ProductForm);
