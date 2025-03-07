import { PortfolioData as FrontendPortfolioData } from "./types";
import { PortfolioData as BackendPortfolioData } from "@/modules/portfolio/portfolio.types";

export function adaptPortfolioToFrontend(
    be: BackendPortfolioData | undefined | null,
    username: string = ""
): FrontendPortfolioData {
    if (!be) {
        return {
            name: "",
            username,
            avatar: "",
            description: "",
            skills: [],
            experience: [],
            projects: [],
            education: [],
            activities: [],
            email: "",
            github: "",
            linkedin: "",
        };
    }

    return {
        name: be.name || "",
        username,
        avatar: be.userImage || "",
        description: be.subHeading || "",
        skills: (be.skills || []).map((s: any) => s.name),
        experience: (be.workExperience || []).map((w: any, i: number) => ({
            id: Date.now() + i,
            company: w.company,
            role: w.role,
            duration: w.endDate ? `${w.startDate} - ${w.endDate}` : w.startDate,
            desc: w.description,
        })),
        projects: (be.projects || []).map((p: any, i: number) => ({
            id: Date.now() + i,
            name: p.title,
            desc: p.description,
            link: p.liveUrl || p.githubUrl || "",
        })),
        education: (be.education || []).map((e: any, i: number) => ({
            id: Date.now() + i,
            degree: e.degree,
            school: e.institution,
            year: e.endYear ? `${e.startYear} - ${e.endYear}` : e.startYear,
        })),
        activities: (be.hackathons || []).map((h: any, i: number) => ({
            id: Date.now() + i,
            name: h.name,
            result: h.position || "",
            year: h.year,
        })),
        email: be.contact?.email || "",
        github: be.contact?.github || "",
        linkedin: be.contact?.linkedin || "",
    };
}

export function adaptPortfolioToBackend(fe: FrontendPortfolioData): BackendPortfolioData {
    return {
        userImage: fe.avatar || "https://placeholder.url/avatar.png",
        name: fe.name || "My Name",
        subHeading: fe.description || "My Description",
        skills: fe.skills.map((s) => ({ name: s || "Skill" })),
        workExperience: fe.experience.map((e) => ({
            company: e.company || "Company",
            role: e.role || "Role",
            startDate: e.duration || "2024",
            description: e.desc || "Description",
        })),
        hackathons: fe.activities.map((a) => ({
            name: a.name || "Event",
            position: a.result || "Participant",
            year: a.year || "2024",
        })),
        projects: fe.projects.map((p) => ({
            title: p.name || "Project",
            description: p.desc || "Description",
            techStack: ["N/A"], // Required by schema
            liveUrl: p.link || undefined,
        })),
        education: fe.education.map((e) => ({
            institution: e.school || "School",
            degree: e.degree || "Degree",
            field: "N/A", // Required by schema
            startYear: e.year || "2024",
        })),
        contact: {
            email: fe.email || undefined,
            github: fe.github || undefined,
            linkedin: fe.linkedin || undefined,
        },
    };
}
