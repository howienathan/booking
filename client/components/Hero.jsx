"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/isi.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          quality={75}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      <div className="relative flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
            Book Your Order Today
          </h1>

          <p className="text-lg sm:text-xl text-gray-100 leading-relaxed max-w-xl mx-auto text-balance">
           go order ahead. Were ready to serve you with the finest experience every time we open our doors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/booking"
              className="group relative inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 border-2 border-pink-400 text-white font-semibold py-3 px-8 rounded-lg hover:bg-pink-500/10 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-white text-sm font-medium">Scroll to explore</p>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
