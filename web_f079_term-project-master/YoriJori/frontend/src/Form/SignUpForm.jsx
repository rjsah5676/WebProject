import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { loadReCaptcha } from "react-recaptcha-v3";
import axios from "axios";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class SignUpForm extends Component {
  componentDidMount() {
    loadReCaptcha("6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb");
  }

  verifyCallback = recaptchaToken => {
    console.log(recaptchaToken, "<= your recaptcha token");
  };

  join = () => {
    const joinEmail = this.joinEmail.value;
    const joinName = this.joinName.value;
    const joinPw = this.joinPw.value;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (joinEmail === "" || joinEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      this.joinEmail.focus();
      return;
    } else if (
      joinEmail.match(regExp) === null ||
      joinEmail.match(regExp) === undefined
    ) {
      alert("이메일 형식에 맞게 입력해주세요.");
      this.joinEmail.value = "";
      this.joinEmail.focus();
      return;
    } else if (joinName === "" || joinName === undefined) {
      alert("별명을 입력해주세요.");
      this.joinName.focus();
      return;
    } else if (joinName.length < 2) {
      alert("별명을 2자리 이상으로 입력해주세요");
      this.joinName.focus();
      return;
    }
     else if (joinPw === "" || joinPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      this.joinPw.focus();
      return;
    } else if (
      joinPw.match(regExp2) === null ||
      joinPw.match(regExp2) === undefined
    ) {
      alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
      this.joinPw.value = "";
      this.joinPw.focus();
      return;
    }

    const send_param = {
      headers,
      email: this.joinEmail.value,
      name: this.joinName.value,
      password: this.joinPw.value
    };
    axios
      .post("http://localhost:8080/member/join", send_param)
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          if (returnData.data.dup === "1") {
            this.joinEmail.value = "";
            this.joinEmail.focus();
            return;
          } else if(returnData.data.dup === "2") {
            this.joinName.value = "";
            this.joinName.focus();
            return;
          }else {
            this.joinEmail.value = "";
            this.joinName.value = "";
            this.joinPw.value = "";
          }
          window.location.href = "/";
        } else {
          alert("회원가입 실패.");
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
    const labelStyle = {
      marginTop: 10
    }
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

    return (
      <div style={parentDivStyle}>
        <h3 className="font1" style={{textAlign:"center", marginTop:"10px", fontSize:"50px"}}>회원가입</h3>
        <Form style={formStyle}>
            <Form.Label style={labelStyle}>Email 주소</Form.Label>
            <Form.Control
              type="email"
              maxLength="100"
              ref={ref => (this.joinEmail = ref)}
              placeholder="Email을 입력해주세요."
            />
            <Form.Text className="text-muted">
              Ex) Lee@gmail.com
            </Form.Text>
            <Form.Label style={labelStyle}>별명</Form.Label>
            <Form.Control
              type="text"
              maxLength="20"
              ref={ref => (this.joinName = ref)}
              placeholder="홈페이지에서 사용할 별명을 입력해주세요."
            />
            <Form.Label style={labelStyle}>비밀번호</Form.Label>
            <Form.Control
              type="password"
              maxLength="64"
              ref={ref => (this.joinPw = ref)}
              placeholder="비밀번호를 입력해주세요"
            />
            <Form.Text className="text-muted">
              숫자, 문자, 특수문자를 포함한 8~16자리
            </Form.Text>
            <Button
              style={buttonStyle}
              onClick={this.join}
              variant="secondary"
              type="button"
              block
            >
              회원가입
            </Button>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
