import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color:"black"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 20,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: "lightBlue",
    },
}));

export default function OutlinedCard() {
    const classes = useStyles();

    const [data, setData] = React.useState({events: [], isFetching: false});

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                setData({events: data.events, isFetching: true});
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`);
                setData({events: response.data, isFetching: false});
            } catch (e) {
                console.log(e);
                setData({events: data.events, isFetching: false});
            }
        };
        fetchEvents();
    }, []);

    React.useEffect(() => {
        const fetchWinners = async () => {
            try {
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/winners`);
            } catch (e) {
                console.log(e);
            }
        };
        fetchWinners();
    }, []);

    return (
        <div className="intro float">
        <div className={classes.root}>
            <h1><b>Lottery Events</b></h1>
            <br />
            <br />
            {
                (data.events.length === 0) ? <span>Loading...</span>
                : <Grid container justify="center" spacing={5} alignItems="center">
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {data.events[1].reward}
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" component="p">
                                        {data.events[1].date}
                                        <br />
                                        {data.events[1].time}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography className={classes.title} variant="h6" color="textPrimary" gutterBottom>
                                        Next Event :
                                    </Typography>
                                    <hr></hr>
                                    <Typography variant="h5" component="h2">
                                        <b>{data.events[0].reward}</b> 
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" component="p">
                                        {data.events[0].date}
                                        <br />
                                        {data.events[0].time}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {data.events[2].reward}
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" component="p">
                                        {data.events[2].date}
                                        <br />
                                        {data.events[2].time}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            }
        </div>
        </div>
    );
}