import React from 'react';
//global custom user context with a setUser function whenever there is an update to user data
const UserContext = React.createContext({
  _id: '',
  username: '',
  city: '',
  state: '',
  averagePace: '',
  averageDistance: '',
  firstlogin: '',
  challengesWon: '',
  challengesTied: '',
  challegesLost: '',
  setUser: () => {},
});

export default UserContext;
