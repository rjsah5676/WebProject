import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
import { Button } from "react-bootstrap";
import '../App.css'

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class RatingWriteForm extends Component {
    state = {
        wid:0,
    };
    clickRating = (event) => {
        let a = document.getElementById('st').getBoundingClientRect().left;
        let x = event.clientX - a;
        for(let i=1; i<11; i++) {
            if(x < i*88/10) {this.setState({wid:10*i}); break;};
        }
    }
    submitRating = () => {
        if (this.state.wid === 0) {
            alert("평점을 선택해주세요");
            return;
          }
        let rating = this.state.wid / 20;
        const send_param = {
            headers,
            writer: $.cookie("login_id"),
            board: this.props._id,
            rating: rating,
        };
        axios
            .post("http://localhost:8080/board/submitRating", send_param)
            .then(returnData => {
                alert(returnData.data.message);
                if(returnData.data.message === "평점 등록이 완료되었습니다.")
                    window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const divStyle = {
            marginLeft: "20px"
          };

        return(<div style={divStyle}>
            평점 달기
            <br/>
            <span id='st'className='star-rating' style ={{float:"left",cursor:'pointer',marginTop:'5px'}} onClick={this.clickRating.bind(this)}>
            <span style ={{width:this.state.wid+"%", cursor:'pointer'}}></span>
            </span> {this.state.Rating}
            <Button variant="info" onClick={this.submitRating} style={{marginLeft:"10px",float:"left",fontSize:"15px",width:"50px",height:"30px",padding:"0px"}}>제출</Button>
        </div>);
    };
}

export default RatingWriteForm;