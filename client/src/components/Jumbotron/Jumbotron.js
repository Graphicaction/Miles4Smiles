import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 300, clear: "both", paddingTop: 40, textAlign: "center", backgroundColor: "#bcd67a", borderBottom: "black 2px solid" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
