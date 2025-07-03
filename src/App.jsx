import { CardProvider } from "./context/CardContext";
import ListCards from "./components/ListCards/ListCards";
import Filter from "./components/Filter/Filter";
import "./assets/styles/reset.scss"

function App() {
  return (
    <CardProvider>
      <Filter />
      <ListCards />
    </CardProvider>
  );
}

export default App;
