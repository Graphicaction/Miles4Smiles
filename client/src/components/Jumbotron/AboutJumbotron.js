import React from 'react';
import './AboutJumbotron.scss';

//Jumbotron used in About Page
const AboutJumbotron = ({ children }) => (
  <div className="jumbotron jumbotron-fluid about-jumbotron">
    <div className="about-container">
      <h1 className="about-title">How it works</h1>
      <h2 className="about-title">&#9207;</h2>
    </div>
  </div>
);

export default AboutJumbotron;
