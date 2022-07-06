import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin:"0 7%"
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AppBar style={{background:'rgb(31, 30, 30)'}} position="static">
                        <Toolbar>
                            <Link to="/" className='link'>
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <img src={process.env.PUBLIC_URL + '/alogo.jpg'} style={{width:"3rem"}} alt="logo"/>
                                </IconButton>
                            </Link>
                            <Typography variant="h5" className={classes.title}>
                                <Link to="/" className='link'>Lottery App</Link>
                            </Typography>
                            <Link to="/winners" className='link'>
                                <Button color="inherit">Previous Winners</Button>
                            </Link>
                            <Link to="/tickets" className='link'>
                                <Button color="inherit">Your Tickets</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </div>
    );
}
