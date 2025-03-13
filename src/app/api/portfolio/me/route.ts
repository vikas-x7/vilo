import { NextRequest, NextResponse } from "next/server";
import { portfolioService } from "@/modules/portfolio/portfolio.service";
import { createPortfolioResponse } from "@/modules/portfolio/portfolio.response";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolio = await portfolioService.getMine(user.id);
    const response = createPortfolioResponse({
      portfolio,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
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
