export interface Experience {
    id: number;
    role: string;
    company: string;
    duration: string;
    desc: string;
}

export interface Project {
    id: number;
    name: string;
    desc: string;
    link: string;
}

export interface Education {
    id: number;
    degree: string;
    school: string;
    year: string;
}

export interface Activity {
    id: number;
    name: string;
    result: string;
    year: string;
}

export interface PortfolioData {
    name: string;
    username: string;
    avatar: string;
    description: string;
    skills: string[];
    experience: Experience[];
    projects: Project[];
    education: Education[];
    activities: Activity[];
    email: string;
    github: string;
    linkedin: string;
    isPublic: boolean;
    isDeployed: boolean;
    deployedUrl: string;
}
