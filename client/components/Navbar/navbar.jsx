"use client";

import Link from "next/link";
import Navlink from "./Navlink";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ambil token / user dari localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        
        <Link href="/">
          <Image src="/logo.png" width={128} height={49} alt="logo" priority />
        </Link>

        <Navlink user={user} />
      </div>
    </div>
  );
};
