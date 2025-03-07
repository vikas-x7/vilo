// src/modules/portfolio/portfolio.types.ts

export interface Skill {
  name: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Hackathon {
  name: string;
  position?: string;
  year: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface PortfolioData {
  userImage: string;
  name: string;
  subHeading: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  hackathons: Hackathon[];
  projects: Project[];
  education: Education[];
  contact: Contact;
}

export interface DeployResponse {
  url: string;
}
