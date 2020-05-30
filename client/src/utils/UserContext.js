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
  // handleUpdates: () => {}
  // update: (user)=> {
  //   return {
  //     ...user,
  //     city: user.city,
  //     state: user.state,
  //     averagePace: user.averagePace,
  //     averageDistance: user.averageDistance

    // }
  // }
});

export default UserContext;