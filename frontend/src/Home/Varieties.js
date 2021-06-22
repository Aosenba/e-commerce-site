import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from './Variety.js';

const Varieties = () => {
    const [plus1, setplus1] = useState(true);
    const [plus2, setplus2] = useState(true);
    const [plus3, setplus3] = useState(true);
    const [plus4, setplus4] = useState(true);
    return (
        <ul className="variety">
     
              
        <li >
        <div className="main-list">
          <div> <h3>{data.variety[0].parent}</h3>  </div>
          <div>  <i className={plus1?"fa fa-plus plus" : "fa fa-plus plus rotate"} 
         onClick={()=>setplus1(!plus1)} ></i></div>
       

        <div className={plus1?'drop-variety' : `drop-variety open`}>
                <ul>
                  <li><div>{data.variety[0].child1}
                      <Link to={`/products/${data.variety[0].child1.toLowerCase()}`} >
                        <i className="fa fa-angle-double-right"></i></Link>
                  </div></li>
                  <li><div>{data.variety[0].child2}
                      <Link to={`/products/${data.variety[0].child2.toLowerCase()}`} >
                        <i className="fa fa-angle-double-right"></i></Link>
                  </div></li>
                  <li><div>{data.variety[0].child3}
                      <Link to={`/products/${data.variety[0].child3.toLowerCase()}`} >
                        <i className="fa fa-angle-double-right"></i></Link>
                  </div></li>
                  {
                    data.variety[0].child4 &&  <li><div>{data.variety[0].child4}<i className="fa fa-angle-double-right"></i></div></li>
                  }
                 
                </ul>
        </div>
        </div>
       </li> 
       <li >
        <div className="main-list">
        <div> <h3>{data.variety[1].parent}</h3>  </div>
          <div>  <i className={plus2?"fa fa-plus plus" : "fa fa-plus plus rotate"} 
         onClick={()=>setplus2(!plus2)} ></i></div>

        <div className={plus2?'drop-variety' : `drop-variety open`}>
                <ul>
                  <li><div>{data.variety[1].child1}<i className="fa fa-angle-double-right"></i></div></li>
                  <li><div>{data.variety[1].child2}<i className="fa fa-angle-double-right"></i></div></li>
                  <li><div>{data.variety[1].child3}<i className="fa fa-angle-double-right"></i></div></li>
                  {
                    data.variety[1].child4 &&  <li><div>{data.variety[1].child4}<i className="fa fa-angle-double-right"></i></div></li>
                  }
                 
                </ul>
        </div>
        </div>
       </li>
       <li >
        <div className="main-list">
        <div> <h3>{data.variety[2].parent}</h3>  </div>
          <div>  <i className={plus3?"fa fa-plus plus" : "fa fa-plus plus rotate"} 
         onClick={()=>setplus3(!plus3)} ></i></div>
        <div className={plus3?'drop-variety' : `drop-variety open`}>
                <ul>
                  <li><div>{data.variety[2].child1}<i className="fa fa-angle-double-right"></i></div></li>
                  <li><div>{data.variety[2].child2}<i className="fa fa-angle-double-right"></i></div></li>
                  <li><div>{data.variety[2].child3}<i className="fa fa-angle-double-right"></i></div></li>
                  {
                    data.variety[2].child4 &&  <li><div>{data.variety[2].child4}<i className="fa fa-angle-double-right"></i></div></li>
                  }
                 
                </ul>
        </div>
        </div>
       </li>
       <li >
        <div className="main-list">
        <div> <h3>{data.variety[3].parent}</h3>  </div>
          <div>  <i className={plus4?"fa fa-plus plus" : "fa fa-plus plus rotate"} 
         onClick={()=>setplus4(!plus4)} ></i></div>
        <div className={plus4?'drop-variety' : `drop-variety open`}>
                <ul>
                  <li><div>{data.variety[3].child1}<i className="fa fa-angle-double-right"></i></div></li>
                  <li><div>{data.variety[3].child2}<i className="fa fa-angle-double-right"></i></div></li>
                  <li><div>{data.variety[3].child3}<i className="fa fa-angle-double-right"></i></div></li>
                  {
                    data.variety[3].child4 &&  <li><div>{data.variety[3].child4}<i className="fa fa-angle-double-right"></i></div></li>
                  }
                 
                </ul>
        </div>
        </div>
       </li> 
      
   
  
  </ul>
    )
}

export default Varieties
