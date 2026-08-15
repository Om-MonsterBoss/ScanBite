import Navbar from "../components/layout/Navbar";
import scanner from "../assets/scanner.png";
import packagedFood from "../assets/packaged-item.png";

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#090909] text-white">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />


      {/* =====================================================
          GLOBAL BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute -right-60 -top-60 h-[650px] w-[650px] rounded-full bg-[#91FF00]/[0.055] blur-[150px]" />

        <div className="absolute -bottom-60 -left-60 h-[600px] w-[600px] rounded-full bg-[#91FF00]/[0.035] blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

      </div>


      <main className="relative z-10">


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="px-6 pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">

          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

            {/* ================= LEFT ================= */}

            <div>

              {/* Badge */}

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#91FF00]/20 bg-[#91FF00]/[0.06] px-4 py-2">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#91FF00] opacity-60" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#91FF00]" />

                </span>

                <span className="text-xs font-semibold tracking-[0.12em] text-[#91FF00]">
                  AI-POWERED FOOD INTELLIGENCE
                </span>

              </div>


              {/* Heading */}

              <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-2px] sm:text-6xl lg:text-[72px]">

                Don't just read
                <span className="block">
                  the label.
                </span>

                <span className="block text-[#91FF00]">
                  Understand it.
                </span>

              </h1>


              {/* Description */}

              <p className="mt-7 max-w-2xl text-base leading-7 text-[#858585] sm:text-lg">

                ScanBite uses AI to turn complicated food labels into
                clear, useful information. Understand ingredients,
                nutrition, additives and more — before you decide
                what's going into your cart.

              </p>


              {/* CTA */}

              <div className="mt-9 flex flex-wrap items-center gap-4">

                <a
                  href="/scanner"
                  className="group flex items-center gap-3 rounded-full bg-[#91FF00] px-7 py-3.5 text-sm font-bold text-black transition duration-300 hover:bg-[#a7ff36] hover:shadow-[0_0_35px_rgba(145,255,0,0.2)]"
                >

                  Scan a Product

                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M13 6l6 6-6 6"
                    />
                  </svg>

                </a>


                <a
                  href="#how-it-works"
                  className="rounded-full border border-white/[0.12] px-7 py-3.5 text-sm font-semibold text-[#aaaaaa] transition duration-300 hover:border-[#91FF00]/30 hover:text-white"
                >
                  See How It Works
                </a>

              </div>


              {/* Quick benefits */}

              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">

                <QuickBenefit text="AI Analysis" />

                <QuickBenefit text="Ingredient Insights" />

                <QuickBenefit text="Nutrition Breakdown" />

                <QuickBenefit text="Health Score" />

              </div>

            </div>


            {/* ================= RIGHT ================= */}

            <div className="relative mx-auto w-full max-w-[520px]">

              {/* Main Product Interface */}

              <div className="relative overflow-hidden rounded-[30px] border border-white/[0.1] bg-[#0d0f0d] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">

                {/* Top bar */}

                <div className="flex items-center justify-between px-3 py-3">

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-[#91FF00] shadow-[0_0_10px_#91FF00]" />

                    <span className="text-xs font-semibold text-[#777777]">
                      SCANBITE ANALYSIS
                    </span>

                  </div>

                  <span className="text-[10px] text-[#4f4f4f]">
                    AI ENGINE
                  </span>

                </div>


                {/* Product */}

                <div className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#080908]">

                  {/* Radial glow */}

                  <div className="absolute h-[280px] w-[280px] rounded-full bg-[#91FF00]/[0.08] blur-[90px]" />

                  {/* Scan lines */}

                  <div className="absolute left-8 right-8 top-1/2 h-px bg-[#91FF00]/40 shadow-[0_0_15px_#91FF00]" />

                  <div className="absolute left-1/2 top-8 bottom-8 w-px bg-[#91FF00]/10" />

                  <img
                    src={packagedFood}
                    alt="Food product being analyzed"
                    className="relative z-10 max-h-[320px] max-w-[78%] object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.7)]"
                  />


                  {/* Scan indicator */}

                  <div className="absolute left-5 top-5 rounded-lg border border-[#91FF00]/20 bg-[#91FF00]/[0.06] px-3 py-2 backdrop-blur-md">

                    <div className="flex items-center gap-2">

                      <span className="h-1.5 w-1.5 rounded-full bg-[#91FF00]" />

                      <span className="text-[10px] font-semibold text-[#91FF00]">
                        PRODUCT DETECTED
                      </span>

                    </div>

                  </div>

                </div>


                {/* Analysis result */}

                <div className="mt-4 grid grid-cols-3 gap-2">

                  <AnalysisItem
                    label="Ingredients"
                    value="Analyzed"
                  />

                  <AnalysisItem
                    label="Nutrition"
                    value="Ready"
                  />

                  <AnalysisItem
                    label="Additives"
                    value="Checked"
                  />

                </div>


                {/* Bottom */}

                <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#111411] px-4 py-3">

                  <div>

                    <p className="text-[10px] uppercase tracking-wider text-[#555555]">
                      Analysis Status
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Ready to understand
                    </p>

                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#91FF00]/10">

                    <svg
                      className="h-4 w-4 text-[#91FF00]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                  </div>

                </div>

              </div>


              {/* Floating score */}

              <div className="absolute -right-5 top-24 hidden rounded-2xl border border-[#91FF00]/20 bg-[#101510]/95 p-4 shadow-2xl backdrop-blur-xl sm:block">

                <p className="text-[10px] uppercase tracking-wider text-[#666666]">
                  Health Score
                </p>

                <div className="mt-1 flex items-end gap-1">

                  <span className="text-3xl font-extrabold text-[#91FF00]">
                    A
                  </span>

                  <span className="mb-1 text-xs text-[#777777]">
                    AI rating
                  </span>

                </div>

              </div>


              {/* Floating AI */}

              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/[0.1] bg-[#111311]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#91FF00]/10">

                    <span className="text-xs font-bold text-[#91FF00]">
                      AI
                    </span>

                  </div>

                  <div>

                    <p className="text-xs font-semibold">
                      Smart Analysis
                    </p>

                    <p className="text-[10px] text-[#666666]">
                      Instant insights
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PROBLEM STRIP
        ===================================================== */}

        <section className="border-y border-white/[0.07] bg-[#0b0d0b] px-6 py-10">

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">

            <ProblemStat
              number="01"
              title="Long Labels"
              text="Ingredient lists are difficult to understand."
            />

            <Divider />

            <ProblemStat
              number="02"
              title="Hidden Additives"
              text="Not every ingredient is obvious to the average shopper."
            />

            <Divider />

            <ProblemStat
              number="03"
              title="Too Much Information"
              text="Nutrition data can be overwhelming when you're in a hurry."
            />

          </div>

        </section>


        {/* =====================================================
            WHAT SCANBITE DOES
        ===================================================== */}

        <section className="px-6 py-20 lg:py-24">

          <div className="mx-auto max-w-6xl">

            <SectionHeading
              label="WHAT SCANBITE DOES"
              title="One scan. A clearer picture."
              description="Instead of making you decode a food label yourself, ScanBite organizes the important information into insights you can actually use."
            />


            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              <InfoCard
                number="01"
                icon="⌁"
                title="Identify Ingredients"
                text="Understand what ingredients are present in the product."
              />

              <InfoCard
                number="02"
                icon="AI"
                title="Analyze With AI"
                text="Use AI to turn raw product information into useful insights."
              />

              <InfoCard
                number="03"
                icon="!"
                title="Spot Additives"
                text="Bring preservatives, colors and other additives into focus."
              />

              <InfoCard
                number="04"
                icon="✓"
                title="Make Your Choice"
                text="Use the information to make a more informed decision."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            FEATURE SHOWCASE
        ===================================================== */}

        <section className="border-y border-white/[0.07] bg-[#0b0d0b] px-6 py-20 lg:py-24">

          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">

            {/* IMAGE */}

            <div className="relative order-2 lg:order-1">

              <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d0f0d] p-3">

                <div className="relative h-[380px] overflow-hidden rounded-[20px] bg-[#080908]">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,255,0,0.07),transparent_60%)]" />

                  <img
                    src={scanner}
                    alt="ScanBite scanner interface"
                    className="h-full w-full object-cover opacity-90"
                  />

                  <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/[0.08] bg-[#0b0d0b]/90 p-4 backdrop-blur-xl">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-[10px] uppercase tracking-wider text-[#555555]">
                          SCAN RESULT
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Product analysis complete
                        </p>

                      </div>

                      <span className="rounded-full bg-[#91FF00]/10 px-3 py-1.5 text-xs font-bold text-[#91FF00]">
                        ANALYZED
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* TEXT */}

            <div className="order-1 lg:order-2">

              <SectionLabel text="UNDERSTAND YOUR FOOD" />

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">

                Information shouldn't
                <span className="block text-[#91FF00]">
                  be complicated.
                </span>

              </h2>

              <p className="mt-5 text-sm leading-7 text-[#858585] sm:text-base">
                ScanBite is designed around one simple idea: give people
                the information they need without making them become
                nutrition experts first.
              </p>


              <div className="mt-8 space-y-5">

                <FeatureRow
                  number="01"
                  title="Nutrition Breakdown"
                  text="See important nutritional information in a simpler format."
                />

                <FeatureRow
                  number="02"
                  title="Ingredient Intelligence"
                  text="Get context around ingredients instead of just reading names."
                />

                <FeatureRow
                  number="03"
                  title="Additive Awareness"
                  text="Bring potentially concerning additives to your attention."
                />

                <FeatureRow
                  number="04"
                  title="Actionable Insights"
                  text="Turn information into something you can actually use while shopping."
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section
          id="how-it-works"
          className="px-6 py-20 lg:py-24"
        >

          <div className="mx-auto max-w-6xl">

            <SectionHeading
              label="HOW IT WORKS"
              title="From product to understanding."
              description="The experience is intentionally simple. Scan, analyze, understand, decide."
            />


            <div className="relative mt-14">

              {/* Connecting line */}

              <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[#91FF00]/30 to-transparent lg:block" />


              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                <ProcessStep
                  number="01"
                  title="Scan"
                  text="Scan the product or its label."
                />

                <ProcessStep
                  number="02"
                  title="Analyze"
                  text="AI processes the available food information."
                />

                <ProcessStep
                  number="03"
                  title="Understand"
                  text="See nutrition, ingredients and key insights."
                />

                <ProcessStep
                  number="04"
                  title="Decide"
                  text="Use the information to make a smarter choice."
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            WHY SCANBITE
        ===================================================== */}

        <section className="border-y border-white/[0.07] bg-[#0b0d0b] px-6 py-20">

          <div className="mx-auto max-w-6xl">

            <SectionHeading
              label="WHY SCANBITE"
              title="Built around the shopper."
              description="ScanBite isn't trying to replace your judgment. It is designed to give you better information before you make it."
            />


            <div className="mt-10 grid gap-4 md:grid-cols-3">

              <WhyCard
                icon="01"
                title="Simple"
                text="Complex food information is presented in a way that's easier to understand."
              />

              <WhyCard
                icon="02"
                title="Fast"
                text="Get useful information without spending several minutes decoding a label."
              />

              <WhyCard
                icon="03"
                title="Transparent"
                text="The goal is to surface information clearly rather than hide it behind jargon."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="px-6 py-24">

          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#91FF00]/20 bg-[#0d120d] px-7 py-16 text-center sm:px-12">

            <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#91FF00]/10 blur-[100px]" />

            <div className="relative">

              <span className="text-xs font-bold tracking-[0.2em] text-[#91FF00]">
                MAKE YOUR NEXT CHOICE INFORMED
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">

                Know what's inside
                <span className="text-[#91FF00]">
                  {" "}before you buy.
                </span>

              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#777777] sm:text-base">
                Scan a product and see what ScanBite can tell you about it.
              </p>

              <a
                href="/scanner"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#91FF00] px-8 py-4 text-sm font-bold text-black transition duration-300 hover:bg-[#a7ff36] hover:shadow-[0_0_35px_rgba(145,255,0,0.2)]"
              >
                Start Scanning

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>

              </a>

            </div>

          </div>

        </section>


      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/[0.07] px-6 py-8">

        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="text-xl font-extrabold">
              Scan<span className="text-[#91FF00]">Bite</span>
            </div>

            <p className="mt-1 text-xs text-[#555555]">
              Understand your food. Make informed choices.
            </p>

          </div>

          <div className="flex gap-6 text-xs text-[#666666]">

            <a href="/about" className="transition hover:text-[#91FF00]">
              About
            </a>

            <a href="/guide" className="transition hover:text-[#91FF00]">
              Guide
            </a>

            <a href="/scanner" className="transition hover:text-[#91FF00]">
              Scanner
            </a>

            <a href="/contact" className="transition hover:text-[#91FF00]">
              Contact
            </a>

          </div>

        </div>

        <div className="mx-auto mt-7 max-w-6xl border-t border-white/[0.07] pt-5 text-center text-xs text-[#4f4f4f]">
          © 2026 ScanBite. All rights reserved.
        </div>

      </footer>

    </div>
  );
};


