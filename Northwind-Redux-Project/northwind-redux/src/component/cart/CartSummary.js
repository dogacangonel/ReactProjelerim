import React, { Component } from "react";
import {
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  NavItem,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions"
import { Link } from "react-router-dom";
class CartSummary extends Component {
    renderEmpty() {
    return (
      <NavItem>
        <NavLink>Sepetiniz Boş</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown inNavbar nav>
        <DropdownToggle caret nav>
          Sepetiniz
        </DropdownToggle>
        <DropdownMenu right>
            {this.props.cart.map(cartItem=>(
              
              <DropdownItem key={cartItem.product.id}>
                <Badge color="danger" onClick={()=>this.props.actions.removeFromCart(cartItem.product)}>X</Badge>
                {cartItem.product.productName}-
              <Badge color="success">{cartItem.quantity}</Badge>
              </DropdownItem>
                
            ))}
          <DropdownItem divider />
          <DropdownItem><Link to={"/cart"}>Sepete Git</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapPropsToDispatch(dispatch){
  return {
     actions:{
       removeFromCart:bindActionCreators(cartActions.removeFromCart,dispatch)
     }
  }

}

function mapPropsToState(state) {
  return {
    cart: state.cartReducer
  };
}

export default connect(mapPropsToState,mapPropsToDispatch)(CartSummary);
