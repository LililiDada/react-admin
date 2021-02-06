import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
// 引入组件
import Login from "./view/login/Index";
import Index from "./view/index/Index";
// 私有组件方法
import PrivateRouter from "./components/privateRouter/Index";

// store
import store from "@/store/Index";
// Privider
import { Provider } from "react-redux";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact component={Login} path="/"></Route>
            <PrivateRouter component={Index} path="/index" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
