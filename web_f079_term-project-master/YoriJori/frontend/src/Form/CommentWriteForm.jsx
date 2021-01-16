import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class CommentWriteForm extends Component {
    
    state = {
        data: ""
    };

    onCommentChange = (event) => {
        this.setState({data: event.target.value});
    };
    writeComment = () => {
        let url;
        let send_param;
    
        const commentContent = this.state.data;
    
        if (commentContent === undefined || commentContent === "") {
          alert("댓글 내용을 입력 해주세요.");
          return;
        }
    
        url = "http://localhost:8080/comment/write";
        send_param = {
          headers,
          "writer" : $.cookie("login_id"),
          "board" : this.props._id,
          "content": commentContent,
        };
    
        axios
          .post(url, send_param)
          .then(returnData => {
            if (returnData.data.message) {
              alert(returnData.data.message);
              window.location.reload();
            } else {
              alert("댓글쓰기 실패");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }; 
      render(){
        const formStyle = {
            margin: 50
          };
          const buttonStyle = {
            marginLeft: 10,
            width: "100px",
            display:"inline"
          };
        return(
            <Form style={formStyle}>
                <Form.Control
                type="comment"
                maxLength="100"
                placeholder="댓글을 입력해주세요"
                onChange={this.onCommentChange}
                style = {{width: "850px", display:"inline"}}
                />
                <Button
                style={buttonStyle}
                variant="info"
                type="button"
                onClick={this.writeComment}
                >
                댓글 달기
                </Button>
            </Form>
        );
    };
}

export default CommentWriteForm;
