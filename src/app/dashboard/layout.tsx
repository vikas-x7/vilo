import Link from "next/link";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h2>
                </div>
                <nav className="flex flex-col gap-2 px-4 mt-4 text-sm font-medium">
                    <Link
                        href="/dashboard/portfolio"
                        className="px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="/dashboard/latex"
                        className="px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        LaTeX
                    </Link>
                    <Link
                        href="/dashboard/roadmap"
                        className="px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        Roadmap
                    </Link>
                    <Link
                        href="/dashboard/profile"
                        className="px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        Profile
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
