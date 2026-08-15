import { NavLink } from "react-router-dom";

const AuthNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6">

        {/* ================= LOGO ================= */}
        <NavLink
          to="/"
          className="group flex items-center gap-3"
        >
          {/* Shield Icon */}
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
            </svg>
          </div>

          <span className="text-[24px] font-bold tracking-tight text-white">
            Scan<span className="text-[#8DFF00]">Bite</span>
          </span>
        </NavLink>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-5">

          <span className="hidden text-sm text-[#666666] sm:block">
            New to ScanBite?
          </span>

          <NavLink
            to="/"
            className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-[#aaaaaa] transition duration-300 hover:border-[#8DFF00]/40 hover:text-[#8DFF00]"
          >

            {/* Arrow */}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M19 12H5M12 19l-7-7 7-7"
              />
            </svg>

            Back to Home

          </NavLink>

        </div>

      </div>
    </nav>
  );
};

export default AuthNavbar;