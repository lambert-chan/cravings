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
import AdminPage from './pages/adminpage'
import ExplorePage from './pages/explore'

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
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/personal">
            <PersonalPage />
          </Route>
          <Route path="/explore">
            <ExplorePage />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App