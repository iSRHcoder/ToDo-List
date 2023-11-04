import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home";
import AppHeader from "./Components/AppHeader/AppHeader";
import AppFooter from "./Components/AppFooter/AppFooter";

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader />
      </header>
      <main className="bg-img">
        <Home />
      </main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  );
}

export default App;
