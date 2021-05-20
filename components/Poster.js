import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Poster({ image, title, price }) {
  const classes = useStyles();

  return (
    <Card  className={classes.root}>
        <img style={{ height: "30rem",width:"100%",objectPosition:"center center"}} src={image} alt={title} />
        <CardContent>
          <h4>{title}</h4>
          <p style={{fontSize:"1rem"}}>Rp {price}</p>
        </CardContent>
      <CardActions>
        <Button size="small" style={{ color: "#00D9C0" }}>
          Rent
        </Button>
      </CardActions>
    </Card>
  );
}
