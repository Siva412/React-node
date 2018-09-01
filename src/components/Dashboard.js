import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../css/common.css';

const buttonTheme = createMuiTheme({
    palette:{
        primary:{
            main:"#ccc"
        }
    }
});
const editIconStyle = {
        height:"40px",
        width: "40px"
}
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            formData:{
                //  frmDate: moment().toString(),
                //  toDate : moment().toString(),
                 pref:"A",
                 userName: this.props.Userdata?this.props.Userdata.name:'',
                 email: this.props.Userdata?this.props.Userdata.email:'',
                 mobile: this.props.Userdata?this.props.Userdata.mobile:'',
            },
            errorState:{},
            locationFormFlag:true,
            vehicleForm:false,
            vehicleFormEdit:true,
            contactFormFlag:false
        }
    }
    handleChange(e,field,form){
        let data = this.state.formData;
        if((field === "frmDate" || field === "toDate")){
            if(!e){
                return;
            }
            data[field] = e.toString();
            if(field === "frmDate" && data["toDate"]){
                data["toDate"] = e.toString();
            }
        }
        else{
            data[field] = e.target.value;
        }
        this.setState({formData : data});
        this.handleValidation(e, field, form);
    }
    handleValidation(e, field, form){
        let errors = this.state.errorState;
        let validFlag = true;
        if(form === 'lForm'){
            if(e.target.id === 'stp' || e.target.id === "submit-btn"){
                errors.stp='';
                if(!e.target.value && !this.state.formData.stp){
                    validFlag = false;
                    errors.stp = 'Please enter source location';
                }
            }
            if(e.target.id ==='sl' || e.target.id === "submit-btn"){
                errors.sl='';
                if(!e.target.value && !this.state.formData.sl){
                    validFlag = false;
                    errors.sl = 'Please enter source point';
                }
            }
            if(e.target.id === 'dest' || e.target.id === "submit-btn"){
                errors.dest='';
                if(!e.target.value && !this.state.formData.dest){
                    validFlag = false;
                    errors.dest = 'Please enter destination';
                }
            }
        }
        if(form === 'vForm'){
            if(field === 'frmDate' || (e.target && e.target.id === "submit-btn")){
                errors.frmDate='';
                if(!e || !this.state.formData.frmDate){
                    validFlag = false;
                    errors.frmDate = 'Please select start date';
                }
            }
            if(field === 'toDate' || (e.target && e.target.id === "submit-btn")){
                errors.toDate='';
                if(!e || !this.state.formData.toDate){
                    validFlag = false;
                    errors.toDate = 'Please select end date';
                }
            }
            if(e.target && (e.target.id === 'vType' || e.target.id === "submit-btn")){
                errors.vType='';
                if(!e.target.value && !this.state.formData.vType){
                    validFlag = false;
                    errors.vType = 'Please enter passenger count';
                }
                else{
                    if(isNaN(this.state.formData.vType) || !(/[0-9]/.test(this.state.formData.vType[this.state.formData.vType.length - 1]))){
                        validFlag = false;
                        errors.vType = 'Please enter valid count';
                    }
                    else{
                        // if(!(/[0-9]/.test(this.state.formData.vType[this.state.formData.vType.length - 1]))){
                        //     validFlag = false;
                        //     errors.vType = 'Please enter valid count';
                        // }
                        // else{

                        // }
                        if(this.state.formData.vType <=0 || this.state.formData.vType > 60){
                            validFlag = false;
                            errors.vType = 'Please select a value in between 1 and 60';
                        }
                    }
                }
            }
        }
        if(form === 'cForm'){
            if(e.target.id === 'userName' || e.target.id === "submit-btn"){
                errors.userName='';
                if(!e.target.value && !this.state.formData.userName){
                    validFlag = false;
                    errors.userName = 'Please enter name';
                }
            }
            if(e.target.id === 'email' || e.target.id === "submit-btn"){
                errors.email='';
                if(!e.target.value && !this.state.formData.email){
                    validFlag = false;
                    errors.email = 'Please enter email';
                }
                else{
                    if(!emailRegex.test(this.state.formData.email)){
                        validFlag = false;
                        errors.email = 'Please enter a valid email';
                    }
                }
            }
            if(e.target.id === 'mobile' || e.target.id === "submit-btn"){
                errors.mobile='';
                if(!e.target.value && !this.state.formData.mobile){
                    validFlag = false;
                    errors.mobile = 'Please enter mobile no.';
                }
                else{
                    if(!(/^[0-9]{10}$/.test(this.state.formData.mobile))){
                        validFlag = false;
                        errors.mobile = 'Please enter a valid mobile no.';
                    }
                }
            }
        }
        if(field === "edit"){
            this.setState({errorState:{}});
        }
        else{
            this.setState({errorState:errors});
        }
        return validFlag;
    }
    handleForms(form,type,flag){
        let obj = {target:{id:"submit-btn"}};
        if(type === "edit"){
            this.setState({errorState:{}});
        }
        if(form === 'lForm'){  
            if(type ==="submit" && this.handleValidation(obj, type, form)){
                this.setState({locationFormFlag:flag});
                this.setState({vehicleForm:true});
            }
            if(type === "edit"){
                this.setState({locationFormFlag:flag});
                this.setState({vehicleForm:false});
                if(this.handleValidation(obj, type, "vForm")){
                    this.setState({vehicleFormEdit:false});
                }
                else{
                    this.setState({vehicleFormEdit:true});
                }
            }
        }
        else if(form === "vForm"){
            if(this.handleValidation(obj, type, form) && this.handleValidation(obj, type, "lForm")){
                this.setState({vehicleForm:flag});
                this.setState({locationFormFlag:false});
            }
        }
        else{
            if(this.handleValidation(obj, type, form)){
                //alert("success");
                this.props.Submit(JSON.stringify(this.state.formData)).then(res => {
                    if(res =="success"){
                        this.props.history.push("/acknowledgement");
                    }
                }).then(err => {

                });
            }
        }
    }
    render(){
        return (
            <div className="parent-container dashboard-cnt">
            <div className="hire-div">
            <AppBar position="static" className="dash-bar">
                <Toolbar variant="dense">
                <Typography variant="subheading" color="inherit">
                    <span className="number-dot">1</span>  Locations
                </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={5}>
            <div className="form-div">
            {LocationForm(this.state, this.handleForms.bind(this), this.handleChange.bind(this))}
            </div>
            </Paper>
            </div>

            <div className="hire-div">
            <AppBar position="static" className="dash-bar">
                <Toolbar variant="dense">
                <Typography variant="subheading" color="inherit">
                <span className="number-dot">2</span>  Bus Requirements
                </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={5}>
            <div className="form-div">
            {VehicleForm(this.state, this.handleForms.bind(this), this.handleChange.bind(this))}
            </div>
            </Paper>
            </div>
            <div className="hire-div">
            <AppBar position="static" className="dash-bar">
                <Toolbar variant="dense">
                <Typography variant="subheading" color="inherit">
                <span className="number-dot">3</span>  Contact information
                </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={5}>
            <div className="form-div">
            {ContactForm(this.state, this.handleForms.bind(this), this.handleChange.bind(this))}
            </div>
            </Paper>
            </div>
            </div>
        )
    }
}

