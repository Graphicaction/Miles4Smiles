import React from "react";

const UserContext = React.createContext({
  _id: "",
  username: "",
  city: "",
  state: "",
  averagePace: "",
  averageDistance:""
});

export default UserContext;