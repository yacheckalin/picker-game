import React from "react";
import Playground from "./components/Playground";
import LevelMaker from "./components/LevelMaker/LevelMaker";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const App = () => (
  <Router>
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/playground">
              <i className="material-icons left">dashboard</i> Playground
            </Link>
          </li>
          <li>
            <Link to="/level-maker">
              <i className="material-icons left">crop_free</i> Level Maker
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>

      <Switch>
        <Route path="/playground">
          <Playground showBar={true} />
        </Route>
        <Route path="/level-maker">
          <LevelMaker />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