/* =========================================================
   SMALL COMPONENTS
========================================================= */

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-3">

    <span className="h-[2px] w-7 bg-[#91FF00]" />

    <span className="text-xs font-bold tracking-[0.18em] text-[#91FF00]">
      {text}
    </span>

  </div>
);


const SectionHeading = ({ label, title, description }) => (
  <div className="max-w-2xl">

    <SectionLabel text={label} />

    <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
      {title}
    </h2>

    <p className="mt-4 text-sm leading-7 text-[#858585] sm:text-base">
      {description}
    </p>

  </div>
);


const QuickBenefit = ({ text }) => (
  <div className="flex items-center gap-2 text-xs text-[#777777]">

    <svg
      className="h-3.5 w-3.5 text-[#91FF00]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>

    {text}

  </div>
);


const AnalysisItem = ({ label, value }) => (
  <div className="rounded-xl border border-white/[0.06] bg-[#111311] px-3 py-3">

    <p className="text-[9px] uppercase tracking-wider text-[#555555]">
      {label}
    </p>

    <p className="mt-1 text-xs font-semibold text-[#91FF00]">
      {value}
    </p>

  </div>
);


const ProblemStat = ({ number, title, text }) => (
  <div className="flex gap-4">

    <span className="text-xs font-bold text-[#91FF00]">
      {number}
    </span>

    <div>

      <h3 className="text-sm font-bold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-[#666666]">
        {text}
      </p>

    </div>

  </div>
);


