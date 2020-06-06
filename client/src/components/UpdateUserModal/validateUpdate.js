export default function validateRun(distance, pace) {
    if(distance === "" || pace === "")
        return 0;
    else if(!/^[0-9]+(\.[0-9]{1,2})?$/g.test(distance) || !/^[0-9]+(\:[0-9]{2,2})?$/g.test(pace))
        return 0;
    else 
        return 1;
}