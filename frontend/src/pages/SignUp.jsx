import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiMail, FiStar, FiUser, FiZap } from "react-icons/fi";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(API_PATHS.AUTH.SIGNUP, form);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (signupError) {
      console.error("Signup error:", signupError);
      const errorMessage =
        signupError.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,_#fff7ed_0%,_#ffffff_42%,_#fef3c7_100%)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-14 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute right-[-6rem] top-6 h-80 w-80 rounded-full bg-amber-300/35 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-100 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_35px_100px_rgba(15,23,42,0.12)] backdrop-blur xl:grid-cols-[0.95fr_1.05fr]">
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
              Create account
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              Build your prep space in minutes.
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-500">
              Start organizing roles, sessions, and AI-assisted practice in a cleaner and more motivating workflow.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100">
                  <FiUser className="text-lg text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    onChange={(e) => updateField("name", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100">
                  <FiMail className="text-lg text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100">
                  <FiLock className="text-lg text-slate-400" />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    onChange={(e) => updateField("password", e.target.value)}
                    disabled={loading}
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <FiArrowRight />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-medium text-slate-400">Already registered?</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-orange-500 transition hover:text-orange-600">
                Log in here
              </Link>
            </p>
          </div>
        </section>

        <section className="hidden flex-col justify-between bg-slate-950 p-10 text-white xl:flex">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-orange-200">
              <FiStar />
              Start stronger than a plain signup form
            </div>
            <h2 className="mt-8 text-5xl font-black leading-tight">
              Turn ambition into a system you will actually enjoy using.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              Create your account and step into a dashboard designed to keep your interview prep feeling alive, focused, and easy to return to.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white/8 p-5">
              <div className="mb-3 inline-flex rounded-2xl bg-orange-400/15 p-3 text-xl text-orange-200">
                <FiZap />
              </div>
              <h3 className="text-xl font-semibold">Momentum from day one</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Set up practice sessions by role, organize your flow, and jump into targeted preparation without messy onboarding.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-3xl bg-white p-5 text-slate-950">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Roles</p>
                <p className="mt-3 text-3xl font-black">12+</p>
              </div>
              <div className="rounded-3xl bg-orange-400 p-5 text-slate-950">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-800/70">Speed</p>
                <p className="mt-3 text-3xl font-black">Fast</p>
              </div>
              <div className="rounded-3xl bg-white/8 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Flow</p>
                <p className="mt-3 text-3xl font-black">Clean</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
