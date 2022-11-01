const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "400: Not logged in" });

  try {
    const validToken = verify(accessToken, "importantsecret");

    req.user = validToken;                                              //PARA MAKUHA KO ULIT YUNG DATA OR MAACCESS KO SA OTHER PAGES

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

//FORGOT PASS
const forgotToken = (req, res, next) => {
  const forgotToken = req.header("forgotToken");

  if (!forgotToken) return res.json({ error: "400: Not Verified." });

  try {
    const verifiedToken = verify(forgotToken, "importantsecret");

    req.user = verifiedToken;                                           //PARA MAKUHA KO ULIT YUNG DATA OR MAACCESS KO SA OTHER PAGES

    // res.send("Verified");
    if (verifiedToken) {
      return next();
    }

  } catch (error) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken, forgotToken};