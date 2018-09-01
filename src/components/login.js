import React ,{ Component }from 'react';
import Button from '@material-ui/core/Button';
import jquery  from 'jquery';
import bootstrap from 'bootstrap';
import '../css/login.css';
import image1 from  '../images/Gujarat-Tourism.jpg';
import image2 from '../images/hydrabad.jpg';
import image3 from  '../images/rajasthan.jpg';
 import FacebookProvider ,{Login} from 'react-facebook-login';
 import FacebookLogin from 'react-facebook-login';
 import GoogleLogin from 'react-google-login';
 
 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


//import ReactDOM from 'react-dom';

class LoginForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {}
        }
     }
     responseFacebook(response) {
        if(response.status == 'unknown' ||response.status == undefined){
            return;
        }
        let obj = {
            "name":response.name,
            "email":response.name+"@gmail.com"
        };
        this.handleAlternateLogin(obj);
        // this.props.Login({
        //     "name":response.name,
        //     "email":response.name+"@gmail.com"
        // })
        // this.props.history.push("/booking");
        // console.log(response);
      }
       responseGoogle (response){
        let obj = {
            "name":response.w3.ig,
            "email":response.profileObj.email
        }
        this.handleAlternateLogin(obj);
        // this.props.Login({
        //     "name":response.w3.ig,
        //     "email":response.profileObj.email
        // });
        // this.props.history.push("/booking");      
    }
    handleAlternateLogin(obj){
        fetch('http://localhost:3002/api/signup',{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "userName":obj.name,
                    "pwd":"NA"
                  })
            }).then(res => res.json())
            .then(res=>{
                if(res.status == "S"){
                    this.props.Login(obj);
                    this.props.history.push('/booking');
                }
            }).catch(err => {
                
            });
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
      
        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "User Name Cannot be empty";
        }
        if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["name"] = "User name should contain Only letters";
            }        
         }
        //Email
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Password Cannot be empty ";
        }
      
       this.setState({errors: errors});
       return formIsValid;
      }
    loginSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            fetch('http://localhost:3002/api/login',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({"userName":this.state.fields.name,"pwd":this.state.fields.password})
            }).then(response => {
                return response.json();
            }).then(data => {
                if(data.status == "S"){
                    this.props.Login(this.state.fields);
                    this.props.history.push("/booking");
                }
                else{
                    alert("please enter valid credentials");
                }
            }).catch(err => {

            });
        }

    }
    register(e){
        e.preventDefault();
        this.props.history.push("/register");
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    
    render(){

       
        return(
  <div className="container">
   <div className="row">
        <div className="container col-sm-9 col-md-6 col-lg-8">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>

                      <div className="carousel-inner">
                        <div className="carousel-item active">
                                <img src={image2} alt="Chania"/>
                                <div className="carousel-caption">
                                    <h3>Hyderabad tourism</h3>
                                    <p>Hyderabad is always so much fun!</p>
                                </div>
                        </div>

                        <div className="carousel-item">
                            <img src={image1} alt="Chicago"/>
                            <div className="carousel-caption">
                                <h3>Gujarat-Tourism</h3>
                                <p>Gujarat is waiting for You!</p>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img src={image3} alt="New York" />
                            <div className="carousel-caption">
                                <h3>Rajastan Tourism</h3>
                                <p>We love to serve you!</p>
                            </div>
                        </div>
                </div>

                    <a className="left carousel-control-prev" href="#myCarousel" data-slide="prev">
                        <span className="glyphicon glyphicon-chevron-left"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="right carousel-control-next" href="#myCarousel" data-slide="next">
                        <span className="glyphicon glyphicon-chevron-right"></span>
                        <span className="sr-only">Next</span>
                    </a>
                     </div>
       </div>
                    <div className="col-sm-3 col-md-6 col-lg-4">
                        <form  className="form-signin">
                        <h2 className="heading"> User Login </h2>
                        <input ref="name" type="text" size="30" className="form-control" required="" autoFocus="" placeholder="User Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                        <span className="errtext">{this.state.errors["name"]}</span>
                    
            
                        <input ref="password"  type="password" size="30"  className="form-control"required=""  placeholder="Password" onChange={this.handleChange.bind(this,"password")} value={this.state.fields["password"]} />
                        <span className="errtext">{this.state.errors["password"]}</span>
                    
                        {/* <button  id="submit" value="Submit" className="btn btn-lg btn-primary btn-block" onClick={this.loginSubmit.bind(this)}>Sign In</button>
                        <button  id="submit1" value="Submit" className="btn btn-lg btn-primary btn-block" onClick={this.register.bind(this)}>Sign Up</button> */}
                        <div className="mg-btm10">
                        <Button variant="contained" fullWidth={true} color="primary" onClick={this.loginSubmit.bind(this)}>Sign In</Button>
                        </div>
                        <div className="mg-btm10">
                        <Button variant="contained" fullWidth={true} color="primary" onClick={this.register.bind(this)}>Sign Up</Button>
                        </div>
                        <section>
                        <p>You can login with Social Media Too!!!</p>
                        <FacebookLogin
                        appId="291155621400326"
                        autoLoad={false}
                        fields="name,email,picture"
                        cssClass="facebook-btn"
                        callback={this.responseFacebook.bind(this)}
                      /><br/>
                      <div className="mg-btm10">
                          </div>
                      <GoogleLogin 
                        clientId="495627345711-2e0smeqgklit8o12o1te8t5htqcedm8a.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        className="gmail-btn"
                        onSuccess={this.responseGoogle.bind(this)}
                        onFailure={this.responseGoogle.bind(this)}/>
                        </section>
                        </form>          
                    </div>
         </div>
         </div>
        );
     
    }
   
}
export default LoginForm;