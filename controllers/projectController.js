const Project = require("../model/Project");
const mongoose = require("mongoose");

const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({createdAt: -1});
  res.status(200).json(projects);
};
const getProject = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No projects found"});
  }

  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json({error: "No projects found"});
  }
  res.status(200).json(project);
};

const createProject = async (req, res) => {
  const {group, pname, desc, tasks} = req.body;
  try {
    const project = await Project.create({group, pname, desc, tasks});
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message});
  }
};
const deleteProject = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No projects found"});
  }
  const project = await Project.findOneAndDelete({_id: id});
  if (!project) {
    return res.status(404).json({error: "No projects found"});
  }
  res.status(200).json(project);
};
const deleteAllProjects = async (req, res) => {
  const project = await Project.deleteMany();
  if (!project) {
    return res.status(404).json({error: "No projects found"});
  }
  res.status(200).json(project);
};

const updateProject = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No projects found"});
  }
  const project = await Project.findOneAndUpdate({_id: id}, {...req.body});
  if (!project) {
    return res.status(404).json({error: "No projects found"});
  }
  res.status(200).json(project);
};
module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
  deleteAllProjects,
};
