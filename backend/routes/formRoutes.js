const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/submit-form", formController.submitForm);
router.get("/submitted-forms", formController.getAllUserforms);

module.exports = router;
