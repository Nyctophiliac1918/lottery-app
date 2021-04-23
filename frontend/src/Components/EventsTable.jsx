import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ClickAwayListener } from '@material-ui/core';

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

const EventsTable = (props) => {
    const classes = useStyles();
    let { ticketID } = props.match.params;
    
    const [events, setEvents] = React.useState([]);
    const [submitted, setSubmitted] = React.useState(false);
    const [errors, setErrors] = React.useState();
    const [success, setSuccess] = React.useState();

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                setEvents(events);
                const response = await axios.get("http://localhost:8080/events")
                setEvents(response.data);
                //console.log(data.events);
            } catch (e) {
                console.log(e);
                setEvents(events);
            }
        };
        fetchEvents();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.id);
        setSubmitted(true);

        axios.get('http://localhost:8080/events/participate', {
            params: {
                ticketid: ticketID,
                id: e.currentTarget.id
            }
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data === "Can participate")
                setSuccess("You have been added to the Draw.")
            setErrors(null);
        }).catch(err => {
            setErrors("You have already participated in this event");
            setSuccess(null);
            setSubmitted(false);
        });
    }

    return (
        <div className="intro">
            <h2>Events to participate:</h2>
            <hr />
            {(events.length === 0) ? <h4>There are no events as of now</h4>
            : <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr. No.</TableCell>
                            <TableCell align="right">Date for Draw</TableCell>
                            <TableCell align="right">Reward</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {events.map((ticket,index) => (
                        <TableRow key={ticket._id}>
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{ticket.date}</TableCell>
                            <TableCell align="right">{ticket.reward}</TableCell>
                            <TableCell align="right">
                                <Button
                                    // type="submit"
                                    id = {ticket._id}
                                    name = {ticket._id}
                                    variant= "contained"
                                    disabled= {submitted}
                                    onClick = {handleClick}
                                    value = {ticket._id}
                                >Enter</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
        {
            success && <h6 className="error" style={{"color":"green"}}>{success}</h6>
        }
        {
            errors && <h6 className="error" style={{"color":"red"}}>{errors}</h6>
        }
        </div>
    );
};

export default EventsTable;