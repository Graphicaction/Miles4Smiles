import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

const CustomAlertTemplate = ({ style, options, message, close }) => (
  <div
    style={{
      color: 'black',
      borderRadius: '18px',
      padding: '12px',
      fontSize: '1.15rem',
      fontFamily: 'Raleway, sans-serif',
    }}
    id="reactAlert"
  >
    {options.type === 'info' && info}
    {options.type === 'success' && success}
    {options.type === 'error' && alert}
    {message}
  </div>
);

const info = <i className="fa fa-info" aria-hidden="true"></i>;
const alert = <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>;
const success = <i className="fa fa-check" aria-hidden="true"></i>;

const options = {
  position: positions.TOP_CENTER,
  timeout: 4000,
  transition: transitions.FADE,
};

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider template={CustomAlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
