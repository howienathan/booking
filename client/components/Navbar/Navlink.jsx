"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoMenu, IoBagCheck } from "react-icons/io5";
import clsx from "clsx";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // load user dari localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    router.push("/")
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Gallery", href: "/galeri" },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex md:hidden items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
      >
        {!open ? <IoMenu className="size-7" /> : <IoClose className="size-7" />}
      </button>

      {/* Menu */}
      <div
        className={clsx(
          "w-full md:w-auto transition-all duration-300",
          open ? "block" : "hidden md:block"
        )}
      >
        <ul
          className="flex flex-col md:flex-row md:items-center font-medium text-base
          p-4 md:p-0 mt-4 md:mt-0 rounded-lg
          bg-gray-50 md:bg-transparent 
          space-y-3 md:space-y-0 md:space-x-8"
        >
          {/* Nav Links */}
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-2 px-3 text-gray-700 hover:text-pink-500 transition-colors duration-200 rounded-md"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Booking hanya tampil kalau login */}
          {user && (
            <li>
              <Link
                href="/booking"
                className="block py-2 px-3 text-gray-700 hover:text-pink-500 transition-colors duration-200"
              >
                Booking
              </Link>
            </li>            
          )}
          {user && (
            <li>
              <Link
                href="/order"
                className="block py-2 px-3 text-gray-700 hover:text-pink-500 transition-colors duration-200"
              >
                Order
              </Link>
            </li>            
          )}
          {user && (
            <li>
              <Link
                href="/checkout"
                className="block py-2 px-3 text-gray-700 hover:text-pink-500 transition-colors duration-200"
              >
                <IoBagCheck className="size-7" />
              </Link>
            </li>
          )}

          {/* Tampilkan Sign in & Register jika belum login */}
          {!user && (
            <>
              <li>
                <Link
                  href="/signin"
                  className="inline-block py-2.5 px-6 rounded-2xl bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="inline-block py-2.5 px-6 rounded-2xl bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="inline-block py-2.5 px-6 rounded-xl bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
