import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProduct } from "../../redux/actions/productActions";
import { Badge, Button, Table } from "reactstrap";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs"
import {Link} from "react-router-dom"

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProduct();
  }

  addToCart=(product)=>{
    this.props.actions.addToCart({quantity:1,product})
    alertify.set('notifier','position', 'top-right');
    alertify.success(product.productName+ " to added",1)
  }
  render() {
    return (
      <div>
       <h2> <Badge color="warning">Product</Badge>-
            <Badge color="success">{this.props.currentCategory.categoryName}</Badge></h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity Per Unit</th>
              <th>Unit Price</th>
              <th>Units In Stock</th>
              <th>Add To Cart</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
                <td><Link to={"/saveproduct/"+product.id}>{product.productName}</Link></td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td><Button color="success" onClick={()=>this.addToCart(product)}>Add</Button></td>
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
    products: state.productListReducer,
    currentCategory: state.changeCategoryReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProduct:bindActionCreators(getProduct, dispatch),
      changeCategory:bindActionCreators(categoryActions.changeCategory,dispatch),
      addToCart:bindActionCreators(cartActions.addToCart,dispatch)

    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
