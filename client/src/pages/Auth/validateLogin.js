//Checking if empty or not
export default function validateLogin(username, password) {
  if (username === '' || password === '') return 0;
  else return 1;
}
