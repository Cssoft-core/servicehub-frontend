"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 text-sm">

        {/* Logo Section */}
        <div>
          <div className="bg-white text-black px-2 py-1 font-bold inline-block rounded-sm">
            S
          </div>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Your trusted partner for all home services.
            <br />
            Quality work, guaranteed satisfaction.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-white mb-3">Services</h3>
          <ul className="space-y-2">
            {["Cleaning", "Plumbing", "Electrical", "Salon & Spa"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2">
            {["About Us", "Careers", "Partner With Us", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Separator */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <Separator className="bg-gray-700" />
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} ServiceHub. All rights reserved.
      </p>
    </footer>
  );
}
