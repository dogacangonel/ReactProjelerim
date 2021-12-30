import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import CartSummary from "../cart/CartSummary";
import { Link } from "react-router-dom";
export default class Navi extends Component {
  render() {
    return (
      <div>
        {/* Başka bir sisteme gitmediğimiz sürece hyperlink kullanmıyoruz yerine Link kullanıyoruz */}
        <Navbar color="light" expand="md" light>
          <NavbarBrand><Link to="/">NortWind- Mağazası</Link></NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink><Link to="/saveProduct">Ürün Ekle</Link></NavLink> 
              </NavItem>
              <CartSummary/>            
            </Nav>
            
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
