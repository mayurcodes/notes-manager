import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/Note/CreateNote";
import UpdateNote from "./screens/Note/UpdateNote";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <div className="App">
        <Header setSearch={setSearch} />
        <main>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/mynotes">
              <MyNotes search={search} />
            </Route>
            <Route path="/register">
              <RegisterScreen />
            </Route>
            <Route path="/login">
              <LoginScreen />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/createnote">
              <CreateNote />
            </Route>
            <Route path="/note/:id">
              <UpdateNote />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
