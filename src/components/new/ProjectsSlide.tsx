import React from "react";

/**
 * Projects walkthrough — answers "how much setup will this cost me?" with a
 * numbered, screenshot-based walkthrough of the real app: describe the
 * project, CoolDesk groups the tabs, then it's a project in the new tab and
 * one search away in Spotlight.
 */

const STEPS = [
  {
    tag: "01",
    title: "Describe the project",
    body: "Open the AI Workspace Manager and describe how to organize your tabs — “group by project” is enough. One field, no setup wizard.",
    image: "/workspace-create.png",
    alt: "CoolDesk AI Workspace Manager — describing how to organize tabs into a new workspace",
  },
  {
    tag: "02",
    title: "CoolDesk groups it for you",
    body: "It sorts your open tabs into projects automatically and shows them as launcher tiles on your new tab — grouped, labelled, ready to open.",
    image: "/workspace-view.png",
    alt: "CoolDesk new tab showing tabs automatically grouped into projects like AI, Entertainment and Productivity",
  },
  {
    tag: "03",
    title: "Find it in Spotlight",
    body: "Alt + K from anywhere — every project, tab and app is one search away, and one click reopens the whole thing.",
    image: "/spotlight.png",
    alt: "CoolDesk Spotlight search showing apps, tabs and workspaces in one search bar",
  },
];

function ProjectsSlide() {
  const [active, setActive] = React.useState(0);

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[10px] font-mono font-medium text-txt-muted uppercase tracking-[0.25em] mb-3">
          Project workspaces
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How a project comes together
        </h2>
        <p className="text-sm text-txt-secondary mt-3">
          The catch with every organiser is the filing it demands. CoolDesk
          skips it — describe the project, let it group what belongs there,
          and it's in Spotlight from then on.
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-10 lg:gap-14 items-start">
        {/* Screenshot panel */}
        <div className="relative rounded-2xl border border-white/15 bg-[#0a0d13] overflow-hidden order-2 lg:order-1">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <span className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
              {STEPS[active].tag} / {STEPS[active].title}
            </span>
          </div>
          <img
            key={STEPS[active].image}
            src={STEPS[active].image}
            alt={STEPS[active].alt}
            className="w-full h-auto"
          />
        </div>

        {/* Step switcher */}
        <div className="space-y-2 lg:sticky lg:top-28 order-1 lg:order-2">
          {STEPS.map((step, i) => (
            <button
              key={step.tag}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`w-full text-left flex gap-4 rounded-xl border px-4 py-3.5 transition-colors duration-300 ${
                active === i
                  ? "border-sky-400/40 bg-sky-400/[0.06]"
                  : "border-white/10 bg-transparent hover:bg-white/[0.03]"
              }`}
            >
              <span
                className={`font-mono text-xs pt-0.5 transition-colors duration-300 ${
                  active === i ? "text-sky-300" : "text-txt-muted"
                }`}
              >
                {step.tag}
              </span>
              <span>
                <span className={`block text-sm font-semibold transition-colors duration-300 ${active === i ? "text-white" : "text-txt-secondary"}`}>
                  {step.title}
                </span>
                <span className="block text-xs text-txt-muted mt-0.5 leading-relaxed">
                  {step.body}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsSlide;
