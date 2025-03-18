"use client";

const mindMapNodes = [
  {
    name: "LaTeX Documents Developer Portfolios Learning Roadmaps",
  },
  {
    name: "LaTeX Documents Developer Portfolios Learning Roadmaps",
  },
  {
    name: "LaTeX Documents Developer Portfolios Learning Roadmaps",
  },
  {
    name: "LaTeX Documents Developer Portfolios Learning Roadmaps",
  },
];

export default function MarqueeSection() {
  return (
    <section className="w-full ">
      <div className="flex bg-white/80 text-black">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...mindMapNodes, ...mindMapNodes].map((node, i) => (
            <span
              key={i}
              className=" mx-5 sm:mx-8 md:mx-10 opacity-80 hover:opacity-100 transition-opacity duration-200 select-none text-[13px] sm:text-[15px] md:text-[10px]"
            >
              {node.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
