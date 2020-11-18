import "./App.css";
import GlobalContext from "./config/context";
import ContextTest from "./components/ContextTest";
const App = () => {
  return (
    <GlobalContext>
      <ContextTest />
    </GlobalContext>
  );
};

export default App;
