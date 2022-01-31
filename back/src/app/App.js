import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../app/state/slices/categoriesSlice";
import { changeToken } from "../app/state/slices/loginSlice";

import {
  Container,
  TextField,
  Typography,
  Button,
  FormGroup,
  Link
} from "@mui/material";
import { userLogin } from "../components/apiCalls/userLogin";
import cookieManager from "../components/apiCalls/cookieManager";
import Admin from "../components/Admin";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());

    const cookie = cookieManager();
    dispatch(changeToken(cookie));
  }, [dispatch]);

  return (
    <>
      {!token ? (
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
          <Typography variant="h1">SE CONNECTER!</Typography>
          <FormGroup sx={{ width: "500px" }}>
            <TextField
              color="info"
              label="Identifiant"
              variant="standard"
              value={username}
              sx={{ margin: "0 110px 0 110px" }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              color="info"
              label="Mot de passe"
              type="password"
              variant="standard"
              value={password}
              sx={{ margin: "10px 110px 0 110px" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to={"/products"}
              onClick={() => {
                userLogin(username, password);
                const cookie = changeToken();
                dispatch(changeToken(cookie));
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
                textDecoration: "none"
              }}
            >
              <Button color="info" variant="contained">
                Go!
              </Button>
            </Link>
          </FormGroup>

          <Link to={"/products"}>
            <Button
              color="secondary"
              sx={{ marginTop: "30px" }}
              onClick={() => {
                cookieManager("anonymous");
                dispatch(changeToken("anonymous"));
              }}
            >
              Test the backoffice without logging in
            </Button>
          </Link>
        </Container>
      ) : (
        <Admin />
      )}
    </>
  );
}

export default App;
