const express = require("express");
const { testUserController } = require("../controllers/testController");

//Router object
const router = express.Router();

//Routes GET | POST | UPDATE | DELETE
router.get("/test", testUserController);

//Export
module.exports = router;
