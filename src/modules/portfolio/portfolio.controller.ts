import { portfolioService } from "./portfolio.service";
import { NextResponse } from "next/server";

export const portfolioController = {
  async get() {
    const portfolio = await portfolioService.get();

    return NextResponse.json({ portfolio });
  },
};
