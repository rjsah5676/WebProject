import React, { Component } from "react";
import LoginForm from "./Form/LoginForm";
import BoardForm from "./Form/BoardForm";
import BoardWriteForm from "./Form/BoardWriteForm";
import BoardDetail from "./Form/BoardDetail";
import SignUpForm from "./Form/SignUpForm";
import MyBoardForm from "./Form/MyBoardForm";
import { Route } from "react-router-dom";
import MainPageForm from "./Form/MainPageForm";

class Body extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={MainPageForm}></Route>
        <Route exact path="/board" component={BoardForm}></Route>
        <Route path="/boardWrite" component={BoardWriteForm}></Route>
        <Route path="/board/detail" component={BoardDetail}></Route>
        <Route exact path="/login" component={LoginForm}></Route>
        <Route exact path="/signup" component={SignUpForm}></Route>
        <Route exact path="/myBoard" component={MyBoardForm}></Route>
      </div>
    );
  }
}

export default Body;
