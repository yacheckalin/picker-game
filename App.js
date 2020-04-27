import React from "react";
import Playground from "./components/Playground";
import LevelMakerContainer from "./components/LevelMaker/LevelMakerContainer";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/play">
                <i className="material-icons left">dashboard</i> Playground
              </Link>
            </li>
            <li>
              <Link to="/level-maker">
                <i className="material-icons left">crop_free</i> Level Maker
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/play">
            <Playground menuBar={true} />
          </Route>
          <Route path="/level-maker">
            <LevelMakerContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
