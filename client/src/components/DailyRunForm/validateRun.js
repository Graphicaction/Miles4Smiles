export default function validateRun(distance, date, time) {
    if(distance === "" || date === "" || time === "")
        return 0;
    else if(!/^[0-9]*$/g.test(time))
        return 0;
    else 
        return 1;
}