import React from 'react';

const ChallengeContext = React.createContext({
  _id: '',
  businessName: '',
  businessType: '',
  businessLocation: '',
  businessUrl: '',
  donor: '',
  time: '',
  donatedAmount: '',
  status: '',
  challengers: [],
});

export default ChallengeContext;
