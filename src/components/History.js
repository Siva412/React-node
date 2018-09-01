import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import '../css/common.css';

class History extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="parent-container dashboard-cnt history-cnt">
            <AppBar position="static" className="dash-bar">
                <Toolbar variant="dense">
                <Typography variant="title" color="inherit">
                    Booking history:
                </Typography>
                </Toolbar>
            </AppBar>
                <Paper elevation={5}>
                    <div className="container">
                        {
                            (typeof this.props.Data == 'object' && this.props.Data.length>0) ?<div className="row tb-head">
                                <div className="col-md-1">S.No</div>
                                <div className="col-md-2">Ref No.</div>
                                <div className="col-md-3">Booking date</div>
                                <div className="col-md-2">Source</div>
                                <div className="col-md-2">Destination</div>
                                <div className="col-md-2">Status</div>
                            </div>:<div>No records found</div>
                        }
                        {
                            typeof this.props.Data == 'object' && this.props.Data.map(function(a,i){
                            return (
                                <div key={i}>
                            <div className="row tb-cell tb-web">
                            <div className="col-md-1">{i+1}.</div>
                            <div className="col-md-2">{a.refNo}</div>
                            <div className="col-md-3">{a.bkngDate}</div>
                            <div className="col-md-2">{a.source}</div>
                            <div className="col-md-2">{a.dest}</div>
                            <div className={"col-md-2 "+a.status}>{a.status}</div>
                            </div>
                            <div className="row tb-cell tb-mob">
                                <div>
                                <span className="mob-head">S.No :</span>
                                <span className="mob-cell">{i+1}</span>
                                </div>
                                <div>
                                <span className="mob-head">Ref No. :</span>
                                <span className="mob-cell">{a.refNo}</span>
                                </div>
                                <div>
                                <span className="mob-head">Booking date :</span>
                                <span className="mob-cell">{a.bkngDate}</span>
                                </div>
                                <div>
                                <span className="mob-head">Source :</span>
                                <span className="mob-cell">{a.source}</span>
                                </div>
                                <div>
                                <span className="mob-head">Destination :</span>
                                <span className="mob-cell">{a.dest}</span>
                                </div>
                                <div>
                                <span className="mob-head">Status :</span>
                                <span className={'mob-cell '+a.status}>{a.status}</span>
                                </div>
                            </div>
                            </div>
                            )
                        })
                            }
                    </div>
                </Paper>
            </div>
        )
    }
}
export default History;