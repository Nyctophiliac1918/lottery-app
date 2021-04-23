import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    table: {
    minWidth: 650
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "black",
        backgroundColor:"#f1f1f1",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function TicketTable(props) {
    const classes = useStyles();
    const [tickets, setTickets] = useState(props.data.tickets);

    const handleSubmit = (e) => {
    
        axios
        .post('https://lottery-app-1918.herokuapp.com/tickets', props.data)
        .then((res) => {
            setTickets(res.data.tickets);
            //console.log(res.data.tickets[0]);
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="topic">
            <div className="generator">
                <Button
                    type="submit"
                    fullWidth
                    className= {classes.submit}
                    onClick= { handleSubmit }
                    variant="contained"
                    color="secondary"
                >
                    Generate a Raffle Ticket!
                </Button>
            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>{props.data.name}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>{props.data.email}</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>{props.data.mobile}</Paper>
                    </Grid>
                </Grid>
            </div>
            <hr />
        {   
            (tickets.length === 0) ? <h4>You have no tickets as of now</h4>
            : <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No.</TableCell>
                            <TableCell align="right">TIcket No.</TableCell>
                            <TableCell align="right">Date Generated</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tickets.map((ticket,index) => (
                        <TableRow key={ticket._id}>
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{ticket._id}</TableCell>
                            <TableCell align="right">{ticket.createdAt.slice(0,10)}</TableCell>
                            <TableCell align="right"><Link to={`/tickets/${ticket._id}`}><Button variant="contained">Participate</Button></Link></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
        </div>
    );
}