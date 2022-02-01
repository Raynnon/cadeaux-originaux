import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeToken } from "../../app/state/slices/loginSlice";

import {
  Container,
  TextField,
  Typography,
  Button,
  FormGroup,
  Link
} from "@mui/material";
import { userLogin } from "../../routes/userLogin";
import cookieManager from "../../routes/cookieManager";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

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
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            textDecoration: "none"
          }}
        >
          <Button
            color="info"
            variant="contained"
            onClick={async () => {
              await userLogin(username, password);
              setUsername("");
              setPassword("");
              navigate("/products");
              dispatch(changeToken(cookieManager()));
            }}
          >
            Go!
          </Button>
        </Link>
      </FormGroup>

      <Button
        color="secondary"
        sx={{ marginTop: "30px" }}
        onClick={() => {
          navigate("/products");
          dispatch(changeToken("anonymous"));
        }}
      >
        Test the backoffice without logging in
      </Button>
    </Container>
  );
}
