import axios from 'axios';

export default {
  // Gets user info
  getUser: function () {
    return axios.get('/auth/user');
  },
  //  get user info to the database
  getAllUsers: function () {
    return axios.get('/auth/users');
  },
  deleteUser: function (id) {
    return axios.delete('/auth/user/' + id);
  },
  // Logs the user out
  logout: function () {
    return axios.post('/auth/logout');
  },
  // Log the user in
  login: function (username, password) {
    return axios.post('/auth/login', { username, password });
  },
  // New user registration
  signup: function (userData) {
    return axios.post('/auth/signup', userData);
  },
  //user update after first signup
  update: function (id, userData) {
    // console.log(userData);
    // console.log(id)
    return axios.put('/auth/signup/' + id, { userData });
  },
  userUpdate: function (id, data) {
    return axios.put('/auth/user/' + id, data);
  },
  getGoogle: function () {
    return axios.get('auth/google');
  },
};
