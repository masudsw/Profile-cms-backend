
import slugify from "slugify";
import type { Prisma, Project } from "@prisma/client";
import { prisma } from "../../config/db";

export const ProjectService = {
  createProject: async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
    const slug = slugify(payload.name, { lower: true, strict: true });
    const uniqueSlug = `${slug}-${Date.now()}`;
    console.log({...payload,uniqueSlug})
    return await prisma.project.create({
      data: { ...payload, slug: uniqueSlug },
      include: { author: { select: { id: true, name: true, email: true } } }
    });
  },

  getProjects: async (): Promise<Project[]> => {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true }
    });
  },

  getProjectBySlug: async (slug: string): Promise<Project | null> => {

    return await prisma.project.findUnique({
      where: { slug },
      include: { author: true }

    });
  },

  updateProjectBySlug: async (
    slug: string,
    data: Partial<Project>
  ): Promise<Project> => {
    console.log(data,slug)
    if (data.name) {
      const tempSlug = slugify(data.name, { lower: true, strict: true });
      data.slug = `${tempSlug}-${Date.now()}`;
    }
    return await prisma.project.update({
      where: { slug },
      data
    });
  },

  deleteProjectBySlug: async (slug: string): Promise<void> => {
    await prisma.project.delete({ where: { slug } });
  }
};
