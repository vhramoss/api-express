import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#64748b",
    },
    background: {
      default: "#f1f5f9",
    },
  },
  typography: {
    fontFamily: [
        "Inter",
        "Roboto",
        '"Helvetica"',
        "Arial",
        "sans-serif"
    ].join(","),
  },
});

export default theme;