import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';
import { getUser, setUsersData } from '../lib/user';

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
    const history = useHistory();
    
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();
    const user = getUser();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setEvents(events);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`);
                setEvents(response.data);
            } catch (e) {
                console.log(e);
                setEvents(events);
            }
        };
        fetchEvents();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();

        const eventId = e.currentTarget.id;

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/participate`, {
            params: {
                ticketid: ticketID,
                id: eventId
            }
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data === "Can participate")
                setSuccess("You have been added to the Draw.")
            setErrors(null);
            const tickets = user.tickets;
            const availableTickets = tickets.filter(ticket => ticket._id !== ticketID);
            const events = user.event;
            events.push(eventId);
            setUsersData({availableTickets, events});
            setTimeout(() => history.push('/tickets'), 1000);
        }).catch(err => {
            setErrors("Some error happened!");
            setSuccess(null);
        });
    }

    const alreadyParticipated = (id) => {
        let participated = false;
        user.event.forEach(event => {
            if (event == id) {
                participated = true;
            }
        });

        return participated;
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
                    {events.map((event, index) => (
                        <TableRow key={event._id}>
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{event.date}</TableCell>
                            <TableCell align="right">{event.reward}</TableCell>
                            <TableCell align="right">
                                <Button
                                    // type="submit"
                                    id={event._id}
                                    name={event._id}
                                    variant="contained"
                                    disabled={alreadyParticipated(event._id)}
                                    onClick={handleClick}
                                    value={event._id}
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