import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import {Switch,Route} from "react-router-dom"
import CartDetails from "../cart/CartDetails";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct"
import NotFound from "../common/NotFound";
function App() {
  return <div>
    
    <Container>
    <Navi/>

      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/product" component={Dashboard}/>
        <Route path="/saveproduct/:productId" component={AddOrUpdateProduct}/>
        <Route path="/saveproduct" component={AddOrUpdateProduct}/>
        <Route exact path="/cart" component={CartDetails}/>
        <Route component={NotFound}/>
      </Switch>
    </Container>
  </div>;
}

export default App;
