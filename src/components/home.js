import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import '.././node_modules/bootstrap/dist/css/bootstrap.css';
// import '.././node_modules/bootstrap/dist/css/bootstrap.min.css';


class Home extends React.Component{
  render(){
    return(
      <div>
        <h1 > Travelling Together Is Easy</h1>
         
        <p>Hire Buses, Tempo Travellers and Cars at your convenience</p>
        <div className="row">
        <div id="city" className="col-sm-3">
          <span>City Of Hire</span>
          <div>
          <img id="autocomplete_img" src="/bushire/icons/tickets.svg" alt="hjgh"/>
          <input type="text" className="SourceCity" id="autocomplete_input" placeholder="eg: Mumbai"/>
          </div>
        </div>   
        <div id="pickup" className="col-sm-3">
          <span>STARTING POINT</span>
          <div>
          <img id="autocomplete_img" src="/bushire/icons/tickets.svg" alt="hjgh"/>
          <input type="text" className="SourceCity" id="autocomplete_input" placeholder="eg: Mumbai"/>
          </div>
        </div> 
        <div id="destination" className="col-sm-3">
          <span>DESTINATION - Local/Outstation</span>
          <div>
          <img id="autocomplete_img" src="/bushire/icons/tickets.svg" alt="hjgh"/>
          <input type="text" className="SourceCity" id="autocomplete_input" placeholder="eg: Mumbai"/>
          </div>
        </div>  
        <div className="col-sm-3">
        <button id="hire_btn" className="btn btn-sm btn-primary btn-block">HIRE</button> 
        </div> 
        </div>    
   </div>
       
      );


  }
}
export default Home;