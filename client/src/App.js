import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Welcome from "./pages/Welcome/Welcome"
import Dashboard from './pages/Dashboard';
import MyPage from './pages/MyPage/MyPage';
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import AUTH from './utils/AUTH';
import UserContext from "./utils/UserContext";
import About from "./pages/About/About"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
 const [redirectTo, setRedirectTo] = useState(null);

  let history = useHistory();

  const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// check for logout status and redirect
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
        setRedirectTo('/');
        history.push('/')
			}
		});
  };
  
  const options = {
    position: positions.TOP_CENTER,
    timeout: 2500,
    offset: '30px',
    transition: transitions.SCALE
  }

  const login = (username, password) => {
    
    AUTH.login(username, password).then(response => {
      if (response.status === 200) {
        // update the state
        setUser(response.data.user);
        setLoggedIn(true);
        //getting all users
        AUTH.getAllUsers().then(response => {
          if (!response.data.users) {
            setUsers(null);
          } else {
            setUsers(response.data.users);
          };
        });
       // return () => {
        //   setUsers(null);
        // };
      } 
      // else {
      //   setUser(null);
      //   setLoggedIn(false);
      // }
    })
    .catch(err => {
      console.log("Invalid user!");
    });
  };
  

  return (
    <div className="App">
       { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch>
              <>
            ` <AlertProvider template={AlertTemplate} {...options}>
                <Route exact path="/welcome" >
                  <UserContext.Provider value={{user, users, setUser}}>
                    <Welcome />
                  </UserContext.Provider>
                </Route>
                <Route exact path="/about" component={About} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/mypage/:id">
                  <UserContext.Provider value={{user, users, setUser}}>
                    <MyPage />
                  </UserContext.Provider>
                  </Route>
              </AlertProvider>
              </>
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <>
        <Nav login={login}/>
        <div className="auth-wrapper">
          <Switch>
            <>
            <AlertProvider template={AlertTemplate} {...options}>
              <Route exact path="/" component={() => <LoginForm login={login} user={user} />} />
              <Route exact path="/welcome" component={() => <LoginForm login={login}/>} />
              <Route exact path="/about" component={About} />
              <Route exact path="/dashboard" component={() => <LoginForm login={login} />} />
              <Route exact path="/mypage/:id" component={() => <LoginForm login={login}/>} />
              <Route exact path="/signup" component={SignupForm} />
            </AlertProvider>
            </>
          </Switch>
        </div>
        </>
      )}

      {/* not used yet therefore commented out */}
      {/* <Location />  */}
       {/* <GeoMap />   */}
       
    </div>
  );
}

export default App;
