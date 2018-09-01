import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import '../css/common.css';

class Acknowledgement extends React.Component {
    handleDone(){
        this.props.history.push('/home');
    }
    render(){
        let data = {};
        data = this.props.Data && JSON.parse(this.props.Data);
        if(!data){
            this.props.history.goBack();
            return null;
        }
        return(
            <div className="parent-container dashboard-cnt ack-cnt">
            <AppBar position="static" className="dash-bar">
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                    Booking details:
                </Typography>
                </Toolbar>
            </AppBar>
                <Paper elevation={5}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">Starting location</div><div className="col-md-3">{data.stp}</div>
                            <div className="col-md-3">Starting point</div><div className="col-md-3">{data.sl}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">Destination</div><div className="col-md-3">{data.dest}</div>
                            <div className="col-md-3">From date</div><div className="col-md-3">{moment(data.frmDate).format("DD MMM YYYY")}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">To Date</div><div className="col-md-3">{moment(data.toDate).format("DD MMM YYYY")}</div>
                            <div className="col-md-3">Passenger count</div><div className="col-md-3">{data.vType}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">Bus type</div><div className="col-md-3">{data.pref == 'A'?"AC":"Non AC"}</div>
                            <div className="col-md-3">Name</div><div className="col-md-3">{data.userName}</div>
                        </div> 
                        <div className="row">
                            <div className="col-md-3">Email</div><div className="col-md-3">{data.email}</div>
                            <div className="col-md-3">Mobile</div><div className="col-md-3">{data.mobile}</div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-12">
                                <Button variant="contained" className="reg-btn" color="primary" onClick={this.handleDone.bind(this)}>Done</Button>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}
export default Acknowledgement;