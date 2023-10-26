import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/Home";
import AppHeader from "./Pages/AppHeader/AppHeader";
import AppFooter from "./Pages/AppFooter/AppFooter";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="bg-img">
        <Home />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
