import { Hero, Navbar } from "@/page/home/Homepage";

export default function Page() {
  return (
    <div className="bg-[#14120B] min-h-screen flex justify-center font-gothic">
      <div className="fixed top-0 left-0 w-full border-b border-[#38352e] z-50 bg-[#14120B]">
        <div className="max-w-7xl mx-auto ">
          <Navbar />
        </div>
      </div>
      <div className="w-full max-w-7xl border-x border-[#38352e] pt-20">
        <Hero />
      </div>
    </div>
  );
}
