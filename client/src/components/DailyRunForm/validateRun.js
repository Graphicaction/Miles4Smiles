export default function validateRun(distance, date, time) {
    if(distance === "" || date === "" || time === "")
        return 0;
    else if(!/^[0-9]+(\.[0-9]{2,2})?$/g.test(distance) || !/^[0-9]+(\:[0-9]{2,2})?$/g.test(time))
        return 0;
    else 
        return 1;
}