import "./App.css";
import LycheePage from "./components/LycheePage";
import NotFound from "./components/NotFound";
import JoyPage from "./components/JoyPage";

function App() {
  const { pathname } = window.location;

  switch (pathname) {
    case "/lychee":
      return <LycheePage />;
    case "/joy":
      return <JoyPage />;
    default:
      return <h1>404</h1>;
  }
}

export default App;
