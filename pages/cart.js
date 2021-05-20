import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Head from "next/head";
import Cookies from 'universal-cookie';
import Navbar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import transaction from "../api/transaction";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useRouter } from 'next/router'

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()
  const cookies = new Cookies();
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      const res = await transaction.get(`/cart/${cookies.get("uid")}`);
      res.status === 200 && setCartData(res.data);
      setIsLoading(false);
    };
    fetchCart();
  }, []);
  if(!cookies.get("uid")){
    return router.push("/");
  }
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
                    <TableCell
                      style={{ fontWeight: "bold", fontFamily: "inherit" }}
                    >
                      Poster
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontFamily: "inherit" }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontFamily: "inherit" }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", fontFamily: "inherit" }}
                      align="center"
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell >
                        <img
                          src={row.poster}
                          style={{ width: "10rem" }}
                          alt=""
                        />
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", fontFamily: "inherit" }}>{row.title}</TableCell>
                      <TableCell style={{ fontWeight: "bold", fontFamily: "inherit" }} >Rp {row.price}</TableCell>
                      <TableCell align="center"><DeleteForeverOutlinedIcon fontSize="large" style={{color:"#F8333C"}} /></TableCell>
                    </TableRow>
                  ))}
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
