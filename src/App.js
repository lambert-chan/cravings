import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import cravingsIcon from './img/rest-icon-reverse.png'

import LoginPage from './pages/loginpage'
import HomePage from './pages/home'
import PersonalPage from './pages/personal'
import AdminPage from './pages/admin'
import ExplorePage from './pages/explore'
import Swagger from './pages/swagger'
import { Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute'

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [sessionToken, setSessionToken] = useState("123")

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await hasToken()
    } catch (e) {
      console.error(e);
    }
  }

  const hasToken = () => {
    let isAuthenticated = sessionStorage.getItem("isAuthenticated")
    let storageToken = sessionStorage.getItem("sessionToken")
    if (isAuthenticated && storageToken === sessionToken) {
      userHasAuthenticated(true)
    } else {
      userHasAuthenticated(false)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileMenu = () => {
    return (
      <>
        <Button aria-controls="mobile-menu" aria-haspopup="true" onClick={handleClick} style={{color:"white"}}>
          <MenuIcon />
        </Button>
        <Menu
          id="mobile-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Link to="/explore">Explore</Link>
          </MenuItem>
          {
            isAuthenticated ?
              <>
                <MenuItem>
                  <Link to="/personal">Personal</Link>
                </MenuItem>

                <MenuItem>
                  <Link to="/api/v1">Api</Link>
                </MenuItem>

                <MenuItem>
                  <Link to="/admin">Admin</Link>
                </MenuItem>

                <MenuItem>
                  <Link to="/">Logout</Link>
                </MenuItem>
              </>
              :
              <MenuItem>
                <Link to="/login">Login</Link>
              </MenuItem>
          }

        </Menu>
      </>
    )
  }

  const menu = () => {
    return (
      <ul>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        {
          isAuthenticated ?
            <>
              <li>
                <Link to="/personal">Personal</Link>
              </li>
              <li>
                <Link to="/api/v1">API</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>Logout</Link>
              </li>
            </> :
            <li>
              <Link to="/login">Login</Link>
            </li>
        }

      </ul>
    )
  }

  let login = () => {
    userHasAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true")
    sessionStorage.setItem("sessionToken", "123")
  }

  let logout = () => {
    userHasAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated")
    sessionStorage.removeItem("sessionToken")
  }

  return (
    <Router>
      <div>
        <div className="header">
          <Link to="/" id="home-button">
            <img src={cravingsIcon} alt="cravings-icon"></img>
            <h1>Cravings</h1>
          </Link>
          <div id="cravings-mobile-menu">{mobileMenu()}</div>
          <div id="cravings-menu">{menu()}</div>
        </div>

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <UnauthenticatedRoute
            path="/login"
            component={LoginPage}
            appProps={{ isAuthenticated, callBack: login }}
          />
          <AuthenticatedRoute
            path="/api/v1"
            component={Swagger}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/personal"
            component={PersonalPage}
            appProps={{ isAuthenticated }}
          />
          <AuthenticatedRoute
            path="/admin"
            component={AdminPage}
            appProps={{ isAuthenticated }}
          />
          <Route path="/explore">
            <ExplorePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App