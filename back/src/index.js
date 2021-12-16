import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { store } from "./app/store";
import { Provider } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import MIUITheme from "./styles/MIUITheme";
import { ThemeProvider } from "@mui/material/styles";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={MIUITheme()}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
