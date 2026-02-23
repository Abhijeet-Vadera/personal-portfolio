export interface TimelineEvent {
    year: string;
    title: string;
    company: string;
    description: string;
    tech: string[];
}

export const timelineData: TimelineEvent[] = [
    {
        year: "2024 - Present",
        title: "Lead Solutions Architect",
        company: "Global Tech Corp",
        description: "Leading the architectural design of distributed cloud systems, focusing on low-latency data processing and high-availability infrastructures.",
        tech: ["AWS", "Node.js", "Kubernetes", "TypeScript"]
    },
    {
        year: "2022 - 2024",
        title: "Senior Engineering Manager",
        company: "Nexus Systems",
        description: "Managed a team of 15 engineers delivering cross-platform applications and microservices. Spearheaded the migration from monolith to micro-frontends.",
        tech: ["React", "GraphQL", "Go", "Docker"]
    },
    {
        year: "2020 - 2022",
        title: "Senior Full Stack Engineer",
        company: "Innovate Labs",
        description: "Architected real-time visualization dashboards for industrial IoT data. Optimized frontend performance by 40% using advanced caching strategies.",
        tech: ["Next.js", "Python", "PostgreSQL", "Redis"]
    },
    {
        year: "2018 - 2020",
        title: "Software Engineer II",
        company: "Core Dynamics",
        description: "Developed and maintained core API services for a high-traffic e-commerce platform. Integrated third-party payment gateways and logistics providers.",
        tech: ["Java", "Spring Boot", "MySQL", "Azure"]
    }
];
