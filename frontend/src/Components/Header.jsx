import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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
                            <IconButton href="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={process.env.PUBLIC_URL + '/alogo.jpg'} style={{width:"3rem"}} />
                            </IconButton>
                            <Typography variant="h5" className={classes.title}>
                                <Link color="inherit" href="/" style={{textDecoration:'none'}}>Lottery App</Link>
                            </Typography>
                            <Button href="/winners" color="inherit">Previous Winners</Button>
                            <Button href="/tickets" color="inherit">Your Tickets</Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Grid>
        </div>
    );
}
