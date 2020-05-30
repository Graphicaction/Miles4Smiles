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
  const [firstLogin, setFirstLogin] = useState(false);
  let history = useHistory();

  
  // useEffect(() => {
  //   console.log("getuser of App.js");
  //   AUTH.getUser().then(response => {
  //       console.log("App getuser ",response.data);
  //       if (!response.data.user) {
  //         setLoggedIn(false);
  //         setUser(null);
  //       } else {
  //         setLoggedIn(true);
  //         setUser(response.data.user);
  //       }
  //     });
  //    return () => {
  //       setLoggedIn(false);
  //       setUser(null);
  //     };
  // }, []);

  // useEffect(() => {
  //   console.log("getAllusers of App.js");
  //   AUTH.getAllUsers().then(response => {
  //       console.log("App getAllUsers ",response.data);
  //       if (!response.data.users) {
  //         setUsers(null);
  //       } else {
  //         setUsers(response.data.users);
  //       };
  //     });
  //     return () => {
  //       setUsers(null);
  //     };
  //   }, []);


	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
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
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        console.log(response.data.user);
        setUser(response.data.user);
        setLoggedIn(true);

        console.log("getAllusers of App.js");
        AUTH.getAllUsers().then(response => {
          console.log("App getAllUsers ", response.data);
          if (!response.data.users) {
            setUsers(null);
          } else {
            console.log(response.data.users);
            setUsers(response.data.users);
          };
        });
        return () => {
          setUsers(null);
        };
      }
    });
  };
  

  return (
    <div className="App">
       { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch>
              <Route exact path="/welcome" >
                <UserContext.Provider value={{user, users}}>
                  <Welcome />
                </UserContext.Provider>
              </Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/mypage/:id">
                <UserContext.Provider value={{user, users}}>
                  <MyPage />
                </UserContext.Provider>
                </Route>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <>
      <Nav login={login}/>
        <div className="auth-wrapper">
          <Switch>
            <Route exact path="/" component={() => <LoginForm login={login}/>} />
            <Route exact path="/welcome" component={() => <LoginForm login={login}/>} />
            <Route exact path="/about" component={About} />
            <Route exact path="/dashboard" component={() => <LoginForm login={login} />} />
            <Route exact path="/mypage/:id" component={() => <LoginForm login={login}/>} />
            <>
            <AlertProvider template={AlertTemplate} {...options}>
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
