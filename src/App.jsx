import { useState } from "react";
import { ThemeProvider, CssBaseline, FormControlLabel } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import { CardProvider } from "./context/CardContext";
import "./assets/styles/reset.scss";
import MainPage from "./pages/Main/Main";
import CustomSwitch from "./components/Switch/Switch";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <CardProvider>
        <div>
          <FormControlLabel
            control={
              <CustomSwitch
                checked={isDarkMode}
                onChange={handleThemeToggle}
                sx={{ m: 1 }}
              />
            }
            label="Dark mode"
            labelPlacement="start"
          />
          <MainPage />
        </div>
      </CardProvider>
    </ThemeProvider>
  );
}

export default App;
