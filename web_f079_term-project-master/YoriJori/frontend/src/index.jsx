import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

const divStyle = {
  width: "1300px",
  height: "1500px",
  marginLeft:"auto",
  marginRight:"auto",
};

ReactDOM.render(
  <div style={divStyle}>
  <HashRouter>
    <Header/>
    <Body/>
    <Footer/>
  </HashRouter></div>,
  document.querySelector("#container")
);
