const express = require("express");
const {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
  deleteAllProjects,
} = require("../controllers/projectController");
const router = express.Router();

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id", getProject);

router.delete("/", deleteAllProjects);

router.delete("/:id", deleteProject);

router.put("/:id", updateProject);

module.exports = router;
