// src/modules/portfolio/portfolio.validation.ts

import { z } from "zod";

export const portfolioSchema = z.object({
  data: z.object({
    userImage: z.string().url(),
    name: z.string().min(1),
    subHeading: z.string().min(1),
    skills: z.array(
      z.object({
        name: z.string().min(1),
      }),
    ),
    workExperience: z.array(
      z.object({
        company: z.string().min(1),
        role: z.string().min(1),
        startDate: z.string(),
        endDate: z.string().optional(),
        description: z.string().min(1),
      }),
    ),
    hackathons: z.array(
      z.object({
        name: z.string().min(1),
        position: z.string().optional(),
        year: z.string(),
        description: z.string().optional(),
      }),
    ),
    projects: z.array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        techStack: z.array(z.string().min(1)),
        liveUrl: z.string().url().optional(),
        githubUrl: z.string().url().optional(),
      }),
    ),
    education: z.array(
      z.object({
        institution: z.string().min(1),
        degree: z.string().min(1),
        field: z.string().min(1),
        startYear: z.string(),
        endYear: z.string().optional(),
      }),
    ),
    contact: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      website: z.string().url().optional(),
    }),
  }),
});
