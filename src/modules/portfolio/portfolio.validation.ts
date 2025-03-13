// src/modules/portfolio/portfolio.validation.ts

import { z } from "zod";

export const portfolioDataSchema = z.object({
  userImage: z.string(),
  name: z.string(),
  subHeading: z.string(),
  skills: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  workExperience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      description: z.string(),
    }),
  ),
  hackathons: z.array(
    z.object({
      name: z.string(),
      position: z.string().optional(),
      year: z.string(),
      description: z.string().optional(),
    }),
  ),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      techStack: z.array(z.string()),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
    }),
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string(),
      startYear: z.string(),
      endYear: z.string().optional(),
    }),
  ),
  contact: z.object({
    email: z.string().optional(),
    phone: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
  }),
});

export const portfolioSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(40),
  isPublic: z.boolean(),
  data: portfolioDataSchema,
});