const Divider = () => (
  <div className="hidden h-10 w-px bg-white/[0.08] md:block" />
);


const InfoCard = ({ number, icon, title, text }) => (
  <div className="group rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#91FF00]/25">

    <div className="flex items-center justify-between">

      <span className="text-xs font-bold text-[#91FF00]">
        {number}
      </span>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#91FF00]/10 text-xs font-bold text-[#91FF00]">
        {icon}
      </div>

    </div>

    <h3 className="mt-6 text-base font-bold">
      {title}
    </h3>

    <p className="mt-2 text-sm leading-6 text-[#6f766f]">
      {text}
    </p>

  </div>
);


const FeatureRow = ({ number, title, text }) => (
  <div className="flex gap-4">

    <span className="mt-1 text-xs font-bold text-[#91FF00]">
      {number}
    </span>

    <div>

      <h3 className="text-sm font-bold">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-[#666666]">
        {text}
      </p>

    </div>

  </div>
);


const ProcessStep = ({ number, title, text }) => (
  <div className="relative text-center lg:text-left">

    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#91FF00]/30 bg-[#0d120d] text-sm font-bold text-[#91FF00] lg:mx-0">

      {number}

    </div>

    <h3 className="mt-5 text-base font-bold">
      {title}
    </h3>

    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#666666] lg:mx-0">
      {text}
    </p>

  </div>
);


const WhyCard = ({ icon, title, text }) => (
  <div className="rounded-2xl border border-white/[0.07] bg-[#101210] p-7">

    <span className="text-xs font-bold text-[#91FF00]">
      {icon}
    </span>

    <h3 className="mt-5 text-xl font-bold">
      {title}
    </h3>

    <p className="mt-3 text-sm leading-6 text-[#6f766f]">
      {text}
    </p>

  </div>
);


export default Home;