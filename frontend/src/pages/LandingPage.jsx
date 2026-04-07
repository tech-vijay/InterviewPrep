import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiStar,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const LandingPage = () => {
  const navigate = useNavigate();

  const highlights = [
    {
      icon: FiStar,
      title: "Smarter practice",
      text: "Generate focused interview sessions tailored to your role, level, and target topics.",
    },
    {
      icon: FiClock,
      title: "Faster preparation",
      text: "Move from confusion to clarity with structured prompts and instant preparation flow.",
    },
    {
      icon: FiBarChart2,
      title: "Visible momentum",
      text: "Track every session in one place and keep your prep routine consistent and motivating.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.28),_transparent_32%),linear-gradient(135deg,_#fff9eb_0%,_#ffffff_45%,_#fff1d6_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5rem] top-16 h-56 w-56 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute right-[-4rem] top-8 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-100 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="mb-14 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
              Night Marathon
            </p>
            <p className="mt-2 text-sm text-slate-500">
              AI-driven interview preparation for focused, confident candidates.
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
          >
            Sign in
          </button>
        </header>

        <div className="grid flex-1 items-center gap-12 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-medium text-orange-600 shadow-sm backdrop-blur">
              <FiZap className="text-base" />
              Build interview confidence with sharper daily practice
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Make your
              <span className="block text-orange-500">login to offer letter</span>
              journey feel energetic again.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Train with AI-generated sessions, organize your preparation in one dashboard,
              and turn scattered practice into a modern, motivating interview system.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/signup")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-base font-semibold text-white shadow-[0_20px_45px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:bg-slate-800"
              >
                Start free
                <FiArrowRight />
              </button>

              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-7 py-4 text-base font-semibold text-slate-700 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
              >
                Open dashboard
              </button>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_15px_40px_rgba(148,163,184,0.12)] backdrop-blur"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-orange-100 p-3 text-xl text-orange-500">
                    <Icon />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="absolute -left-5 top-12 hidden h-28 w-28 rounded-full bg-orange-200/60 blur-2xl lg:block" />
            <div className="relative rounded-[2rem] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-orange-300">
                      Prep cockpit
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">Everything in one flow</h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 text-2xl text-orange-300">
                    <FiTarget />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-3xl bg-white/8 p-5">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>Current focus</span>
                      <span className="rounded-full bg-orange-400/20 px-3 py-1 text-orange-200">
                        Active
                      </span>
                    </div>
                    <p className="mt-3 text-xl font-semibold">Frontend Developer Mock Sprint</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      React architecture, API handling, debugging rounds, and confidence-building prompts.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white p-5 text-slate-900">
                      <p className="text-sm text-slate-500">Sessions created</p>
                      <p className="mt-3 text-4xl font-black">24</p>
                      <p className="mt-2 text-sm text-emerald-600">+8 this week</p>
                    </div>
                    <div className="rounded-3xl bg-orange-400 p-5 text-slate-950">
                      <p className="text-sm text-slate-800/70">Interview readiness</p>
                      <p className="mt-3 text-4xl font-black">87%</p>
                      <p className="mt-2 text-sm text-slate-900/75">Built on focused practice streaks</p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-semibold">What changes with this setup?</p>
                      <span className="text-sm text-orange-200">Live rhythm</span>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="rounded-2xl bg-white/5 px-4 py-3">
                        Personalized mock sessions instead of generic question dumps
                      </li>
                      <li className="rounded-2xl bg-white/5 px-4 py-3">
                        A dashboard that feels like progress, not just storage
                      </li>
                      <li className="rounded-2xl bg-white/5 px-4 py-3">
                        Cleaner onboarding from landing page to daily practice
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
