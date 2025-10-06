
import slugify from "slugify";
import { prisma } from "../../config/db";
import { Prisma, Post } from "@prisma/client";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  const slug = slugify(payload.title, { lower: true, strict: true });
  const uniqueSlug = `${slug}-${Date.now()}`; 

  return await prisma.post.create({
    data: {
      ...payload,
      slug:uniqueSlug,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};



const getAllPosts = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.post.count({ where })

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

const getPostBySlug = async (slug: string): Promise<Post | null> => {
  return await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { slug },
      data: { views: { increment: 1 } }
    });

    return await tx.post.findUnique({
      where: { slug },
      include: { author: true }
    });
  });
};

const updatePostBySlug = async (
  slug: string,
  data: Partial<Post>
): Promise<Post> => {
  if (data.title) {
    const temp=slugify(data.title, { lower: true, strict: true });
    
    data.slug = `${temp}-${Date.now()}`;
  }
  return await prisma.post.update({
    where: { slug },
    data
  });
};

const deletePostBySlug = async (slug: string): Promise<void> => {
  await prisma.post.delete({ where: { slug } });
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostBySlug,
  updatePostBySlug,
  deletePostBySlug,
};
