import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardRow extends Component {
  render() {
    const tdStyle = {
      textAlign: "center",
      borderBottom: "1px dashed #787878" 
    };
    const tdStyle2 = {
      borderBottom: "1px dashed #787878"
    };
    return (
      <tr>
        <td style={tdStyle2}>
          <NavLink
            to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
          >
            <b style={{color:"black", marginLeft:"15px"}}>{this.props.title}</b>
          </NavLink>
        </td>
        <td style={tdStyle}>
            {this.props.createdAt.substring(0, 10)}
        </td>
        <td style={tdStyle}>
            {this.props.rating.toFixed(1)}
        </td>
      </tr>
    );
  }
}

class MyBoardForm extends Component {
  state = {
    boardList: [],
    page:1,
    pageList: [],
  };

  componentDidMount() {
    this.getMyBoard();
  }

  getPage = (arg) => {
    this.setState({page: arg}, () => {this.getMyBoard()});
  }

  getMyBoard = () => {
    const send_param = {
      headers,
      _id: $.cookie("login_id"),
      page:this.state.page
    };
    axios
      .post("http://localhost:8080/board/myBoard", send_param)
      .then(returnData => {
        let boardList;
        let pageList;

        if (returnData.data.list.length > 0) {
          const boards = returnData.data.list;
          const targets = returnData.data.target;
          boardList = boards.map(item => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              writerName={item.writerName}
              title={item.title}
              rating={item.rating}
            ></BoardRow>
          ));
          pageList = targets.map(item => (
            item === this.state.page ? <h5 style={{display:"inline-block", width:"20px",backgroundColor:"#FE2E2E",color:"white"}} onClick={() => this.getPage(item)}>{item}</h5> :<h5 style={{cursor:"pointer",display:"inline-block", width:"20px"}} onClick={() => this.getPage(item)}>{item}</h5>
          ));
          this.setState({
            boardList: boardList,
            pageList: pageList
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="3">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList: boardList
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const parentDivStyle = {
      padding: "0px 0px 100px 0px",
      marginTop: "20px",
      width: "1100px",
      display:"block",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "auto",
      border: "3px solid #F6CECE",
      backgroundColor:"#FBEFEF",
    };

    const divStyle = {
      width: "1000px",
      display:"block",
      marginLeft: "auto",
      marginRight: "auto",
    };

    const tableStyle ={
      borderCollapse:"collapse",
      textAlign:"left",
      lineHeight: "1.5",
      border: "2px solid #FE2E2E",
      marginTop: "10px",
      width: "1000px",
    };
    const theadStyle ={
      background: "#FE2E2E"
    };
    const thStyle1 ={
      padding: "10px",
      fontWeight: "bold",
      textAlign:"center",
      verticalAlign: "top",
      color: "#fff",
      margin: "20px 0px 0px 0px",
      width: "1000px"
    };
    const thStyle2 ={
      padding: "10px",
      fontWeight: "bold",
      textAlign:"center",
      verticalAlign: "top",
      color: "#fff",
      width: "300px"
    };
    const thStyle3 ={
      padding: "10px",
      fontWeight: "bold",
      textAlign:"center",
      verticalAlign: "top",
      color: "#fff",
      width: "300px"
    };
    const pageStyle ={
      maxWidth:"500px",
      marginTop:"10px",
      marginLeft:"auto",
      marginRight:"auto",
      textAlign:"center"
    };
    return (
      <div style={parentDivStyle}>
          <div style={divStyle}>
            <h3 className='font1' style={{textAlign:"center", marginTop:"10px", fontSize:"50px",color:"#FE2E2E"}}>내가쓴 글</h3>
              <table style ={tableStyle}>
                <thead style={theadStyle}>
                  <tr>
                    <th style={thStyle1}>제목</th>
                    <th style={thStyle2}>날짜</th>
                    <th style={thStyle3}>평점</th>
                  </tr>
                </thead>
                <tbody>{this.state.boardList}</tbody>
              </table>
              <div style={pageStyle}>{this.state.pageList}</div>
          </div>
        </div>
    );
  }
}

export default MyBoardForm;