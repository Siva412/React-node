import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import '../css/common.css';

class BookingAck extends React.Component {
    handleDone(){
        this.props.history.push('/booking');
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
                            <div className="col-md-3">Service No</div><div className="col-md-3">{data.seviceNo}</div>
                            <div className="col-md-3">Bus Type</div><div className="col-md-3">{data.busType}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">From</div><div className="col-md-3">{data.from}</div>
                            <div className="col-md-3">To</div><div className="col-md-3">{data.to}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">Boarding point</div><div className="col-md-3">{data.bPoint}</div>
                            <div className="col-md-3">Dropping point</div><div className="col-md-3">{data.dPoint}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">Journey Date</div><div className="col-md-3">{moment(data.date).format("DD MMM YYYY")}</div>
                            <div className="col-md-3">Route</div><div className="col-md-3">{data.route}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">No of tickets</div><div className="col-md-3">{data.seats}</div>
                            <div className="col-md-3">Total fare</div><div className="col-md-3">₹ {data.price}</div>
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
export default BookingAck;