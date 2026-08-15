import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Guide", path: "/guide" },
    { name: "About", path: "/about" },
    { name: "Scanner", path: "/scanner" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">

      {/* ================= MAIN NAVBAR ================= */}

      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6">

        {/* ================= LOGO ================= */}

        <NavLink
          to="/"
          className="group flex items-center gap-3"
        >
          {/* Shield Logo */}
          <div className="flex h-9 w-9 items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-[#8DFF00]"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M12 3L20 6V11C20 16.5 16.5 20 12 21C7.5 20 4 16.5 4 11V6L12 3Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M9 12L11 14L15 10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-[24px] font-bold tracking-tight text-white">
            Scan<span className="text-[#8DFF00]">Bite</span>
          </span>
        </NavLink>


        {/* ================= DESKTOP NAVIGATION ================= */}

        <div className="hidden items-center gap-9 md:flex">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-7 text-[15px] font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#8DFF00]"
                    : "text-[#888888] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#8DFF00] transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

        </div>


        {/* ================= DESKTOP AUTH ================= */}

        <div className="hidden items-center gap-5 md:flex">

          {isLoggedIn ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-[15px] font-medium transition ${
                    isActive
                      ? "text-[#8DFF00]"
                      : "text-[#888888] hover:text-white"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-full bg-[#8DFF00] px-6 py-2.5 text-sm font-bold text-black transition duration-300 hover:bg-[#a5ff3b] hover:shadow-[0_0_25px_rgba(141,255,0,0.25)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-[15px] font-medium text-[#888888] transition hover:text-white"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-full bg-[#8DFF00] px-7 py-2.5 text-sm font-bold text-black transition duration-300 hover:bg-[#a5ff3b] hover:shadow-[0_0_30px_rgba(141,255,0,0.25)]"
              >
                Register
              </NavLink>
            </>
          )}

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

      </div>


      {/* ================= MOBILE NAVIGATION ================= */}

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#080808] px-6 py-5 md:hidden">

          <div className="flex flex-col gap-1">

            {/* Navigation Links */}

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-[15px] font-medium transition ${
                    isActive
                      ? "bg-[#8DFF00]/10 text-[#8DFF00]"
                      : "text-[#888888] hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}


            {/* Divider */}

            <div className="my-3 h-px bg-white/10" />


            {/* Mobile Auth */}

            {isLoggedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-[15px] font-medium text-[#888888] transition hover:bg-white/5 hover:text-white"
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-full bg-[#8DFF00] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#a5ff3b]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-center text-[15px] font-medium text-[#888888] transition hover:bg-white/5 hover:text-white"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 rounded-full bg-[#8DFF00] px-4 py-3 text-center text-sm font-bold text-black transition hover:bg-[#a5ff3b]"
                >
                  Register
                </NavLink>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;