export default function validateSignup(firstName, lastName, username, password) {
    if(firstName === "" || lastName === "" || username === "" || password === "")
        return 0;
    else if(!/^[a-zA-Z0-9]*$/g.test(firstName) || !/^[a-zA-Z0-9]*$/g.test(lastName) || !/^[a-zA-Z0-9]*$/g.test(username) || !/^[a-zA-Z0-9]*$/g.test(password))
        return 0;
    else 
        return 1;
} 
