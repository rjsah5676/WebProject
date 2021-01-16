import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { Button } from "react-bootstrap";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class CommentRow extends Component {

    deleteComment = _id => {
        const send_param = {
          headers,
          _id
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
          axios
            .post("http://localhost:8080/comment/delete", send_param)
            .then(returnData => {
              alert("댓글이 삭제 되었습니다.");
              window.location.reload();
            })
            .catch(err => {
              console.log(err);
              alert("댓글 삭제 실패");
            });
        }
      };

    render() {
        const tdStyle1 = {
            width: "800px",
            borderBottom: "1px dashed #787878"        
        }
        const tdStyle2 = {
            width: "100px",
            borderBottom: "1px dashed #787878"  
        }
        const tdStyle3 = {
            width: "120px",
            borderBottom: "1px dashed #787878"  
        }
      return (
        <tr>
          <td style={tdStyle3}>
              <b>{this.props.writerName}</b>
          </td>
          <td style={tdStyle1}>
              {this.props.content}
          </td>
          <td style={tdStyle2}>
              {this.props.createdAt.substring(0, 10)}
          </td>
          {$.cookie("login_id") === this.props.writer ? <td>
            <Button variant="info" onClick={this.deleteComment.bind(null, this.props._id
                )} style={{marginLeft:"10px",float:"left",fontSize:"15px",width:"50px",
                height:"30px",padding:"0px"}}>삭제</Button>
          </td> : ''}
        </tr>       
      );
    }
  }

class CommentForm extends Component {
    state = {
        commentList: []
    };
    componentDidMount() {
        this.getCommentList();
    }
    getCommentList = () => {
        const send_param = {
          headers,
          _id: this.props._id
        };
        axios
          .post("http://localhost:8080/comment/getCommentList", send_param)
          .then(returnData => {
            let commentList;
            if (returnData.data.list.length > 0) {
              const comments = returnData.data.list;
              commentList = comments.map(item => (
                <CommentRow
                  key={Date.now() + Math.random() * 500}
                  _id={item._id}
                  createdAt={item.createdAt}
                  writerName={item.writerName}
                  writer={item.writer}
                  content={item.content}
                ></CommentRow>
              ));
              this.setState({
                commentList: commentList
              });
            } else {
              commentList = (
                <tr>
                  <td colSpan="4">댓글이 존재하지 않습니다.</td>
                </tr>
              );
              this.setState({
                commentList: commentList
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      render() {
        const divStyle = {
          margin: 20
        };
    
        return (
          <div>
            <div style={divStyle}>
                <h3>댓글</h3>
              <table>
                <thead>
                  <tr>
                    <th>댓글 수: {this.state.commentList.length > 0 ? this.state.commentList.length : '0'}개</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{this.state.commentList}</tbody>
              </table>
              <br/><br/><br/><br/>
            </div>
          </div>
        );
      }
}

export default CommentForm;