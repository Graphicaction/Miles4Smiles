import React from "react";

const ChallengeContext = React.createContext({
    _id: "",
    businessName: "",
    businessType: "",
    businessLocation: "",
    businessUrl: "",
    donor: "",
    donatedAmount: "",
    challengers: []
});

export default UserContext;