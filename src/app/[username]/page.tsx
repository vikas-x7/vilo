import { notFound } from "next/navigation";
import { portfolioService } from "@/modules/portfolio/portfolio.service";
import PortfolioRenderer from "@/features/portfolio/components/PortfolioRenderer";
import { adaptPortfolioToFrontend } from "@/features/portfolio";

interface Params {
    params: Promise<{
        username: string;
    }>;
}

export default async function Page({ params }: Params) {
    try {
        const { username } = await params;
        const pub = await portfolioService.getPublic(username);
        const data = adaptPortfolioToFrontend(pub.data as any, username);

        return <PortfolioRenderer data={data} />;
    } catch {
        notFound();
    }
}
