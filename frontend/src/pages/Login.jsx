import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthNavbar from "../components/layout/AuthNavBar";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    // Your API call will go here
    // Example:
    //
    // const response = await fetch(
    //   "http://localhost:3000/api/auth/login",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify(data),
    //   }
    // );
  };

  return (
    <div className="min-h-[calc(100vh-78px)] bg-[#080808] px-6 py-16 text-white">
        <AuthNavbar/>
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:block">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8DFF00]/20 bg-[#8DFF00]/5 px-4 py-2">

            <span className="h-2 w-2 rounded-full bg-[#8DFF00] shadow-[0_0_10px_#8DFF00]" />

            <span className="text-sm text-[#8DFF00]">
              Secure Product Verification
            </span>

          </div>


          {/* Heading */}
          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight">

            Welcome
            <span className="text-[#8DFF00]"> back.</span>

          </h1>


          {/* Description */}
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#888888]">
            Sign in to continue scanning products, understanding
            ingredients, and making smarter purchasing decisions.
          </p>


          {/* Features */}
          <div className="mt-10 space-y-5">

            <Feature
              title="Scan products"
              description="Get useful information directly from product packaging."
            />

            <Feature
              title="Understand ingredients"
              description="Turn complicated product information into something useful."
            />

            <Feature
              title="Make informed decisions"
              description="Know what you're buying before you buy it."
            />

          </div>

        </div>


        {/* ================= LOGIN CARD ================= */}
        <div className="mx-auto w-full max-w-md">

          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 shadow-2xl">

            {/* Header */}
            <div className="mb-8">

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8DFF00]/10">

                <svg
                  className="h-6 w-6 text-[#8DFF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"
                  />
                </svg>

              </div>


              <h2 className="text-3xl font-bold">
                Welcome back
              </h2>


              <p className="mt-2 text-sm text-[#777777]">
                Login to your ScanBite account.
              </p>

            </div>


            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-sm font-medium text-[#d0d0d0]">
                  Email address
                </label>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full rounded-xl border bg-[#080808] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#8DFF00] focus:ring-1 focus:ring-[#8DFF00]/30 ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                />

                {errors.email && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}

              </div>


              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-medium text-[#d0d0d0]">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-[#8DFF00] transition hover:text-[#a5ff3b]"
                  >
                    Forgot password?
                  </Link>

                </div>


                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full rounded-xl border bg-[#080808] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#8DFF00] focus:ring-1 focus:ring-[#8DFF00]/30 ${
                    errors.password
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                />

                {errors.password && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}

              </div>


              {/* REMEMBER ME */}
              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-white/20 bg-[#080808] accent-[#8DFF00]"
                />

                <span className="text-sm text-[#777777]">
                  Remember me
                </span>

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-[#8DFF00] py-3.5 text-sm font-bold text-black transition duration-300 hover:bg-[#a5ff3b] hover:shadow-[0_0_30px_rgba(141,255,0,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

            </form>


            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs text-[#555555]">
                OR
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>


            {/* GOOGLE LOGIN */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#080808] py-3.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
            >

              {/* Google Icon */}
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 01-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.09A12 12 0 0012 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.3A7.2 7.2 0 014.9 12c0-.8.14-1.57.37-2.3V6.61H1.27A12 12 0 000 12c0 1.94.46 3.78 1.27 5.39l4-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.36.61 4.61 1.8l3.45-3.45C17.95 1.12 15.24 0 12 0A12 12 0 001.27 6.61l4 3.09C6.22 6.86 8.87 4.75 12 4.75z"
                />
              </svg>

              Continue with Google

            </button>


            {/* REGISTER */}
            <p className="mt-7 text-center text-sm text-[#777777]">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-[#8DFF00] hover:underline"
              >
                Create account
              </Link>

            </p>

          </div>


          {/* Footer */}
          <p className="mt-5 text-center text-xs text-[#555555]">
            Your account information is protected and securely handled.
          </p>

        </div>

      </div>

    </div>
  );
};


/* ================= FEATURE COMPONENT ================= */

const Feature = ({ title, description }) => {
  return (
    <div className="flex gap-4">

      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8DFF00]/10">

        <svg
          className="h-4 w-4 text-[#8DFF00]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

      </div>


      <div>

        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-[#666666]">
          {description}
        </p>

      </div>

    </div>
  );
};


export default Login;