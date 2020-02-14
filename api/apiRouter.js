const express = require("express");

const projectsRouter = require("../data/projectsRouter");

const router = express.Router();

// this router handles requests beginning in /api

router.use("/projects", projectsRouter);

module.exports = router;
