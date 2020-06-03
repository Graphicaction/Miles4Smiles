export default function validateLogin(firstName, lastName, username, password) {
    if(username === "" || password === "")
        return 0;
    else 
        return 1;
} 