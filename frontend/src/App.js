import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/mynotes">
              <MyNotes />
            </Route>
            <Route></Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
