import { Router } from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.post("/", checkAuth(), ProjectController.createProject);
router.get("/", ProjectController.getProjects);
router.get("/:slug", ProjectController.getProjectBySlug);
router.patch("/:slug",checkAuth(), ProjectController.updateProjectBySlug);
router.delete("/:slug", checkAuth(), ProjectController.deleteProjectBySlug);

export const ProjectRouter = router;
