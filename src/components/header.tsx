"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-black text-white px-2 py-1 font-bold rounded-sm">
            S
          </div>
          <span className="text-lg font-semibold">ServiceHub</span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/services" className="hover:text-primary transition">
            Services
          </Link>
          <Link href="/bookings" className="hover:text-primary transition">
            My Bookings
          </Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">

          {/* Provider Portal */}
          <Button asChild variant="outline" className="text-sm">
          <Link href="/provider/register/step-1">Provider Portal</Link>
        </Button>


          {/* Separator */}
          <Separator orientation="vertical" className="h-6" />

          {/* Admin Login */}
          <Button asChild size="sm">
            <Link href="/login">Admin</Link>
          </Button>

        </div>

      </div>
    </header>
  );
}
