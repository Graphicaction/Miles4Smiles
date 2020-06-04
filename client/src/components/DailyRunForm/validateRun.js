export default function validateRun(distance, date, time) {
    if(distance === "" || date === "" || time === "" || isNaN(time))
        return 0;
    else 
        return 1;
}