import { PortfolioData as FrontendPortfolioData } from "../types/portfolio.types";
import {
    Hackathon,
    PortfolioData as BackendPortfolioData,
    Project as BackendProject,
    Skill,
    WorkExperience,
    Education as BackendEducation,
} from "@/modules/portfolio/portfolio.types";

interface FrontendAdapterOptions {
    username?: string;
    email?: string;
    isPublic?: boolean;
    isDeployed?: boolean;
    deployedUrl?: string;
}

export function createEmptyPortfolio(
    options: FrontendAdapterOptions = {},
): FrontendPortfolioData {
    return {
        name: "",
        username: options.username || "",
        avatar: "",
        description: "",
        skills: [],
        experience: [],
        projects: [],
        education: [],
        activities: [],
        email: options.email || "",
        github: "",
        linkedin: "",
        isPublic: options.isPublic ?? true,
        isDeployed: options.isDeployed ?? false,
        deployedUrl: options.deployedUrl || "",
    };
}

export function adaptPortfolioToFrontend(
    be: BackendPortfolioData | undefined | null,
    options: FrontendAdapterOptions = {}
): FrontendPortfolioData {
    const fallback = createEmptyPortfolio(options);

    if (!be) {
        return fallback;
    }

    return {
        ...fallback,
        name: be.name || "",
        username: options.username || "",
        avatar: be.userImage || "",
        description: be.subHeading || "",
        skills: (be.skills || []).map((s: Skill) => s.name),
        experience: (be.workExperience || []).map((w: WorkExperience, i: number) => ({
            id: Date.now() + i,
            company: w.company,
            role: w.role,
            duration: w.endDate ? `${w.startDate} - ${w.endDate}` : w.startDate,
            desc: w.description,
        })),
        projects: (be.projects || []).map((p: BackendProject, i: number) => ({
            id: Date.now() + i,
            name: p.title,
            desc: p.description,
            link: p.liveUrl || p.githubUrl || "",
        })),
        education: (be.education || []).map((e: BackendEducation, i: number) => ({
            id: Date.now() + i,
            degree: e.degree,
            school: e.institution,
            year: e.endYear ? `${e.startYear} - ${e.endYear}` : e.startYear,
        })),
        activities: (be.hackathons || []).map((h: Hackathon, i: number) => ({
            id: Date.now() + i,
            name: h.name,
            result: h.position || "",
            year: h.year,
        })),
        email: be.contact?.email || options.email || "",
        github: be.contact?.github || "",
        linkedin: be.contact?.linkedin || "",
    };
}

export function adaptPortfolioToBackend(fe: FrontendPortfolioData): BackendPortfolioData {
    return {
        userImage: fe.avatar || "",
        name: fe.name || "",
        subHeading: fe.description || "",
        skills: fe.skills.map((s) => ({ name: s || "" })),
        workExperience: fe.experience.map((e) => ({
            company: e.company || "",
            role: e.role || "",
            startDate: e.duration || "",
            description: e.desc || "",
        })),
        hackathons: fe.activities.map((a) => ({
            name: a.name || "",
            position: a.result || "",
            year: a.year || "",
        })),
        projects: fe.projects.map((p) => ({
            title: p.name || "",
            description: p.desc || "",
            techStack: [],
            liveUrl: p.link || undefined,
        })),
        education: fe.education.map((e) => ({
            institution: e.school || "",
            degree: e.degree || "",
            field: "",
            startYear: e.year || "",
        })),
        contact: {
            email: fe.email || undefined,
            github: fe.github || undefined,
            linkedin: fe.linkedin || undefined,
        },
    };
}
