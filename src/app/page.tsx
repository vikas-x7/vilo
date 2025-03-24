import Footer from "@/page/home/Footer";
import { Hero } from "@/page/home/Homepage";
import MarqueeSection from "@/page/home/MarqueeSection";
import { Navbar } from "@/page/home/Navbar";

export default function Page() {
  return (
    <>
      <div className=" bg-black  flex justify-center font-gothic ">
        <div className="fixed top-0 left-0 w-full border-dashed border-b border-[#303030] z-50 bg-black   ">
          <MarqueeSection />
          <div className="max-w-7xl mx-auto">
            <Navbar />
          </div>
        </div>

        <div className="w-full  max-w-7xl border-dashed border-x border-[#303030]  pt-20 pb-24">
          <Hero />
        </div>
      </div>
      <div className="left-0 w-full border-t border-[#303030] z-50 bg-black ">
        <div className="max-w-7xl mx-auto border-x border-[#303030]">
          <Footer />
        </div>
      </div>
    </>
  );
}
