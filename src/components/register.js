import React from 'react';
import '../css/register.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Register extends React.Component{

    constructor(props){
        super(props);
  
        this.state = {
            fields: {},
            errors: {}
        }
        
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
        if(!fields["lName"]){
            formIsValid = false;
            errors["lName"] = "last Name Cannot be empty";
         }
         if(!fields["fName"]){
            formIsValid = false;
            errors["fName"] = "first Name Cannot be empty";
         }
        if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["name"] = "User name should contain Only letters";
            }        
         }
       
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Password Cannot be empty ";
        }
        //Email
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Email Cannot be empty";
         }
 
         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        } 
        //mobile
        if(!fields["mobile"]){
            formIsValid = false;
            errors["mobile"] = "Mobile number cannot be empty ";
         }
        if(typeof fields["mobile"] !== "undefined"){
            if(fields["mobile"].length>10|| fields["mobile"].length<10){
                formIsValid = false;            
                errors["mobile"] = "Please enter valid mobile number";
            }
        }
        if(!fields["DOB"]){
            formIsValid = false;
            errors["DOB"] = "DOB Cannot be empty";
         }
      
       this.setState({errors: errors});
       return formIsValid;
      }
    register(e){
        e.preventDefault();
      

        if(this.handleValidation()){
            fetch('http://localhost:3002/api/signup',{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "userName":this.state.fields["name"],
                    "pwd":this.state.fields["password"]
                  })
            }).then(res => res.json())
            .then(res=>{
                if(res.status == "S"){
                    this.props.Login(this.state.fields);
                    this.props.history.push('/booking');
                }
                else if(res.status == "AE"){
                    alert("User already exists");
                }
            }).catch(err => {
                
            });
            //this.props.history.push('/booking');
        }

    }
    
    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    render(){

        return(
            <div className="bck-img">
            <div className="wrapper">
            <form className="form-signin">
           <div>
           <h2> User Registration </h2>
           </div>
            <input ref="name" type="text" size="30" className="form-control" required="" autoFocus="" placeholder="User Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
            <span className="errtext">{this.state.errors["name"]}</span>
          
  
            <input ref="password"  type="password" size="30"  className="form-control"required=""  placeholder="Password" onChange={this.handleChange.bind(this,"password")} value={this.state.fields["password"]} />
            <span className="errtext">{this.state.errors["password"]}</span>
           
            <input ref="fName"  type="text" size="30"  className="form-control"required=""  placeholder="First Name" onChange={this.handleChange.bind(this,"fName")} value={this.state.fields["fName"]} />
            <span className="errtext">{this.state.errors["fName"]}</span>
           
            <input ref="lName"  type="text" size="30"  className="form-control"required=""  placeholder="Last Name" onChange={this.handleChange.bind(this,"lName")} value={this.state.fields["lName"]} />
            <span className="errtext">{this.state.errors["lName"]}</span>

            <input ref="mobile"  type="number" size="10" maxLength="10" className="form-control"required=""  placeholder="Mobile Number" onChange={this.handleChange.bind(this,"mobile")} value={this.state.fields["mobile"]} />
            <span className="errtext">{this.state.errors["mobile"]}</span>

            <input ref="email"  type="email" size="30"  className="form-control" placeholder="Email" onChange={this.handleChange.bind(this,"email")} value={this.state.fields["email"]} />
            <span className="errtext">{this.state.errors["email"]}</span>

            <input ref="DOB"  type="Date" className="form-control"required=""placeholder="Date Of Birth" onChange={this.handleChange.bind(this,"DOB")} value={this.state.fields["DOB"]} />
            <span className="errtext">{this.state.errors["DOB"]}</span>

            {/* <button  id="submit" value="Register" className="btn btn-lg btn-primary btn-block" onClick= {this.register.bind(this)}>Register</button> */}
            <Button variant="contained" fullWidth={true} color="primary" className="mg-btm10" onClick={this.register.bind(this)}>Register</Button>
            <Button variant="contained" fullWidth={true} color="default" onClick={()=>{this.props.history.push('/')}}>Cancel</Button>

            </form>          
         </div>
         </div>

        )
    }

}
export default Register;