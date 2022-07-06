import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ConfirmationNumberSharpIcon from '@material-ui/icons/ConfirmationNumberSharp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import TicketTable from "./TicketTable";
import { setUser, getUser } from '../lib/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Tickets() {
  const classes = useStyles();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [errorsE, setIsErrorE] = useState(false);
  const [mobile, setMobile] = useState();
  const [errorsM, setIsErrorM] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(getUser() || null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      name,
      email,
      mobile
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/signin`, user)
      .then((res) => {
        setUser(res.data[0]);
        setData(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {
        data ? <TicketTable data={data} />
        : <div className='intro'>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h4">
                Check Your Raffle Tickets
              </Typography>
              <Avatar className={classes.avatar}>
                <ConfirmationNumberSharpIcon />
              </Avatar>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  autoComplete="name"
                  autoFocus
                  onChange={e => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={errorsE}
                  type="email"
                  value={email}
                  autoComplete="email"
                  onBlur={(e) => {
                    if (typeof e.target.value !== "undefined") {
                      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                      if (!pattern.test(e.target.value)) {
                        setIsErrorE(true);
                      setIsSubmitting(true);
                      }
                      else{
                        setIsErrorE(false);
                        setIsSubmitting(false)
                        if(errorsE === false && errorsM === false)
                          setIsSubmitting(false)
                      }
                    }
                  }}
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="tel"
                  error={errorsM}
                  value={mobile}
                  name="contact"
                  label="Mobile Number"
                  id="number"
                  onBlur={ e => {
                    setMobile(e.target.value);
                    if (e.target.value.length > 10 || e.target.value.length < 10) {
                      setIsErrorM(true);
                      setIsSubmitting(true);
                    }
                    else{
                      setIsErrorM(false);
                      setIsSubmitting(false)
                      if(errorsE === false && errorsM === false)
                        setIsSubmitting(false)
                    }
                  }}
                  onChange={e => setMobile(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled = { isSubmitting }
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Find !
                </Button>
              </form>
            </div>
          </Container>
        </div>
      }
    </>
  );
}