import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Image } from "react-bootstrap";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardRow1 extends Component {
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
              <b style={{color:"black", marginLeft:"15px", textOverflow : "ellipsis"}}>{this.props.title}</b>
            </NavLink>
          </td>
          <td style={tdStyle}>
              {this.props.writerName}
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
class BoardRow2 extends Component {
    render() {
      const tdStyle = {
        textAlign: "center",
        textOverflow : "ellipsis",
        borderBottom: "1px dashed #787878" 
      };
      const tdStyle2 = {
        textOverflow : "ellipsis",
        borderBottom: "1px dashed #787878"
      };
      let so = "./img/" + this.props.idx.toString() + "st.png";
      return (
        <tr>
            <td><Image src={so} fluid style={{height: "50px", width:"50px"}}/></td>
          <td style={tdStyle2}>
            <NavLink
              to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
            >
              <b style={{color:"black", marginLeft:"15px", textOverflow : "ellipsis"}}>{this.props.title}</b>
            </NavLink>
          </td>
          <td style={tdStyle}>
              {this.props.writerName}
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

class MainPageForm extends Component {
    state = {
        boardList: [],
        hotList: [],
    }
    componentDidMount() {
        this.getMainBoard();
    }
    getMainBoard = () => {
        const send_param = {
          headers,
        };
        axios
          .post("http://localhost:8080/board/getMainBoard", send_param)
          .then(returnData => {
            let boardList;
            if (returnData.data.list.length > 0) {
              const boards = returnData.data.list;
              boardList = boards.map(item => (
                <BoardRow1
                  key={Date.now() + Math.random() * 500}
                  _id={item._id}
                  createdAt={item.createdAt}
                  writerName={item.writerName}
                  title={item.title}
                  rating={item.rating}
                ></BoardRow1>
              ));
              this.setState({
                boardList: boardList,
              });
            } else {
              boardList = (
                <tr>
                  <td colSpan="4" style={{textAlign:"center"}}>게시글이 존재하지 않습니다.</td>
                </tr>
              );
              this.setState({
                boardList: boardList,
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        axios
          .post("http://localhost:8080/board/getHotBoard", send_param)
          .then(returnData => {
            let boardList;
            let idx=1;
            if (returnData.data.list.length > 0) {
              const boards = returnData.data.list;
              boardList = boards.map(item => (
                <BoardRow2
                  key={Date.now() + Math.random() * 500}
                  _id={item._id}
                  createdAt={item.createdAt}
                  writerName={item.writerName}
                  title={item.title}
                  rating={item.rating}
                  idx={idx++}
                ></BoardRow2>
              ));
              this.setState({
                hotList: boardList,
              });
            } else {
              boardList = (
                <tr>
                  <td colSpan="4" style={{textAlign:"center"}}>게시글이 존재하지 않습니다.</td>
                </tr>
              );
              this.setState({
                hotList: boardList,
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
    render(){
        const parentStyle ={
            width:"1200px",
            marginTop:"20px",
            marginLeft:"auto",
            marginRight:"auto",
        }
        const freeBoardStyle ={
            width:"550px",
            height:"350px",
            margin:"0px 0px 0px 10px",
            padding:"0px",
            float:"left"
        }
        const hotBoardStyle ={
            width:"550px",
            height:"350px",
            padding: "0px",
            marginLeft:"auto",
        }
        const tableStyle2 ={
            borderCollapse:"collapse",
            textAlign:"left",
            lineHeight: "1.5",
            border: "2px solid #FE2E2E",
            marginTop: "10px",
            width: "500px",
          };
          const theadStyle2 ={
            background: "#FE2E2E"
          };
          const tableStyle ={
            borderCollapse:"collapse",
            textAlign:"left",
            lineHeight: "1.5",
            border: "2px solid #1C1C1C",
            marginTop: "10px",
            width: "500px",
          };
          const theadStyle ={
            background: "#6E6E6E"
          };
          const thStyle1 ={
            padding: "10px",
            fontWeight: "bold",
            textAlign:"center",
            verticalAlign: "top",
            color: "#fff",
            margin: "20px 0px 0px 0px",
            width: "250px"
          };
          const thStyle2 ={
            padding: "10px",
            fontWeight: "bold",
            textAlign:"center",
            verticalAlign: "top",
            color: "#fff",
          };
          
          const thStyle3 ={
            padding: "10px",
            fontWeight: "bold",
            textAlign:"center",
            verticalAlign: "top",
            color: "#fff",
          };
          const thStyle4 ={
            padding: "10px",
            fontWeight: "bold",
            textAlign:"center",
            verticalAlign: "top",
            color: "#fff",
          };
          const thStyle5 ={
            padding: "10px",
            width: "30px"
          };
        return (
            <div style={parentStyle}>
                <div style={freeBoardStyle}>
                <h3 className='font1' style={{fontSize:"40px"}}>최신 레시피 목록</h3>
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
              </div>
                <div style={hotBoardStyle}>
                <h3 className='font1' style={{fontSize:"40px", color:"red"}}>HOT 레시피 목록</h3>
                <table style ={tableStyle2}>
                <thead style={theadStyle2}>
                  <tr>
                    <th style={thStyle5}></th>
                    <th style={thStyle1}>제목</th>
                    <th style={thStyle2}>글쓴이</th>
                    <th style={thStyle3}>날짜</th>
                    <th style={thStyle4}>평점</th>
                  </tr>
                </thead>
                <tbody>{this.state.hotList}</tbody>
              </table>
                </div>
            </div>
        );
    }
}

export default MainPageForm;