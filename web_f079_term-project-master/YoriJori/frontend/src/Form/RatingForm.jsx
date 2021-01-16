import React, { Component } from "react";
import axios from "axios";
import {} from "jquery.cookie";
import "../App.css";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class RatingForm extends Component {
    state = {
        Rating: '',
        wid: 0,
    };
    componentDidMount() {
        this.getRatingList();
    }
    getRatingList = () => {
        const send_param = {
          headers,
          _id: this.props._id
        };
        axios
          .post("http://localhost:8080/board/getRatingList", send_param)
          .then(returnData => {
            if (returnData.data.list.length > 0) {
              const ratings = returnData.data.list;
              let sumRating = 0;
              for(let i=0; i<ratings.length; i++) {
                sumRating+=ratings[i].rating;
              }
              let result = sumRating/ratings.length;
              result=result.toFixed(1);
              this.setState({wid: result*10});
              this.setState({ Rating: result.toString() +' / '+ ratings.length.toString()+'명 참여'});
            } else {
                this.setState({ Rating: '0.0 / 0명 참여'});
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
    
      render() {
        const pStyle = {
        };
    
        return (
          <p style={pStyle}>
            <span className='star-rating'>
            <span style ={{width:this.state.wid*2+"%"}}></span>
            </span> {this.state.Rating}
          </p>
        );
      }
}

export default RatingForm;