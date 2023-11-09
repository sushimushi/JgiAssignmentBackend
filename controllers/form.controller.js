const router = require("express").Router();
const UserModel = require("../models/user.model");
const FormModel = require("../models/form.model");

router.get("/get", async (req, res) => {
  try {
    const user = await UserModel.findById(req._id);
    if (user === null) res.status(400).send("User not found");
    else {
      const form = await FormModel.find({ uid: req._id });
      res.status(201).send(form);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const user = await UserModel.findById(req._id);
    if (user === null) res.status(400).send("User not found");
    else {
      req.body.forEach((form) => {
        form["uid"] = req._id;
      });
      const form = await FormModel.insertMany(req.body);
      const ids = form.map((form) => {
        return form._id;
      });

      await user.updateOne({ $push: { formList: { $each: ids } } });

      res.status(201).json({ form: form });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/update", async (req, res) => {
  // Expects whole form including: title, description and status
  // Here query.id is the _id of form Document and not the user id(uid)
  try {
    const form = await FormModel.findById(req.body._id);
    if (form === null) res.status(400).send("form not found");
    else {
      delete req.body._id;
      form = req.body;

      await form.save();
      res.status(200).json({ success: true, message: "form updated" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/remove", async (req, res) => {
  // Expects the index of form to be deleted, _id of form, and user's id (as 'uid' in form)
  try {
    
      const form = await FormModel.deleteOne({_id:req.params.id});

    return res.status(200).json({ success: true, message: "form removed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
