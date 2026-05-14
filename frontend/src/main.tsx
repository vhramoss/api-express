import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./contexts/authContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { StyledEngineProvider } from "@mui/material/styles"
import GlobalStyles from "@mui/material/GlobalStyles"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);