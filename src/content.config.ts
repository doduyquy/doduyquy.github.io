import { defineCollection, z } from "astro:content";

// create collection: posts
// a post need these fields
const posts = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()).default([]),
        lang: z.enum(["vi", "en"]).default("vi"),
        draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    github: z.string().optional(),
    demo: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false), // good projects to show at home page
  }),
});

const papers = defineCollection({
  schema: z.object({
    title: z.string(),
    venue: z.string().optional(),
    year: z.number().optional(),
    authors: z.array(z.string()).default([]),
    abstract: z.string().optional(),
    pdf: z.string(),
    code: z.string().optional(),
    status: z.enum(["approved", "processing"]).default("processing"),
    featured: z.boolean().default(false), // good papers to show at home page
  }),
});

export const collections = {
    posts,
    projects,
    papers,
};