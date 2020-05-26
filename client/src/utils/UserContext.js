import React from "react";

const UserContext = React.createContext({
  _id: "",
  username: "",
  city: "",
  state: "",
  averagePace: "",
  averageDistance:"",
  firstlogin: "",
  challengesWon: "",
  challengesTied: "",
  challegesLost: ""
});

export default UserContext;