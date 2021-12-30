import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table } from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions"
import alertify from "alertifyjs";
class CartDetails extends Component {
    removeFromCart(product) {
        this.props.actions.removeFromCart(product)
        alertify.set('notifier','position', 'top-right');
        alertify.error(product.productName+ " to remove",3)
    }
    render() {
        return (
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(cartItem => (
                            <tr>
                                <th scope="row">{cartItem.product.id}</th>
                                <td>{cartItem.product.productName}</td>
                                <td>{cartItem.quantity}</td>
                                <td><Button color="danger" onClick={() => this.removeFromCart(cartItem.product)}>Remove</Button></td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetails)

