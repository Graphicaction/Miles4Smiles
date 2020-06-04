export default function validateRun(distance, pace) {
    if(distance === "" || pace === "" || isNaN(distance) || isNaN(pace))
        return 0;
    else 
        return 1;
}