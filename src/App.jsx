import { CardProvider } from "./context/CardContext";
import { CustomThemeProvider } from "./context/ThemeContext";
import MainPage from "./pages/Main/Main";
import "./assets/styles/reset.scss";

function App() {
  return (
    <CardProvider>
      <CustomThemeProvider>
        <MainPage />
      </CustomThemeProvider>
    </CardProvider>
  );
}

export default App;
