const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app){
  if (process.env.NODE_ENV !== 'production'){
    app.use(
    ["/api","/auth", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:3001"
    })
  )} else{
    app.use(
      ["/api","/auth", "/auth/google"],
      createProxyMiddleware({
        target: "https://miles4smiles.herokuapp.com/"
      })
    )
  }
}