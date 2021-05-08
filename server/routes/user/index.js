const express = require("express");
const router = express.Router();
const User = require("../../schema/User");

router.use(express.json());
router.get("/", (req, res) => {
  res.send("This is user route");
});
const getUserDataById = async (id) => {
  const data = await User.find({ adminUserId: id });
  return data;
};
router.post("/add", async (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send("Successfuly save to the database");
    })
    .catch((error) => {
      res.send("error occured in saving data to the database:" + error);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.find({ adminUserId: req.params.id });
    if (users) {
      return res.status(200).json(users);
    }
    return res.status(404).send("No data found");
  } catch (error) {
    res.status(502).send("Encountered server error:" + error);
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const users = await User.find({ _id: req.params.id });
    if (users) {
      return res.status(200).json(users);
    }
    return res.status(404).send("No data found");
  } catch (error) {
    res.status(502).send("Encountered server error:" + error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );
    if (user) {
      const data = await getUserDataById(user.adminUserId);
      if (data) {
        return res.status(200).json(data);
      }
    }
    return res.status(404).send("No data to update");
  } catch (error) {
    res.status(502).send("Encountered server error:" + error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (user) {
      const data = await getUserDataById(user.adminUserId);
      if (data) {
        return res.status(200).json(data);
      }
    }
    return res.status(404).send("No data to delete");
  } catch (error) {
    res.status(502).send("Encountered server error:" + error);
  }
});

module.exports = router;
