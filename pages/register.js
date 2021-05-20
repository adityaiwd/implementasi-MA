import { useCallback } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Cookies from 'universal-cookie';
import app from "../api/firebase";
import {useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: "inherit",
    fontWeight: "bold",
    backgroundColor: "#00D9C0",
  },
}));

export default function Register({history}) {
  const cookies = new Cookies();
  const { addToast } = useToasts();
  const router = useRouter()
  const classes = useStyles();
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const {email, password} = event.target.elements;
    try{
        await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
        cookies.set('uid', app.auth().currentUser.uid, { path: '/' });
        addToast('Successfully created your account', { appearance: 'success' })
        router.push("/");
    }catch(err){
        alert(err);
        addToast('Something went wrong', { appearance: 'error' })

    }
},[history]);
if(cookies.get("uid")){
    router.push("/");
  }
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <Container
        style={{
          height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        component="main"
        maxWidth="xs"
      >
        <Typography
          style={{ fontFamily: "inherit", fontWeight: "bold" }}
          component="h1"
          variant="h5"
        >
         Register
        </Typography>
        <form onSubmit={handleSignUp} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Account
          </Button>
        </form>
        <Link href="/login">
          <Button style={{marginTop:"1rem",fontFamily:"inherit"}}>Already have an account? Sign In</Button>
        </Link>
      </Container>
    </div>
  );
}
