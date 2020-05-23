import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Welcome from "./pages/Welcome/Welcome"
import RunningStats from './pages/RunningStats';
import UserPage from './pages/userPage/userPage';

import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

// import UserCard from "./components/UserCard/UserCard";
// import GeoMap from "./components/Map/Geolocation";
import Location from "./components/Location/Location";
import AUTH from './utils/AUTH';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        if (!response.data.user) {
          setLoggedIn(false);
          setUser(null);
        } else {
          setLoggedIn(true);
          setUser(response.data.user);
        }
      });
     return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			// console.log(response.data);
			if (response.status === 200) {
				setLoggedIn(false);
        setUser(null);
			}
		});
	};

	const login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setUser(response.data.user);
        setLoggedIn(true);
     
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
                <Welcome user={user}/>
              </Route>
              {/* <Route exact path="/firstdata" component={UserData} /> */}
              <Route exact path="/dashboard" component={RunningStats} />
              <Route exact path="/mypage/:id" component={UserPage} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <div className="auth-wrapper" style={{paddingTop:40}}>
          <Switch>
            <Route exact path="/" component={() => <LoginForm login={login}/>} />
            <Route exact path="/welcome" component={() => <LoginForm login={login}/>} />
            <Route exact path="/dashboard" component={() => <LoginForm login={login} />} />
            <Route exact path="/mypage/:id" component={() => <LoginForm login={login}/>} />
            <Route exact path="/signup" component={SignupForm} />
          </Switch>
        </div>
      )}

      {/* not used yet therefore commented out */}
      <Location /> 
       {/* <GeoMap />   */}
       
    </div>
  );
}

export default App;
