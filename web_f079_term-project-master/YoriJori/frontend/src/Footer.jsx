import React, {Component} from 'react';

class Footer extends Component{
    render(){
        const divStyle = {
            background: "linear-gradient(to right, #e52d27, #b31217)",
            width:"100%",
            height:"100px",
            marginTop:"100px"
        };
        return(<div style={divStyle}><p style={{textAlign:"center", color:"#FFB4B4"}}>소프트웨어학과 201620918 이건모<br/>
        Email: rjsah5676@ajou.ac.kr<br/>Contact: 010-6385-4676<br/><a style = {{color:"#FFB4B4"}} 
        href="http://portal.ajou.ac.kr">아주대학교</a></p></div>);
    }
}

export default Footer;