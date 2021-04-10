import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Account from "./components/Account/Account";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Order from "./components/Order/Order";
import Register from "./components/Register/Register";
import Services from "./components/Services/Services";
import CenteredGrid from "./components/Grid/Grid";
import Verification from "./components/Verification/Verification";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/account">
            <Account />
            <CenteredGrid />
          </Route>

          <Route path="/services">
            <Services />
          </Route>

          <Route path="/order">
            <Order />
          </Route>

          <Route path="/verification">
            <Verification />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
//Attention!
