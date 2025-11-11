"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logoutUser, reset } from "../../../features/auth/authSlice"

export function Header() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector ((state) => state.auth);

  const handleLogout = async() => {
    dispatch(logoutUser());
    dispatch(reset());
  }

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              Logo
            </Link>
          </div>  

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary duration-300">
              Home
            </Link>
           { user ? (
             <>
          <Link to="/products/create" className="text-foreground hover:text-primary duration-300">Create Product</Link>
          <button onClick={handleLogout} className="hover:text-primary duration-300">Logout</button>
              </>
            ) : (
              <>
                <div className="hidden md:flex gap-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-foreground border border-border rounded-lg hover:bg-secondary"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>

         

          {/* TOGGLE MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="flex flex-col gap-3 pt-4 pb-4">

              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 text-foreground hover:text-primary"
              >
                Home
              </Link>

              <Link
                to="#about"
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 text-foreground hover:text-primary"
              >
                About
              </Link>

              <Link
                to="#services"
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 text-foreground hover:text-primary"
              >
                Services
              </Link>

              <Link
                to="#contact"
                onClick={() => setIsOpen(false)}
                className="px-2 py-2 text-foreground hover:text-primary"
              >
                Contact
              </Link>

              {/* Buttons mobile */}
              <div className="flex flex-col gap-2 pt-2 border-t border-border mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 border border-border rounded-lg hover:bg-secondary"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                  Register
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  )
}
