import "./App.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../app/state/slices/categoriesSlice";

import {
  Container,
  TextField,
  Typography,
  Button,
  FormGroup
} from "@mui/material";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Container
      sx={{
        padding: "0 10px",
        minWidth: "100vw",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography variant="h1" /* sx={{ textAlign: "center" }} */>
        SE CONNECTER!
      </Typography>
      <FormGroup sx={{ width: "500px" }}>
        <TextField
          color="info"
          label="Identifiant"
          variant="standard"
          sx={{ margin: "0 110px 0 110px" }}
        />
        <TextField
          color="info"
          label="Mot de passe"
          variant="standard"
          sx={{ margin: "10px 110px 0 110px" }}
        />
        <Button
          color="info"
          variant="contained"
          sx={{ margin: "30px 150px 0 150px" }}
        >
          Go!
        </Button>
      </FormGroup>
      <Link to="/admin/products">
        <Button color="secondary" sx={{ marginTop: "30px" }}>
          Test the backoffice without logging in
        </Button>
      </Link>
    </Container>
  );
}

export default App;
