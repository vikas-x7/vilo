import { notFound } from "next/navigation";
import { portfolioService } from "@/modules/portfolio/portfolio.service";
import type { PortfolioData as BackendPortfolioData } from "@/modules/portfolio/portfolio.types";
import PortfolioRenderer from "@/features/portfolio/components/PortfolioRenderer";
import { adaptPortfolioToFrontend } from "@/features/portfolio";

interface Params {
    params: Promise<{
        username: string;
    }>;
}

export default async function Page({ params }: Params) {
    const { username } = await params;

    let pub;

    try {
        pub = await portfolioService.getPublic(username);
    } catch {
        notFound();
    }

    const data = adaptPortfolioToFrontend(pub.data as unknown as BackendPortfolioData, { username });

    return <PortfolioRenderer data={data} />;
}
