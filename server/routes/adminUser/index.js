const express = require("express");
const router = express.Router();
const AdminUser = require("../../schema/AdminUser");
var jwt = require("jsonwebtoken");
const secret = "some secret";

router.use(express.json());
function generate_token(data) {
  return jwt.sign(data, secret);
}
router.post("/sign-up", (req, res) => {
  const user = new AdminUser(req.body);
  user
    .save()
    .then((data) => {
      res.status(201).json({ token: generate_token({ id: data._id }) });
    })
    .catch((error) => {
      res.send(`Error occurred while saving data:>${error}`);
    });
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await AdminUser.findOne({ email: email, password: password });
    if (data) {
      return res.status(200).json({ token: generate_token({ id: data._id }) });
    }
    return res.status(401).send("Failed sign-in");
  } catch (error) {
    res.send(`Error occurred while sign-in:${error}`);
  }
});

module.exports = router;
