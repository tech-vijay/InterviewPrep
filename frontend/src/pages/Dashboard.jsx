import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiGrid,
  FiPlusCircle,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) {
      alert("Fill all fields");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        topicsToFocus: [],
        description: "",
      });
    } catch (error) {
      console.log(error.response);
    }

    setRole("");
    setExperience("");
    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const totalSessions = sessions.length;
  const latestSession = sessions[0]?.role || "No active session";
  const focusScore = totalSessions === 0 ? "0%" : `${Math.min(95, 55 + totalSessions * 8)}%`;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,_rgba(255,248,235,0.9)_0%,_rgba(255,255,255,0.96)_35%,_rgba(255,250,240,0.96)_100%)] p-5 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-5rem] top-10 h-72 w-72 rounded-full bg-orange-200/35 blur-3xl" />
        <div className="absolute left-[-5rem] bottom-0 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-300">
                  Dashboard
                </p>
                <h1 className="mt-4 text-4xl font-black tracking-tight">
                  Build interview momentum that feels real.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  Create focused sessions, track your practice flow, and keep everything organized in one modern workspace.
                </p>
              </div>

              <div className="rounded-3xl bg-white/8 px-5 py-4 text-right">
                <p className="text-sm text-slate-300">Current focus score</p>
                <p className="mt-2 text-4xl font-black text-orange-300">{focusScore}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 text-slate-950">
                <div className="inline-flex rounded-2xl bg-orange-100 p-3 text-xl text-orange-500">
                  <FiGrid />
                </div>
                <p className="mt-4 text-sm text-slate-500">Sessions created</p>
                <p className="mt-2 text-3xl font-black">{totalSessions}</p>
              </div>

              <div className="rounded-3xl bg-white/8 p-5">
                <div className="inline-flex rounded-2xl bg-white/10 p-3 text-xl text-orange-300">
                  <FiClock />
                </div>
                <p className="mt-4 text-sm text-slate-300">Prep cadence</p>
                <p className="mt-2 text-3xl font-black">
                  {totalSessions === 0 ? "Start" : "Active"}
                </p>
              </div>

              <div className="rounded-3xl bg-orange-400 p-5 text-slate-950">
                <div className="inline-flex rounded-2xl bg-white/40 p-3 text-xl">
                  <FiTrendingUp />
                </div>
                <p className="mt-4 text-sm text-slate-800/70">Latest direction</p>
                <p className="mt-2 text-lg font-black">{latestSession}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_20px_50px_rgba(148,163,184,0.14)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-xl text-orange-500">
                <FiPlusCircle />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">Create new session</h2>
                <p className="text-sm leading-6 text-slate-500">
                  Launch a targeted practice track for the role you want next.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Target role</span>
                <input
                  placeholder="Frontend Developer"
                  value={role}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                  onChange={(e) => setRole(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Experience level</span>
                <input
                  placeholder="2 years"
                  value={experience}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 shadow-sm outline-none transition focus:border-orange-300 focus:ring-4 focus:ring-orange-100"
                  onChange={(e) => setExperience(e.target.value)}
                />
              </label>

              <button
                onClick={createSession}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_35px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Create session
                <FiArrowRight />
              </button>
            </div>

            <div className="mt-6 rounded-3xl bg-orange-50 p-5">
              <div className="flex items-center gap-3">
                <FiTarget className="text-xl text-orange-500" />
                <p className="font-semibold text-slate-900">Quick guidance</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Use a specific role and clear experience level to get more relevant questions and a better practice flow.
              </p>
            </div>
          </section>
        </div>

        <section className="relative mt-8 rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_20px_50px_rgba(148,163,184,0.12)] backdrop-blur sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">
                Your sessions
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                Practice tracks ready to continue
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              <FiBarChart2 />
              {totalSessions} session{totalSessions === 1 ? "" : "s"} available
            </div>
          </div>

          {sessions.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-orange-200 bg-[linear-gradient(135deg,_#fff8ec_0%,_#ffffff_100%)] px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-100 text-2xl text-orange-500">
                <FiPlusCircle />
              </div>
              <p className="mt-5 text-2xl font-black text-slate-950">No sessions yet</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Your dashboard is ready. Create the first session above and start building a sharper interview routine.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sessions.map((s, index) => (
                <div
                  key={s._id}
                  onClick={() => navigate(`/interview/${s._id}`)}
                  className="group cursor-pointer rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,_#ffffff_0%,_#fffaf3_100%)] p-5 shadow-[0_18px_40px_rgba(148,163,184,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(251,146,60,0.18)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
                      Session {index + 1}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      {s.experience}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                    {s.role}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Resume your AI-guided preparation flow and keep building confidence for this target role.
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-semibold text-slate-700">
                    <span>Open session</span>
                    <span className="inline-flex items-center gap-2 text-orange-500 transition group-hover:translate-x-1">
                      Continue
                      <FiArrowRight />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
