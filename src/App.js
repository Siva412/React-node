import React, { Component } from 'react';
import LoginForm from './components/login';
import Home from './components/Dashboard';
import Register from './components/register';
import Acknowledgement from './components/Acknowledgement';
import History from './components/History';
import BusBooking from './components/Booking';
import BookingAck from './components/BookingAck';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import moment from 'moment';
import './App.css';
import './css/common.css'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookingData:"",
      loginData:{},
      loginFlag:false,
      homeFlag:true,
    }
  }
  componentDidMount(){
    if(localStorage.getItem("loginData")){
      let data = JSON.parse(localStorage.getItem("loginData"));
      //this.setState({loginFlag:true,loginData:data.loginData,historyData:data.historyData});
      this.handleLoginFlag(data.loginData);
    }
    else{
      this.setState({loginFlag:false});
    }
  }
  handleBooking(data){
    let storageData = JSON.parse(localStorage.getItem("loginData")), parsedData = JSON.parse(data);
    var hObj={};
    if(parsedData.route){
      storageData.historyData.push({"refNo":"8655677775","bkngDate":moment(parsedData.frmDate).format('DD-MM-YYYY'),"source":parsedData.from,"dest":parsedData.to,"status":"Booked"});  
      hObj = {"refNo":"8655677775","bkngDate":moment(parsedData.frmDate).format('DD-MM-YYYY'),"source":parsedData.from,"dest":parsedData.to,"status":"Booked","seatList":parsedData.seatList,"seviceNo":parsedData.seviceNo};
    }
    else{
      storageData.historyData.push({"refNo":"8655653335","bkngDate":moment(parsedData.frmDate).format('DD-MM-YYYY'),"source":parsedData.stp,"dest":parsedData.dest,"status":"Pending"});
      hObj = {"refNo":"8655653335","bkngDate":moment(parsedData.frmDate).format('DD-MM-YYYY'),"source":parsedData.stp,"dest":parsedData.dest,"status":"Pending"}
    }
    this.setState({bookingData:data,historyData:storageData.historyData});
    localStorage.setItem("loginData",JSON.stringify(storageData));
    return new Promise((resolve,reject) => {
        fetch('http://localhost:3002/api/booking',{
          method:'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify({"userName":storageData.loginData.name, "histObj":hObj})
        }).then(res => {
          return res.json();
        }).then(res => {
          if(res.status == "S"){
            resolve("success");
          }
          else{
            resolve("fail");
          }
        })
      });
    }
      
  // handleLogin(data){
  //   this.setState({loginData:data})
  // }
  handleLoginFlag(data){
    // var historyData = [
    //   {"refNo":"854545454","bkngDate":"02-07-2018","source":"Hyderabad","dest":"Delhi","status":"Confirmed"},
    //   {"refNo":"563232323","bkngDate":"13-08-2018","source":"Hyderabad","dest":"Mumbai","status":"Rejected"},
    //   {"refNo":"874525555","bkngDate":"06-08-2018","source":"Hyderabad","dest":"Goa","status":"Pending"}
    // ];
    var historyData=[];
    fetch('http://localhost:3002/api/historyData',{
      method:'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body:JSON.stringify({"userName":data.name})
    }).then(res => {
      return res.json();
    }).then(res => {
      // if(res && res.length>0 && Object.keys(res[0]).length>0){
      //   historyData = res[0].data;
      // }
      if(res.data && res.status != 'F'){
        historyData = res.data;
      }
      localStorage.setItem("loginData",JSON.stringify({loginFlag:true,loginData:data,historyData:historyData}));
      this.setState({loginFlag:true,loginData:data,historyData:historyData});
    });
  }
  handleLogout(){
    localStorage.removeItem("loginData");
    this.setState({loginFlag:false,loginData:{}});
  }
  render() {
    return (
      <div>
        {/* <div className="app-hdr text-center">
          <h1>Header</h1>
          {this.state.loginData.name?<div>{this.state.loginData.name}</div>:null}
        </div> */}
        <Router>  
        <Switch>
          <Route exact path='/' component={(props)=>(<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><LoginForm {...props} Login={this.handleLoginFlag.bind(this)}/></div>)} />
          <Route exact path='/home' component={(props)=>(<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><Home {...props} Submit={this.handleBooking.bind(this)} Userdata={this.state.loginData}/></div>)} /> 
          <Route exact path='/register' component={(props) => (<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><Register {...props} Login={this.handleLoginFlag.bind(this)}/></div>)}/>
          <Route path='/acknowledgement' component={(props) => (<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><Acknowledgement {...props} Data={this.state.bookingData}/></div>)} />
          <Route path='/bookingack' component={(props) => (<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><BookingAck {...props} Data={this.state.bookingData}/></div>)} />
          <Route path='/history' component={(props) => (<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><History {...props} Data={this.state.historyData}/></div>)} />
          <Route path='/booking' component={(props) => (<div><Header {...props} state={this.state} Logout={this.handleLogout.bind(this)}/><BusBooking {...props} Submit={this.handleBooking.bind(this)} Data={this.state.historyData}/></div>)} />   
        </Switch>
      </Router>
     </div>
    );
  }
}
class Header extends React.Component{
  constructor(props){
    super(props);
    this.changeClass = this.changeClass.bind(this);
    this.state = {
      homeFlag:"booking"
    }
  }
  componentDidMount(){
    let pathName = this.props.history.location.pathname;
    pathName = pathName.substring(1);
    // if(pathName == '/home' || pathName == '/acknowledgement'){
    //   this.setState({homeFlag:true});
    // }
    // else if(pathName == '/history' || pathName == '/register'){
    //   this.setState({homeFlag:false});
    // }
    this.setState({homeFlag:pathName});
    // if(Object.keys(this.props.state.loginData).length == 0){
    //   if(localStorage.getItem('loginData')){
    //     this.handleNavigation();
    //   }
    // }
  }
  handleNavigation(){
    this.props.Logout();
    this.props.history.push('/');
  }
  changeClass(type){
    // if(type == "home"){
    //   this.props.history.push('/home');
    // }
    // else{
    //   this.props.history.push('/history');
    // }
    this.props.history.push('/'+type);
  }
  render(){return (
    <div className="app-hdr">
          <div className="hdr-title">
            Travel App
          </div>
          <div className="hdr-data text-right">
          {this.props.state.loginFlag?<span className="usr-name">Welcome {this.props.state.loginData.name}</span>:null}
          {this.props.state.loginFlag?<span className="log-out" onClick={this.handleNavigation.bind(this)}>Logout</span>:null}
          </div>
          {this.props.state.loginFlag?<div className="hdr-menu">
          <span onClick={()=>this.changeClass("booking")} className={(this.state.homeFlag==='booking')?'hdr-border':''}>Bus Booking</span>
            <span onClick={()=>this.changeClass("home")} className={(this.state.homeFlag==='home')?'hdr-border':''}>Bus Hiring</span>
            <span onClick={()=>this.changeClass("history")} className={(this.state.homeFlag==='history')?'hdr-border':''}>History</span>
          </div>:null}
        </div>
  )
}
}

export default App;
