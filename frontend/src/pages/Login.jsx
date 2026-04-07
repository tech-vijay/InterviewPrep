import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiMail, FiShield, FiStar } from "react-icons/fi";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(API_PATHS.AUTH.LOGIN, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (loginError) {
      const errorMessage =
        loginError.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", loginError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,_#fff8e7_0%,_#ffffff_45%,_#ffedd5_100%)] px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-10 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-72 w-72 rounded-full bg-amber-300/35 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-80 w-80 rounded-full bg-yellow-100 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_35px_100px_rgba(15,23,42,0.12)] backdrop-blur xl:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between bg-slate-950 p-10 text-white xl:flex">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-orange-200">
              <FiStar />
              Ready for the next strong interview round
            </div>
            <h1 className="mt-8 text-5xl font-black leading-tight">
              Welcome back to your prep rhythm.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
              Log in to continue building sharper answers, better confidence, and a cleaner path toward your next opportunity.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white/8 p-5">
              <div className="mb-3 inline-flex rounded-2xl bg-orange-400/15 p-3 text-xl text-orange-200">
                <FiShield />
              </div>
              <h2 className="text-xl font-semibold">Focused, secure, and fast</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Jump back into saved sessions, role-based practice, and AI-assisted preparation without losing your momentum.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-white p-5 text-slate-950">
                <p className="text-sm text-slate-500">Average session time</p>
                <p className="mt-3 text-3xl font-black">18 min</p>
              </div>
              <div className="rounded-3xl bg-orange-400 p-5 text-slate-950">
                <p className="text-sm text-slate-800/70">Prep boost</p>
                <p className="mt-3 text-3xl font-black">3x</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
              Sign in
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              Step back into your dashboard.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              Continue your interview preparation with the same sessions, progress, and focus areas you already built.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100">
                  <FiMail className="text-lg text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    onChange={handleForm}
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
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                    onChange={handleForm}
                    disabled={loading}
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login to dashboard"}
                {!loading && <FiArrowRight />}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-sm font-medium text-slate-400">New here?</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-semibold text-orange-500 transition hover:text-orange-600">
                Create one now
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
