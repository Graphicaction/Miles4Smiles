export default function validateSignup(firstName,lastName,username,password, confirmPassword) {
  if (firstName === '' || lastName === '' || username === '' || password === '' || confirmPassword === '')
    return 0;
  else if(password !== confirmPassword || username.length < 5 || password.length < 5)
    return 0;
  else if (!/^[a-zA-Z0-9]*$/g.test(firstName) || !/^[a-zA-Z0-9]*$/g.test(lastName) ||
    !/^[a-zA-Z0-9]*$/g.test(username) || !/^[a-zA-Z0-9]*$/g.test(password))
    return 0;
  else 
    return 1;
}
