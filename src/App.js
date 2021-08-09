import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { NavbarComponent } from "./component";
import { Home, Sukses } from "./pages";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" exact>
              <Sukses />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}
