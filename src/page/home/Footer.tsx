import React from 'react';
import { GiRoundShield } from 'react-icons/gi';

function Footer() {
  return (
    <footer className="w-full   text-white font-gothic">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#FAFAFA] text-[20px]">
              <img src="https://i.pinimg.com/736x/f6/77/82/f6778272ae65ab1c8a7c42520899250f.jpg" alt="" className="w-5 h-5 rounded-[1px]" />
              Helix AI
            </div>
            <p className="text-sm text-neutral-500">Write with precision, showcase with confidence, and learn with clarity all in one focused platform.</p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h4 className="font-medium">Product</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="hover:text-black transition cursor-pointer">Features</li>
              <li className="hover:text-black transition cursor-pointer">Pricing</li>
              <li className="hover:text-black transition cursor-pointer">Roadmap</li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="hover:text-black transition cursor-pointer">About</li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <h4 className="font-medium">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li className="hover:text-black transition cursor-pointer">Privacy</li>
              <li className="hover:text-black transition cursor-pointer">Terms</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6  flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© 2026 Helix AI. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-black cursor-pointer transition">Twitter</span>
            <span className="hover:text-black cursor-pointer transition">GitHub</span>
            <span className="hover:text-black cursor-pointer transition">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