function LocationForm(props,hideFun,formFun){
    if(props.locationFormFlag){
        return (
            <div>
            <form autoComplete="off" className="reg-form mg-btm6" noValidate>
                        <div className="row">
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="stp">Starting Point:</label>
                                <input type="text" className="form-control" id="stp" value={props.formData.stp} onChange={(e) => formFun(e,"stp","lForm")}/>
                                <small className="form-text form-err">{props.errorState.stp}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="sl">Starting Location:</label>
                                <input type="text" className="form-control" id="sl" value={props.formData.sl} onChange={(e) => formFun(e,"sl","lForm")}/>
                                <small className="form-text form-err">{props.errorState.sl}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="dest">Destination:</label>
                                <input type="text" className="form-control" id="dest" value={props.formData.dest} onChange={(e) => formFun(e,"dest","lForm")}/>
                                <small className="form-text form-err">{props.errorState.dest}</small>
                            </div>
                            </div>
                        </div>
                    </form>
                {/* <button className="btn btn-success" onClick={(e) => hideFun('lForm','submit',false)}>Continue</button> */}
                <Button variant="contained" className="reg-btn" color="primary" onClick={(e) => hideFun('lForm','submit',false)}>Continue</Button>
            </div>
        )
    }
    else{
        return (
            <div className="row edit-row">
                <div className="col-md-4">
                    <span className="edit-span">Starting Point:</span>
                    <div>{props.formData.stp}</div>
                </div>
                <div className="col-md-4">
                    <span className="edit-span">Starting Location:</span>
                    <div>{props.formData.sl}</div>
                </div>
                <div className="col-md-4">
                    <span className="edit-span">Destination:</span>
                    <div>{props.formData.dest}</div>
                </div>
                {/* <button className="btn btn-success" onClick={(e) => hideFun('lForm','edit',true)}>Edit</button> */}
                <div className="col-md-12 text-right">
                <Button variant="fab" style={editIconStyle} color="primary" aria-label="Edit" onClick={(e) => hideFun('lForm','edit',true)}>
                    <EditIcon />
                </Button>
                </div>
            </div>
        )
    }
}

