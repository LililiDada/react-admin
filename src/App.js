import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
// ????
import Login from "./view/login/Index";
import Index from "./view/index/Index";
// ??????
import PrivateRouter from "./components/privateRouter/Index";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Login} path="/"></Route>
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
