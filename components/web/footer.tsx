import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-emerald-900 text-gray-200 overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/footer.jpg')" }}
      />

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-emerald-900/80"></div>

      {/* Footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Mukumi Wildlife Tanzania</h2>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Experience Tanzania’s wildlife, beaches, culture, and breathtaking landscapes.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/destinations" className="hover:text-yellow-400">Destinations</Link></li>
            <li><Link href="/tours" className="hover:text-yellow-400">Tours & Safaris</Link></li>
            <li><Link href="/gallery" className="hover:text-yellow-400">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Top Destinations */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Top Destinations</h3>
          <ul className="space-y-2 text-sm">
            <li>Serengeti National Park</li>
            <li>Zanzibar Island</li>
            <li>Mount Kilimanjaro</li>
            <li>Ngorongoro Crater</li>
            <li>Tarangire Park</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 items-center">
              <FaMapMarkerAlt className="text-yellow-400" /> Morogoro, Tanzania
            </li>
            <li className="flex gap-3 items-center">
              <FaPhoneAlt className="text-yellow-400" /> +255 (0)746 560 832
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="text-yellow-400" /> info@mikumiwildlifesafari.co.tz
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-lg">
            <Link href="#" className="hover:text-yellow-400"><FaFacebookF /></Link>
            <Link href="#" className="hover:text-yellow-400"><FaInstagram /></Link>
            <Link href="#" className="hover:text-yellow-400"><FaTwitter /></Link>
            <Link href="#" className="hover:text-yellow-400"><FaWhatsapp /></Link>
            <Link href="/login" className="hover:text-yellow-400"><FaUser /></Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-white/10 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Explore Tanzania. All rights reserved.
      </div>
    </footer>
  );
}
