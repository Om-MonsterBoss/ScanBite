import Navbar from "../components/layout/Navbar";
import om from "../assets/om.jpeg";
import darshana from "../assets/darshana.jpeg";
import abdullah from "../assets/abdullah.jpeg";
import laksh from "../assets/laksh.jpeg";
import prab from "../assets/image.png";
import nihar from "../assets/nihar.jpeg";

const About = () => {
  const team = [
    {
      name: "Darshana Chandel",
      role: "Frontend Engineer",
      image: darshana,
    },
    {
      name: "Om Choubey",
      role: "Frontend Engineer",
      image: om,
    },
    {
      name: "Laksh Jha",
      role: "UI/UX Designer",
      image: laksh,
    },
    {
      name: "Abdullah Bhoraniya",
      role: "Backend Engineer",
      image: abdullah,
    },
    {
      name: "Prab Singh Chandok",
      role: "ML Engineer",
      image: prab,
    },
    {
      name: "Nihar Chaudhari",
      role: "Research Analyst",
      image: nihar,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0a0b0a] text-[#f4f6f2]">

      {/* ================= NAVBAR ================= */}

      <Navbar />


      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        {/* Top right glow */}
        <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-[#9dff1f]/[0.07] blur-[120px]" />

        {/* Bottom left glow */}
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#9dff1f]/[0.05] blur-[120px]" />

        {/* Decorative circles */}
        <div className="absolute left-[5%] top-[25%] h-32 w-32 rounded-full border border-[#9dff1f]/[0.04]" />

        <div className="absolute right-[7%] top-[45%] h-24 w-24 rounded-full border border-[#9dff1f]/[0.04]" />

      </div>


      {/* ================= ABOUT HERO ================= */}

      <main className="relative z-10">

        <section className="px-6 pb-14 pt-16 sm:pt-20">

          <div className="mx-auto max-w-6xl">

            {/* Eyebrow */}

            <div className="mb-5 flex items-center gap-3">

              <span className="h-[2px] w-7 bg-[#9dff1f]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9dff1f]">
                About ScanBite
              </span>

            </div>


            {/* Heading */}

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">

              Built for the moment you're{" "}

              <span className="text-[#9dff1f]">
                standing in the aisle
              </span>

            </h1>


            {/* Description */}

            <div className="mt-6 max-w-2xl space-y-3">

              <p className="text-sm leading-7 text-[#9aa39a] sm:text-base">
                Most nutrition labels are written for regulators, not
                shoppers. ScanBite translates every packaged product into
                plain language the moment you scan it — what's actually in
                it, what it's good for, and what it isn't.
              </p>

              <p className="text-sm leading-7 text-[#9aa39a] sm:text-base">
                We're building the database one barcode at a time,
                cross-checking manufacturer data against open food
                databases so the score you see is one you can trust.
              </p>

            </div>


            {/* ================= STATS ================= */}

            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-7">

              <Stat
                value="50K+"
                label="Products Indexed"
              />

              <Stat
                value="98%"
                label="Scan Accuracy"
              />

              <Stat
                value="4.9★"
                label="User Rating"
              />

            </div>

          </div>

        </section>


        {/* ================= TEAM ================= */}

        <section className="border-t border-white/[0.07] px-6 py-16 sm:py-20">

          <div className="mx-auto max-w-6xl">

            {/* Team Header */}

            <div className="mb-9 max-w-2xl">

              <div className="mb-5 flex items-center gap-3">

                <span className="h-[2px] w-7 bg-[#9dff1f]" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9dff1f]">
                  The Team
                </span>

              </div>


              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">

                Know our{" "}

                <span className="text-[#9dff1f]">
                  team
                </span>

              </h2>


              <p className="mt-3 text-sm leading-6 text-[#9aa39a] sm:text-base">
                Six people, one small crew, each owning a different
                piece of ScanBite.
              </p>

            </div>


            {/* ================= TEAM GRID ================= */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {team.map((member) => (
                <TeamMember
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              ))}

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="relative z-10 border-t border-white/[0.07] px-6 py-6 text-center text-xs text-[#6b756c]">
        © 2026 ScanBite. All rights reserved.
      </footer>

    </div>
  );
};


/* ================= STAT COMPONENT ================= */

const Stat = ({ value, label }) => {
  return (
    <div>
      <span className="block text-3xl font-extrabold text-[#9dff1f]">
        {value}
      </span>

      <span className="mt-1 block text-xs text-[#9aa39a]">
        {label}
      </span>
    </div>
  );
};


/* ================= TEAM MEMBER ================= */

const TeamMember = ({ name, role, image }) => {
  return (
    <div className="group flex items-center gap-4 rounded-full border border-white/[0.08] bg-[#0e130e] p-2.5 pr-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9dff1f]/20 hover:bg-[#121810]">

      {/* Profile Image */}

      <img
        src={image}
        alt={name}
        className="h-14 w-14 shrink-0 rounded-full border border-white/[0.08] object-cover"
      />


      {/* Information */}

      <div className="min-w-0">

        <h3 className="truncate text-sm font-bold text-[#f4f6f2]">
          {name}
        </h3>

        <span className="mt-0.5 block text-xs font-semibold text-[#9dff1f]">
          {role}
        </span>

      </div>

    </div>
  );
};


export default About;