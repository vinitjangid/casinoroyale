import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

// importing all the themes

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
            <Route exact path="/" component={Home} />
        </Router>
      </div>
    );
  }
}
export default MyRouts;