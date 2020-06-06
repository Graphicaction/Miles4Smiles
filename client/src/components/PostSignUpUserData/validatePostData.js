export default function validatePostData(city, state, avgDistance, avgPace) {
    if(city === "" || state === "" || avgDistance === "" || avgPace === "")
        return 0;
    else if(!/^[0-9]+(\.[0-9]{1,2})?$/g.test(avgDistance) || !/^[0-9]+(\:[0-9]{2,2})?$/g.test(avgPace))
        return 0;
    else 
        return 1;
}