function VehicleForm(props,hideFun,formFun){
    function handleBlur(e){
        console.log(e);
    }
    if(props.locationFormFlag && props.vehicleFormEdit){
        return null;
    }
    if(props.vehicleForm){
        return (
            <div>
            <form autoComplete="off" className="reg-form mg-btm6" noValidate>
                        <div className="row">
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="frmDate">From Date:</label>
                                {/* <input type="text" className="form-control" id="frmDate" value={props.formData.frmDate} onChange={(e) => formFun(e,"frmDate","vForm")}/> */}
                                <DatePicker placeholderText="Start date" dateFormat="DD/MM/YYYY" className="form-control" minDate={moment()} selected={props.formData.frmDate?moment(props.formData.frmDate):null} id="frmDate" onChange={(e) => formFun(e,"frmDate","vForm")} />
                                <small className="form-text form-err">{props.errorState.frmDate}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="toDate">To Date:</label>
                                {/* <input type="text" className="form-control" id="toDate" value={props.formData.toDate} onChange={(e) => formFun(e,"toDate","vForm")}/> */}
                                <DatePicker placeholderText="End date" dateFormat="DD/MM/YYYY" className="form-control" minDate={moment(props.formData.frmDate)} selected={props.formData.toDate?moment(props.formData.toDate):null} id="toDate" onChange={(e) => formFun(e,"toDate","vForm")} />
                                <small className="form-text form-err">{props.errorState.toDate}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="vType">No. of Passengers:</label>
                                <input type="text" className="form-control" min="0" max="60" id="vType" value={props.formData.vType} onChange={(e) => formFun(e,"vType","vForm")} onBlur={handleBlur}/>
                                <small className="form-text form-err">{props.errorState.vType}</small>
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                            <div className="form-group">
                            <label htmlFor="pref" className="display-blk">Preference:</label>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="prefA" name="pref" value="A" checked={props.formData.pref === 'A'} className="custom-control-input" onChange={(e) => formFun(e,"pref","vForm")}/>
                                    <label className="custom-control-label" htmlFor="prefA">AC</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="prefN" name="pref" value="N" checked={props.formData.pref === 'N'} className="custom-control-input" onChange={(e) => formFun(e,"pref","vForm")}/>
                                    <label className="custom-control-label" htmlFor="prefN">Non AC</label>
                                </div>
                                <small className="form-text form-err">{props.errorState.pref}</small>
                            </div>
                            </div>
                        </div>
                    </form>
                {/* <button className="btn btn-success" onClick={(e) => hideFun('vForm','submit',false)}>Continue</button> */}
                <Button variant="contained" className="reg-btn" color="primary" onClick={(e) => hideFun('vForm','submit',false)}>Continue</Button>
            </div>
        )
    }
    else{
        return (
            <div className="row edit-row">
                <div className="col-md-4">
                    <span className="edit-span">From Date:</span>
                    <div>{moment(props.formData.frmDate).format('DD MMM YYYY')}</div>
                </div>
                <div className="col-md-4">
                    <span className="edit-span">To Date</span>
                    <div>{moment(props.formData.toDate).format("DD MMM YYYY")}</div>
                </div>
                <div className="col-md-4">
                    <span className="edit-span">No. of Passengers:</span>
                    <div>{props.formData.vType}</div>
                </div>
                <div className="col-md-4">
                    <span className="edit-span">AC/ Non AC</span>
                    <div>{props.formData.pref === "A"?"AC":"Non AC"}</div>
                </div>
                {/* <button className="btn btn-success" onClick={(e) => hideFun('vForm','edit',true)}>Edit</button> */}
                <div className="col-md-12 text-right">
                <Button variant="fab" color="primary" style={editIconStyle} aria-label="Edit" onClick={(e) => hideFun('vForm','edit',true)}>
                    <EditIcon />
                </Button>
                </div>
            </div>
        )
    }
}

function ContactForm(props,hideFun,formFun){
    if(!(props.locationFormFlag || props.vehicleForm)){
        return (
            <div>
            <form autoComplete="off" className="reg-form mg-btm6" noValidate>
                        <div className="row">
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="userName">Name:</label>
                                <input type="text" className="form-control" id="userName" value={props.formData.userName} onChange={(e) => formFun(e,"userName","cForm")}/>
                                <small className="form-text form-err">{props.errorState.userName}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="text" className="form-control" id="email" value={props.formData.email} onChange={(e) => formFun(e,"email","cForm")}/>
                                <small className="form-text form-err">{props.errorState.email}</small>
                            </div>
                            </div>
                            <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile No.:</label>
                                <input type="text" className="form-control" id="mobile" value={props.formData.mobile} onChange={(e) => formFun(e,"mobile","cForm")}/>
                                <small className="form-text form-err">{props.errorState.mobile}</small>
                            </div>
                            </div>
                        </div>
                    </form>
                {/* <button className="btn btn-success" onClick={(e) => hideFun('lForm','submit',false)}>Continue</button> */}
                <Button variant="contained" className="reg-btn" color="primary" onClick={(e) => hideFun('cForm','submit',false)}>Submit</Button>
            </div>
        )
    }
    else{
        return (
            // <div className="row edit-row">
            //     <div className="col-md-4">
            //         <span className="edit-span">Starting Point:</span>
            //         <div>{props.formData.stp}</div>
            //     </div>
            //     <div className="col-md-4">
            //         <span className="edit-span">Starting Location:</span>
            //         <div>{props.formData.sl}</div>
            //     </div>
            //     <div className="col-md-4">
            //         <span className="edit-span">Destination:</span>
            //         <div>{props.formData.dest}</div>
            //     </div>
            //     <div className="col-md-12 text-right">
            //     <Button variant="fab" style={editIconStyle} color="primary" aria-label="Edit" onClick={(e) => hideFun('lForm','edit',true)}>
            //         <EditIcon />
            //     </Button>
            //     </div>
            // </div>
            null
        )
    }
}
export default Dashboard;