

if (process.env.NODE_ENV==="production"){
  module.exports = require("./prod")
} else {
  module.exports = require("./dev")
}

// module.exports ={
//     googleClientID: "668734697594-089art6ir5lju3leprfm0ip8kt06tmvr.apps.googleusercontent.com",
//     googleClientSecret: "3kaLwafWaHzGeO4G9-T-iDTr",
//     COOKIE_KEY: 'bliblablup'
//   };