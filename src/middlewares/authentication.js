const jwt = require('jsonwebtoken');


//먼데이에서 호출이 들어오면 JWT 생성 되는 듯 하다.
async function authenticationMiddleware(req, res, next) {
  try {
    let { authorization } = req.headers;
    console.log("-------------  this is authorization  -------------")
    console.log(authorization)
    console.log("-------------  this is authorization  -------------")

    if (!authorization && req.query) {


      authorization = req.query.token;
    }
    console.log(process.env.MONDAY_SIGNING_SECRET);
    const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
      authorization,
      process.env.MONDAY_SIGNING_SECRET
    );
    console.log("++++++++++++++++++++++++++++++");
    console.log("----------Middleware----------");
    console.log("++++++++++++++++++++++++++++++");

    req.session = { accountId, userId, backToUrl, shortLivedToken };

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'not authenticated' });
  }
}

module.exports = {
  authenticationMiddleware,
};
