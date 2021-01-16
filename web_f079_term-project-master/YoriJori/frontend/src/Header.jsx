import React, { Component } from "react";
import { Navbar, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
  state = {
    logined: false,
    userName: '',
    loginMouseOver:false,
    signupMouseOver:false,
    listMouseOver:false,
  };

  componentDidMount() {
    if ($.cookie("login_id")) {
      axios
    .post("http://localhost:8080/member/getName", {_id: $.cookie("login_id")})
    .then(returnData => {this.setState({logined: true, userName: returnData.data.message})});
    } else {
      this.setState({
        logined: false
      });
    }
  }

  MouseOver = (arg) => {
    if(arg==="login") this.setState({loginMouseOver: true});
    if(arg==="signup") this.setState({signupMouseOver: true});
    if(arg==="list") this.setState({listMouseOver: true});
  }
  MouseOut = (arg) => {
    if(arg==="login") this.setState({loginMouseOver: false});
    if(arg==="signup") this.setState({signupMouseOver: false});
    if(arg==="list") this.setState({listMouseOver: false});
  }

  logout = () => {
    axios
      .get("http://localhost:8080/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id");
          alert("로그아웃 되었습니다!");
          window.location.href = "/";
        }
      });
  };

  render() {
    const buttonStyle = {
      margin: "0px 5px 0px 10px",
      cursor:"pointer",
    };
    if (!this.state.logined) {  //로그인 안한상태
      return (
        <div>
          <Navbar>
            <Navbar.Brand href="/"><Image key={Date.now() + Math.random() * 500} src="./img/logo.png" fluid heigth={70} width={300}></Image></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <NavLink to="/board">
                {this.state.listMouseOver ? <Image style={buttonStyle} src="./img/button/list_button_cursored.PNG" onMouseOut={() => {this.MouseOut("list")}} fluid/>:<Image style={buttonStyle} src="./img/button/list_button.PNG" onMouseEnter={() => {this.MouseOver("list")}} fluid/>}
              </NavLink>
              <NavLink to="/signup">
                {this.state.signupMouseOver ? <Image style={buttonStyle} src="./img/button/signup_button_cursored.PNG" onMouseOut={() => {this.MouseOut("signup")}} fluid/>:<Image style={buttonStyle} src="./img/button/signup_button.PNG" onMouseEnter={() => {this.MouseOver("signup")}} fluid/>}
              </NavLink>
              <NavLink to="/login">
                {this.state.loginMouseOver ? <Image style={buttonStyle} src="./img/button/login_button_cursored.PNG" onMouseOut={() => {this.MouseOut("login")}} fluid/>:<Image style={buttonStyle} src="./img/button/login_button.PNG" onMouseEnter={() => {this.MouseOver("login")}} fluid/>}
              </NavLink>
            </Navbar.Collapse>
          </Navbar>
          <Image src="./img/main.jpg" fluid style={{height: "300px", width:"100%"}}/>
        </div>
      );
    }
    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/"><Image key={Date.now() + Math.random() * 500} src="./img/logo.png" fluid heigth={70} width={300}></Image></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div><b>'{this.state.userName}' 님 환영합니다. </b></div>
            <NavLink to="/board">
              {this.state.listMouseOver ? <Image style={buttonStyle} src="./img/button/list_button_cursored.PNG" onMouseOut={() => {this.MouseOut("list")}} fluid/>:<Image style={buttonStyle} src="./img/button/list_button.PNG" onMouseEnter={() => {this.MouseOver("list")}} fluid/>} 
            </NavLink>
            <NavLink to="/myBoard">
              {this.state.signupMouseOver ? <Image style={buttonStyle} src="./img/button/mylist_button_cursored.PNG" onMouseOut={() => {this.MouseOut("signup")}} fluid/>:<Image style={buttonStyle} src="./img/button/mylist_button.PNG" onMouseEnter={() => {this.MouseOver("signup")}} fluid/>}
            </NavLink>
              {this.state.loginMouseOver ? <Image onClick={this.logout} style={buttonStyle} src="./img/button/logout_button_cursored.PNG" onMouseOut={() => {this.MouseOut("login")}} fluid/>:<Image style={buttonStyle} onClick={this.logout} src="./img/button/logout_button.PNG" onMouseEnter={() => {this.MouseOver("login")}} fluid/>}
          </Navbar.Collapse>
        </Navbar>
        <Image src="./img/main.jpg" fluid style={{height: "300px", width: "100%"}}/>
      </div>
    );
  }
}

export default Header;
