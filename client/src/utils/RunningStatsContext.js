import React from "react";

const RunningStatsContext = React.createContext({
    _id: "",
    pace: "",
    distance: "",
    date: "",
    totalTime: "",
});

export default RunningStatsContext;