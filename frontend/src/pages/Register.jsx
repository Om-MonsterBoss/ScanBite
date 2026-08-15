import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthNavbar from "../components/layout/AuthNavBar";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-[calc(100vh-78px)] bg-[#080808] px-6 py-16 text-white">
        <AuthNavbar/>
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:block">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8DFF00]/20 bg-[#8DFF00]/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#8DFF00] shadow-[0_0_10px_#8DFF00]" />
            <span className="text-sm text-[#8DFF00]">
              Secure Product Verification
            </span>
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight">
            Know what you're
            <span className="text-[#8DFF00]"> really buying.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#888888]">
            Create your ScanBite account and start scanning products,
            checking ingredients, and making smarter decisions.
          </p>

          <div className="mt-10 space-y-5">

            <Feature
              title="Scan products"
              description="Get useful information from product packaging."
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


        {/* REGISTER CARD */}
        <div className="mx-auto w-full max-w-md">

          <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 shadow-2xl">

            {/* Header */}
            <div className="mb-8">

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
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6"
                  />
                </svg>

              </div>

              <h2 className="text-3xl font-bold">
                Create account
              </h2>

              <p className="mt-2 text-sm text-[#777777]">
                Join ScanBite and start making smarter choices.
              </p>

            </div>


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#d0d0d0]">
                  Full name
                </label>

                <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full rounded-xl border bg-[#080808] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#8DFF00] focus:ring-1 focus:ring-[#8DFF00]/30 ${
                    errors.name
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                />

                {errors.name && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>


              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#d0d0d0]">
                  Email address
                </label>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
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
                <label className="mb-2 block text-sm font-medium text-[#d0d0d0]">
                  Password
                </label>

                <input
                  {...register("password")}
                  type="password"
                  placeholder="Minimum 8 characters"
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


              {/* CONFIRM PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-[#d0d0d0]">
                  Confirm password
                </label>

                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Repeat your password"
                  className={`w-full rounded-xl border bg-[#080808] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#8DFF00] focus:ring-1 focus:ring-[#8DFF00]/30 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/10"
                  }`}
                />

                {errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>


              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-[#8DFF00] py-3.5 text-sm font-bold text-black transition duration-300 hover:bg-[#a5ff3b] hover:shadow-[0_0_30px_rgba(141,255,0,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>

            </form>


            {/* LOGIN */}
            <p className="mt-7 text-center text-sm text-[#777777]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#8DFF00] hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

          <p className="mt-5 text-center text-xs text-[#555555]">
            By creating an account, you agree to our Terms & Privacy Policy.
          </p>

        </div>

      </div>
    </div>
  );
};


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


export default Register;