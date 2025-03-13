import { NextRequest, NextResponse } from "next/server";
import { portfolioSchema } from "@/modules/portfolio/portfolio.validation";
import { portfolioService } from "@/modules/portfolio/portfolio.service";
import { createPortfolioResponse } from "@/modules/portfolio/portfolio.response";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await req.json();
    const parsed = portfolioSchema.parse(body);

    const portfolio = await portfolioService.save(user.id, parsed);
    const response = createPortfolioResponse({
      portfolio,
      user: portfolio.user,
      origin: req.nextUrl.origin,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
