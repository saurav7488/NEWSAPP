import "./App.css";
import React, { Component } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state={
      progress:0,   
  }
  setProgress=(progress)=> {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress}/>
          <Routes>
            <Route exact path="/business"
              element={<News setProgress={this.setProgress}  key="business" pageSize={8} category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} 
                  key="entertainment"
                  pageSize={8}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={<News setProgress={this.setProgress}  key="general" pageSize={8} category="general" />}
            />
            <Route
              exact
              path="/health"
              element={<News setProgress={this.setProgress}  key="health" pageSize={8} category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<News setProgress={this.setProgress}  key="science" pageSize={8} category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<News setProgress={this.setProgress}  key="sports" pageSize={8} category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={
                <News setProgress={this.setProgress}  key="technology" pageSize={8} category="technology" />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
