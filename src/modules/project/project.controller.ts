import { Request, Response } from "express";
import { ProjectService } from "./project.service";


export const ProjectController = {
  createProject: async (req: Request, res: Response) => {
    console.log(req.user)
    try {
      const project = await ProjectService.createProject({...req.body,authorId: req.user.userId});
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to create project", details: error });
    }
  },

  getProjects: async (req: Request, res: Response) => {
    try {
      const projects = await ProjectService.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects", details: error });
    }
  },

  getProjectBySlug: async (req: Request, res: Response) => {
    try {
      const project = await ProjectService.getProjectBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project", details: error });
    }
  },

  updateProjectBySlug: async (req: Request, res: Response) => {
    try {
      const project = await ProjectService.updateProjectBySlug(req.params.slug, req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to update project", details: error });
    }
  },

  deleteProjectBySlug: async (req: Request, res: Response) => {
    try {
      await ProjectService.deleteProjectBySlug(req.params.slug);
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project", details: error });
    }
  }
};
