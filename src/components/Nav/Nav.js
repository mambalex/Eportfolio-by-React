import React  from 'react';
import './Nav.css'


const Nav =(props) => (
            <div className="Nav"
                 style={{
                     backgroundColor:props.backgroundColor,
                     borderBottom: props.border
                 }}
                 onClick={()=> props.click(props.type)}
            >
                <div className="icons">
                    <i className={props.img}></i>
                </div>
                <div className="title-num">
                    <div className="num">{props.num}</div>
                    <div className="title">{props.type}</div>
                </div>
            </div>
)



export default Nav;