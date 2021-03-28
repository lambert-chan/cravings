import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home'
import LoginPage from './pages/loginpage'
import HomePage from './pages/home'
import PersonalPage from './pages/personal'

function App() {
  return (
    <Router>
      <div>
        <div className="header">
          <Link to="/" id="home-button">
            <HomeIcon fontSize="large" />
            <h1>Cravings</h1>
          </Link>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/personal">Personal</Link>
            </li>
          </ul>
        </div>


        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/personal">
            <CreatePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <HomePage />
  );
}

function Login() {
  return (
    <LoginPage />
  );
}

function CreatePage() {
  return (
    <PersonalPage/>
  );
}

export default App