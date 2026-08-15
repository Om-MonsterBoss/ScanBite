import Navbar from "../components/layout/Navbar";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= CONTACT PAGE ================= */}

      <main className="px-5 py-10 sm:px-6 sm:py-12">

        {/* ================= HERO ================= */}

        <section className="mx-auto max-w-4xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">

            <span className="h-[2px] w-7 bg-[#91FF00]" />

            <span className="text-xs font-bold tracking-[0.2em] text-[#91FF00]">
              CONTACT
            </span>

            <span className="h-[2px] w-7 bg-[#91FF00]" />

          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get in{" "}
            <span className="text-[#91FF00]">
              touch
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#858585] sm:text-base">
            Questions, ideas, or partnerships — write to us directly
            and we'll route it to the right person on the team.
          </p>

        </section>


        {/* ================= CONTENT ================= */}

        <section className="mx-auto mt-9 grid max-w-4xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">

          {/* ================= LEFT CARD ================= */}

          <div className="rounded-2xl border border-[#91FF00]/15 bg-[#0c1208] p-6">

            {/* Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#91FF00]/10">

              <svg
                className="h-5 w-5 text-[#91FF00]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6"
                />

                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
              </svg>

            </div>

            <h2 className="mt-5 text-xl font-bold">
              Let's talk
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#777777]">
              Found an issue, have an idea, or want to work with
              ScanBite? We'd love to hear from you.
            </p>


            {/* EMAIL */}

            <div className="mt-6">

              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                Email
              </p>

              <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#080808] px-3.5 py-3">

                <span className="text-sm font-medium text-white">
                  hello@scanbite.app
                </span>

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "hello@scanbite.app"
                    )
                  }
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#888888] transition hover:border-[#91FF00]/30 hover:text-[#91FF00]"
                >
                  Copy
                </button>

              </div>

            </div>


            {/* EMAIL BUTTON */}

            <a
              href="mailto:hello@scanbite.app"
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#91FF00] py-3 text-sm font-bold text-black transition hover:bg-[#a4ff2d]"
            >
              Email Us
            </a>


            {/* RESPONSE TIME */}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#777777]">

              <span className="h-1.5 w-1.5 rounded-full bg-[#91FF00] shadow-[0_0_7px_#91FF00]" />

              Usually replies within 1–2 business days

            </div>

          </div>


          {/* ================= FORM CARD ================= */}

          <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-6">

            <div className="mb-5">

              <h2 className="text-xl font-bold">
                Send us a message
              </h2>

              <p className="mt-1 text-sm text-[#666666]">
                Fill in the form and we'll get back to you.
              </p>

            </div>


            {submitted && (
              <div className="mb-4 rounded-lg border border-[#91FF00]/20 bg-[#91FF00]/5 px-3 py-2.5 text-xs text-[#91FF00]">
                Your message has been submitted successfully.
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME + EMAIL */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-xs font-medium text-[#cccccc]">
                    Your name
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-lg border border-white/[0.08] bg-[#080808] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#4f4f4f] focus:border-[#91FF00]/60"
                  />

                </div>


                <div>

                  <label className="mb-1.5 block text-xs font-medium text-[#cccccc]">
                    Email address
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full rounded-lg border border-white/[0.08] bg-[#080808] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#4f4f4f] focus:border-[#91FF00]/60"
                  />

                </div>

              </div>


              {/* SUBJECT */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-[#cccccc]">
                  Subject
                </label>

                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full rounded-lg border border-white/[0.08] bg-[#080808] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#4f4f4f] focus:border-[#91FF00]/60"
                />

              </div>


              {/* MESSAGE */}

              <div>

                <label className="mb-1.5 block text-xs font-medium text-[#cccccc]">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to discuss..."
                  rows="4"
                  required
                  className="w-full resize-none rounded-lg border border-white/[0.08] bg-[#080808] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-[#4f4f4f] focus:border-[#91FF00]/60"
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#91FF00] py-3 text-sm font-bold text-black transition hover:bg-[#a4ff2d] hover:shadow-[0_0_25px_rgba(145,255,0,0.12)]"
              >
                Send Message

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>

              </button>

            </form>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="mx-auto mt-10 max-w-4xl border-t border-white/[0.07] pt-5">

          <div className="flex flex-col items-center justify-between gap-3 text-xs text-[#555555] sm:flex-row">

            <p>
              © 2026 ScanBite. All rights reserved.
            </p>

            <div className="flex gap-5">

              <a
                href="#"
                className="transition hover:text-[#91FF00]"
              >
                Privacy
              </a>

              <a
                href="#"
                className="transition hover:text-[#91FF00]"
              >
                Terms
              </a>

            </div>

          </div>

        </footer>

      </main>

    </div>
  );
};

export default Contact;