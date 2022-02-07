import { Box, Typography, Grid, Button } from "@mui/material";
import santaImage from "./pere-noel-etonne.svg";
import fireVideo from "./feu-cheminee.mp4";
import "./not-found.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: -1,
          objectFit: "cover"
        }}
      >
        <source src={fireVideo} type="video/mp4" />
      </video>

      <Grid
        container
        alignItems="center"
        align="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} lg={4}>
          <Typography
            className="text-error"
            variant="h1"
            style={{ fontSize: "10vw", fontWeight: "bold" }}
          >
            Erreur
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4}>
          <img id="santa-claus" src={santaImage} alt="Pere-noel-etonne" />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography
            variant="h1"
            style={{ fontSize: "10vw", fontWeight: "bold" }}
          >
            404
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to="/">
            <Button
              variant="contained"
              size="large"
              sx={{
                minWidth: "200px",
                fontSize: "calc(11px + 0.7vw)"
              }}
            >
              Retour au site
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFound;
