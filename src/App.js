import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home/Home";
import Category from "./components/category/Category";
import Product from "./components/product/Product";

import "./App.scss";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/category">About</Link>
          </li>
          <li>
            <Link to="/product/5">Dashboard</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
