import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import CommentWriteForm from "./CommentWriteForm";
import CommentForm from "./CommentForm";
import RatingWriteForm from "./RatingWriteForm";
import RatingForm from "./RatingForm";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  state = {
    board: [],
    button: [],
    writer: '',
    data: ""
  };

  componentDidMount() {
    if(this.props.location.hasOwnProperty('query')) {
      const send_param = {
        headers,
        _id: this.props.location.query._id
      };
      $.cookie("board", this.props.location.query._id, { expires: 1 });
      axios
        .post("http://localhost:8080/board/getWriter", send_param)
        .then(returnData => {
          this.setState({writer: returnData.data.message})});
        this.getDetail(this.props.location.query._id);
    }
    else {
      const send_param = {
        headers,
        _id: $.cookie("board")
      };
      axios
        .post("http://localhost:8080/board/getWriter", send_param)
        .then(returnData => {
          this.setState({writer: returnData.data.message})});
        this.getDetail($.cookie("board"));
    }
  }

  deleteBoard = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/board/delete", send_param)
        .then(returnData => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/#/board";
        })
        .catch(err => {
          alert("글 삭제 실패");
          console.log(err);
        });
    }
  };

  getDetail = (arg) => {
    const send_param = {
      headers,
      _id: arg
    };
    const buttonStyle1 = {
      width: 100,
      marginLeft: "70px"
    };
    const buttonStyle2 = {
      width: 100,
      float:"right",
      marginRight: "70px"
    };
    const divStyle = {
      display:"block",
      width: 400,
      marginLeft:"auto",
      marginRight:"auto",
      marginBottom: "20px"
    }
    axios
      .post("http://localhost:8080/board/detail", send_param)
      .then(returnData => {
        if (returnData.data.board[0]) {
          const board = (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th><h4>{returnData.data.board[0].title}
                    </h4><p>{returnData.data.board[0].writerName} / {returnData.data.board[0].createdAt.substring(0, 10)} {returnData.data.board[0].createdAt.substring(11, 16)}</p>
                    <RatingForm _id={arg}></RatingForm>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{
                        __html: returnData.data.board[0].content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
          if($.cookie("login_id") === returnData.data.board[0].writer){
            const button = (<div style = {divStyle}>
              <NavLink
                to={{
                  pathname: "/boardWrite",
                  query: {
                    title: returnData.data.board[0].title,
                    content: returnData.data.board[0].content,
                    _id: arg
                  }
                }}
              >
                <Button variant="info" style={buttonStyle1}>
                  글 수정
                </Button>
              </NavLink>
              <Button
                variant="info"
                style={buttonStyle2}
                onClick={this.deleteBoard.bind(
                  null,
                  arg
                )}
              >
                글 삭제
              </Button>
            </div>);
            this.setState({
              board: board,
              button: button
            });
          }
          else {
            const button = (<div><RatingWriteForm _id={arg}></RatingWriteForm></div>);
            this.setState({
              board: board,
              button: button
            });
          }
        }
        else {
          alert("글 조회 실패");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

onCommentChange = (event) => {
    this.setState({data: event.target.value});
}
writeComment = _id => {
    let url;
    let send_param;

    const commentContent = this.state.data;

    if (commentContent === undefined || commentContent === "") {
      alert("댓글 내용을 입력 해주세요.");
      commentContent.focus();
    }

    url = "http://localhost:8080/comment/write";
    send_param = {
    headers,
    "_id" : _id,
    "writer" : $.cookie("login_id"),
    "content": commentContent
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

  render() {
    const parentDivStyle = {
      marginTop: "20px",
      width: "1100px",
      display:"block",
      marginLeft: "auto",
      marginRight: "auto",
      border: "3px solid #78EAFF",
      backgroundColor:"#FFFFFF",
    };
    if(this.props.location.hasOwnProperty('query'))
      return (<div style={parentDivStyle}>{this.state.board}{$.cookie("login_id") ? this.state.button : ""}
      {$.cookie("login_id") ? <CommentWriteForm _id={this.props.location.query._id}></CommentWriteForm> : ""}
        <CommentForm _id= {this.props.location.query._id}></CommentForm></div>);
    else {
      return (<div style={parentDivStyle}>{this.state.board}{$.cookie("login_id") ? this.state.button : ""}
      {$.cookie("login_id") ? <CommentWriteForm _id={$.cookie("board")}></CommentWriteForm> : ""}
        <CommentForm _id= {$.cookie("board")}></CommentForm></div>);
    }
  }
}

export default BoardDetail;
