import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
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
            {this.props.writerName}
        </td>
        <td style={tdStyle}>
            {this.props.createdAt.substring(0, 10)} / {this.props.createdAt.substring(11, 16)}
        </td>
        <td style={tdStyle}>
            {this.props.rating.toFixed(1)}
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    boardList: [],
    pageList: [],
    method: "default",
    search: "",
    search_cookie:"",
    s_method:"",
    msg:"",
    page:1,
    search_category:"전체"
  };

  
  componentDidMount() {
    this.getBoardList(this.state.method);
  }

  onSearch = () => {
    let category = document.getElementById('select').value;
    this.searchTitle.value ="";
    this.setState({search_cookie: this.state.search, search: "", search_category:category }, () => 
    {this.getBoardList(this.state.method);});
  }

  onSearchChange = (event) => {
    this.setState({search: event.target.value});
  }
  getPage = (arg) => {
    this.setState({page: arg}, () => {this.state.s_method === "평점 순" ? 
    this.getBoardList("rating") : this.getBoardList("default")});
  }
  getBoardList = (arg) => {
    const send_param = {
      headers,
      _id: $.cookie("login_id"),
      method: arg,
      search: this.state.search_cookie,
      page:this.state.page,
      category:this.state.search_category,
    };
    let met = "";
    let msg = "";
    if(arg==="default") met ="최근 순";
    else met = "평점 순";
    axios
      .post("http://localhost:8080/board/getBoardList", send_param)
      .then(returnData => {
        let boardList;
        let pageList;
        if (returnData.data.list.length > 0) {
          const boards = returnData.data.list;
          const targets = returnData.data.target;
          msg = returnData.data.msg;
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
            item === this.state.page ? <h5 key={Date.now() + Math.random() * 500} style={{display:"inline-block", width:"20px",backgroundColor:"#FE2E2E",color:"white"}} 
            onClick={() => this.getPage(item)}>{item}</h5> :<h5 key={Date.now() + Math.random() * 500} style={{cursor:"pointer",display:"inline-block", width:"20px"}} 
            onClick={() => this.getPage(item)}>{item}</h5>
          ));
          this.setState({
            boardList: boardList,
            s_method: met,
            msg: msg,
            pageList: pageList,
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="4" style={{textAlign:"center"}}>작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            boardList: boardList,
          });
        }
        this.setState({
          s_method: met,
          msg: returnData.data.msg
        });
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

    const buttonStyle_1 = {
      margin: "0px 10px 10px 0px",
    };
    const buttonStyle_2 = {
      margin: "0px 0px 0px 20px",
    };
    const buttonBoxStyle = {
      width: "300px",
      display:"block",
      float:"left"
    };
    const boxStyle = {
      width: "800px",
      display:"block",
      float:"left"
    };

    const searchStyle = {
      width: 200,
      lineHeight: 25,
      display: "inline",
    };
    const searchBoxStyle ={
      width: "300px",
      display:"block",
      float:"right",
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
    const thStyle4 ={
      padding: "10px",
      fontWeight: "bold",
      textAlign:"center",
      verticalAlign: "top",
      color: "#fff",
      width: "100px"
    };
    const buttonStyle ={
      marginTop: "10px",
      float:"right"
    };
    const pageStyle ={
      maxWidth:"500px",
      marginTop:"10px",
      marginLeft:"auto",
      marginRight:"auto",
      textAlign:"center"
    };
    const selectStyle ={
      width:"80px",
      float:"left",
      marginLeft:"310px"
    }
      return (
        <div style={parentDivStyle}>
          <div style={divStyle}>
            <h3 className='font1' style={{textAlign:"center", marginTop:"10px", fontSize:"50px",color:"#FE2E2E"}}>레시피 게시판</h3>
            <div style={boxStyle}>
            <br/><h3 className="font1" style={{fontSize:"40px", color:"#FE2E2E"}}>{this.state.s_method}</h3>
              {this.state.msg==='' ? <h4>분류: {this.state.search_category}</h4> : <h4>{this.state.msg} / 분류: {this.state.search_category}</h4>}</div>
            <div style={buttonBoxStyle}>
            <Button
              style={buttonStyle_1}
              onClick={() => this.getBoardList("default")}
              variant="danger"
              type="button"
            >
              <b>최근 순</b>
            </Button>
            <Button
              style={buttonStyle_1}
              onClick={() => this.getBoardList("rating")}
              variant="danger"
              type="button"
            >
              <b>평점 순</b>
            </Button>
            </div>
            <div>
            <select style={selectStyle} id='select' className='form-control'>
              <option>
                전체
              </option>
              <option>
                한식
              </option>
              <option>
                일식
              </option>
              <option>
                중식
              </option>
              <option>
                양식
              </option>
              <option>
                기타
              </option>
            </select>
              <Form style={searchBoxStyle}>
                    <Form.Control
                    type="search"
                    maxLength="50"
                    placeholder="검색어 입력"
                    onChange={this.onSearchChange}
                    ref={ref => (this.searchTitle = ref)}
                    style={searchStyle}
                    />
                    <Button
                    variant="danger"
                    type="button"
                    onClick={this.onSearch}
                    style={buttonStyle_2}
                    >
                      <b>글 검색</b>
                    </Button>
                </Form>
              <table style ={tableStyle}>
                <thead style={theadStyle}>
                  <tr>
                    <th style={thStyle1}>제목</th>
                    <th style={thStyle2}>글쓴이</th>
                    <th style={thStyle3}>날짜</th>
                    <th style={thStyle4}>평점</th>
                  </tr>
                </thead>
                <tbody>{this.state.boardList}</tbody>
              </table>
              {$.cookie("login_id") ? <NavLink to="/boardWrite">
                <Button style={buttonStyle} variant="danger">
                <b>글 쓰기</b>
                </Button>
              </NavLink> : ""}
              <div style={pageStyle}>{this.state.pageList}</div>
            </div>
          </div>
        </div>
      );
  }
}

export default BoardForm;
