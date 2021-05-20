import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Head>
        <title>Cart</title>
      </Head>
      <Navbar hiddenSearch />
      <Container style={{ paddingBottom: "15rem" }}>
        {!isLoading ? (
          <>
            <h1 style={{ fontWeight: "300", marginTop: "2rem" }}>
              Your <strong>Cart</strong>
            </h1>
            <TableContainer component={Paper}>
              <Table style={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight:"bold",fontFamily:"inherit"}}>Poster</TableCell>
                    <TableCell style={{fontWeight:"bold",fontFamily:"inherit"}}>Title</TableCell>
                    <TableCell style={{fontWeight:"bold",fontFamily:"inherit"}}>Price</TableCell>
                    <TableCell style={{fontWeight:"bold",fontFamily:"inherit"}} align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "90vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ color: "#00D9C0" }} />
          </div>
        )}
      </Container>
    </div>
  );
}
