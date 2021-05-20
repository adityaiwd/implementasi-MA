import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import transaction from "../api/transaction";
import Typography from "@material-ui/core/Typography";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import {useToasts } from 'react-toast-notifications';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Poster({ id,image, title, price, onRent }) {
  const router = useRouter()
  const cookies = new Cookies();
  const { addToast } = useToasts();
  const classes = useStyles();
  const rentMovie = async () => {
    if(cookies.get("uid")){
      await transaction.post("/cart", {
        id_user: cookies.get("uid"),
        id_film: id,
        price: price,
        poster: image,
        title: title,
      }).then( res => addToast('Movie Inserted to Cart', { appearance: 'success' }))
    }else{
      router.push("/login");
    }
  };
  return (
    <Card className={classes.root}>
      <img
        style={{
          height: "30rem",
          width: "100%",
          objectPosition: "center center",
        }}
        src={image}
        alt={title}
      />
      <CardContent>
        <h4>{title.length > 25 ? title.substring(0, 24) + "..." : title}</h4>
        <p style={{ fontSize: "1rem" }}>Rp {price}</p>
      </CardContent>
      <CardActions>
        <Button onClick={rentMovie} style={{ color: "#00D9C0" , fontWeight: "bold", fontFamily: "inherit" }}>
          Rent
        </Button>
      </CardActions>
    </Card>
  );
}
