import Link from "next/link";
import React from "react";

const templates = [
    {
        id: "resume-standard",
        name: "Professional Resume",
        description: "A clean, modern two-column resume template suitable for all professions.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop",
        color: "bg-blue-50"
    },
    {
        id: "research-ieee",
        name: "Research Paper (IEEE)",
        description: "Standard IEEE two-column format for academic research papers and conferences.",
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop",
        color: "bg-indigo-50"
    },
    {
        id: "report-tech",
        name: "Technical Report",
        description: "Comprehensive layout with title page, table of contents, and chapters.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
        color: "bg-emerald-50"
    },
    {
        id: "presentation-beamer",
        name: "Slide Presentation",
        description: "Minimalist Beamer template for academic or professional slide decks.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop",
        color: "bg-purple-50"
    },
    {
        id: "cover-letter",
        name: "Cover Letter",
        description: "Formal business letter template matching the Professional Resume style.",
        image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=400&auto=format&fit=crop",
        color: "bg-rose-50"
    },
    {
        id: "assignment",
        name: "Homework Assignment",
        description: "Simple single-column format with question/answer block environments.",
        image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=400&auto=format&fit=crop",
        color: "bg-amber-50"
    }
];

export default function LatexPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col min-h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">LaTeX Templates</h1>
                    <p className="text-gray-500 mt-2">Start a new document from a template or create your own from scratch.</p>
                </div>
                <Link
                    href="/dashboard/latex/editor"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 whitespace-nowrap"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create New Document
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                {templates.map((template) => (
                    <Link
                        href={`/dashboard/latex/editor?template=${template.id}`}
                        key={template.id}
                        className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className={`relative h-48 w-full overflow-hidden ${template.color}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <img
                                src={template.image}
                                alt={template.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-90"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                                {template.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex-1 leading-relaxed">
                                {template.description}
                            </p>
                            <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                Use Template
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
