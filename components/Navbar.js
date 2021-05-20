import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import app from "../api/firebase";
import Cookies from "universal-cookie";
import Router from 'next/router'
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ onChange, value, onSubmit, hiddenSearch }) => {
  const classes = useStyles();
  const cookies = new Cookies();
  const handleLogout = () => {
    app.auth().signOut();
    cookies.remove("uid", [{ path: "/" }]);
    Router.reload();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#00D9C0" }}>
        <Container>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/">
              <h2 style={{ display: "block", cursor: "pointer" }}>
                Rent Movies
              </h2>
            </Link>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{ display: hiddenSearch && "none" }}
                className={classes.search}
              >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form onSubmit={onSubmit}>
                  <InputBase
                    value={value}
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    onChange={onChange}
                  />
                </form>
              </div>
              {!cookies.get("uid") ? (
                <>
                  <Link href="/login">
                    <Button
                      style={{
                        fontFamily: "inherit",
                        fontWeight: "bold",
                        color: "#fff",
                        marginLeft: "1rem",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      style={{
                        fontFamily: "inherit",
                        fontWeight: "bold",
                        color: "#fff",
                        marginLeft: "1rem",
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/cart">
                    <Button
                      style={{
                        fontFamily: "inherit",
                        fontWeight: "bold",
                        color: "#fff",
                        marginLeft: "1rem",
                      }}
                    >
                      Cart
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    style={{
                      fontFamily: "inherit",
                      fontWeight: "bold",
                      color: "#fff",
                      marginLeft: "1rem",
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
