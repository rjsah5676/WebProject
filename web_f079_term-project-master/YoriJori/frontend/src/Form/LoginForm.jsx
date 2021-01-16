import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class LoginForm extends Component {
  componentDidMount() {
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  }

  verifyCallback = recaptchaToken => {
    console.log(recaptchaToken, "<= your recaptcha token");
  };

  login = () => {
    const loginEmail = this.loginEmail.value;
    const loginPw = this.loginPw.value;

    if (loginEmail === "" || loginEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      this.loginEmail.focus();
      return;
    } else if (loginPw === "" || loginPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      this.loginPw.focus();
      return;
    }

    const send_param = {
      headers,
      email: this.loginEmail.value,
      password: this.loginPw.value
    };
    axios
      .post("http://localhost:8080/member/login", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          $.cookie("login_id", returnData.data._id, { expires: 1 });
          $.cookie("login_email", returnData.data.email, { expires: 1 });
          alert(returnData.data.message);
          window.location.href = "/";
        } else {
          alert(returnData.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const formStyle = {
      margin: 50
    };
    const buttonStyle = {
      width: 400,
      marginTop: 50,
      marginLeft:"auto",
      marginRight:"auto",
    };
    const parentDivStyle = {
      marginTop: "20px",
      width: "1100px",
      padding: "0px 0px 20px 0px",
      display:"block",
      marginLeft: "auto",
      marginRight: "auto",
      border: "3px solid #848484",
      backgroundColor:"#D8D8D8",
    };
    const labelStyle = {
      marginTop: 10
    }
    return (
      <div style={parentDivStyle}>
        <h3 className="font1" style={{textAlign:"center", marginTop:"10px", fontSize:"50px"}}>로그인</h3>
        <Form style={formStyle}>
          <Form.Label style={labelStyle}>Email 주소</Form.Label>
          <Form.Control
            type="email"
            maxLength="100"
            ref={ref => (this.loginEmail = ref)}
            placeholder="Email을 입력해주세요."
          />
          <Form.Label style={labelStyle}>비밀번호</Form.Label>
          <Form.Control
            type="password"
            maxLength="20"
            ref={ref => (this.loginPw = ref)}
            placeholder="비밀번호를 입력해주세요."
          />
          <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={this.verifyCallback}
          />
          <Button
            style={buttonStyle}
            onClick={this.login}
            variant="secondary"
            type="button"
            block
          >
            로그인
          </Button>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
