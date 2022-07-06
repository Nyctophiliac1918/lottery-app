import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

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


const Winner = () => {
    const classes = useStyles();

    const [winners, setWinners] = React.useState([])

    React.useEffect(() => {
        const fetchWinners = async () => {
            try {
                setWinners(winners);
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/winners/list`)
                setWinners(response.data);
            } catch (e) {
                console.log(e);
                setWinners(winners);
            }
        };
        fetchWinners();
    }, []);

    return (
        <div className="intro">
            <h2>Winners</h2>
            <hr />
                {(winners.length === 0) ? <h4>There are no winners as of now</h4>
                : <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sr. No.</TableCell>
                                <TableCell align="right">Date for Draw</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Mobile Number</TableCell>
                                <TableCell align="right">Reward</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {winners.map((ticket,index) => (
                            <TableRow key={ticket._id}>
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell align="right">{ticket.event[0].date}</TableCell>
                                <TableCell align="right">{ticket.user[0].name}</TableCell>
                                <TableCell align="right">{ticket.user[0].mobile}</TableCell>
                                <TableCell align="right">{ticket.event[0].reward}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}

export default Winner;