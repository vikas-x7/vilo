import { NextResponse } from "next/server";
import { portfolioService } from "@/modules/portfolio/portfolio.service";

interface Params {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { username } = await params;
    const portfolio = await portfolioService.getPublic(username);

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
