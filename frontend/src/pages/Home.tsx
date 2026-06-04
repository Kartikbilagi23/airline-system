import { useNavigate } from "react-router-dom"
import HeroSearch from "../components/HeroSearch";
import Navbar from "../components/Navbar";
import PromoCard from "../components/PromoCard"
import paris from "../assets/paris.jpg"
import dubai from "../assets/dubai.jpg"
import maldives from "../assets/maldives.jpg"
import singapore from "../assets/singapore.avif"
import DestinationCard from "../components/DestinationCard";
import HeroBottom from "../components/HeroBottom";
import FooterAbove from "../components/FooterAbove";
import { useState } from "react";

const Home = () => {
  const navigate=useNavigate();
  const [title, settitle] = useState<string>("")
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <HeroSearch/>
      <div
      className="grid grid-cols-3 gap-6 p-3"
      >
        <div className="col-span-2 row-span-2">
      <PromoCard
      image={paris}
      title="Paris Awaits"
      subtitle="Book your romantic gateway"
      />
        </div>
        <div className="col-span-1 row-span-2">
      <PromoCard
      image={dubai}
      title="Explore Dubai"
      subtitle="Luxury travel deals"
      />
        </div>
        <div className="col-span-1 row-span-2">
      <PromoCard
      image={maldives}
      title="Maldives Escape"
      subtitle="Beach vacations starting ₹9999"
      />
        </div>
        <div className="col-span-2 row-span-2">
      <PromoCard
      image={singapore}
      title="Singapore Awaits"
      subtitle="Discover iconic landmarks, street food, and vibrant city life"
      />
        </div>
      </div>
      <DestinationCard/>
      <HeroBottom/>
      <FooterAbove/>
      <footer
      className="bg-[#0B1020]
      text-white
      mt-24 rounded-t-[40px]
      px-10 py-16
      "
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4
        gap-12"
        >
          {/* brand */}
          <div>
            <h1 className="text-3xl font-bold">SkyVira Airlines</h1>
            <p className="mt-4 text-gray-400 leading-7">
        Discover seamless flight booking experiences
        with premium comfort and global destinations.
            </p>
          </div>
          {/* company */}
          <div>
            <h2 className="font-semibold text-lg mb-4">
              Company
            </h2>
            <ul className="space-y-3 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Blog</li>
            </ul>
          </div>
          {/* support */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Support</h2>
            <ul className="space-y-3 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Terms & Privacy</li>
            </ul>
          </div>
          {/* Travel */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Travel Info</h2>
            <ul className="space-y-3 text-gray-400">
              <li>Flight Status</li>
              <li>Check-In</li>
              <li>Baggage Policy</li>
              <li>Seat Selection</li>
            </ul>
          </div>
        </div>
          {/* Bottom*/}
          <div className="
          border-t border-white/10 mt-12
          pt-6 flex flex-col md:flex-row justify-between items-center
           text-gray-500
          ">
            <p>@2026 SkyBook Airlines. All rights reserved.
            </p>
              <div className="flex gap-5 mt-4 md:mt-0">
                <span>Instagram</span>
                <span>Twitter</span>
                <span>Linkedin</span>
              </div>
          </div>
      </footer>
    </div>
  )
}

export default Home
//max-w-7xl mx-auto px-6 py-16