import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";

const REASONS = [
  "No version for my OS",
  "Not sure what it does",
  "Privacy concerns",
  "Looks too complex",
  "Just browsing",
];

const FORM_NAME = "download_feedback";
const FORM_LOCATION = "downloads_section";

type TrackingParams = {
  action: string;
  feedback_reason?: string;
  has_other_text?: boolean;
  other_text_length?: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function trackFeedbackEvent(eventName: string, params: TrackingParams) {
  const payload = {
    event_category: "engagement",
    form_name: FORM_NAME,
    form_location: FORM_LOCATION,
    ...params,
  };

  if (typeof window !== "undefined") {
    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }

    window.dataLayer.push({
      event: eventName,
      ...payload,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[${eventName}]`, payload);
  }
}

export default function DownloadFeedback() {
  const [sent, setSent] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  const [other, setOther] = useState("");

  useEffect(() => {
    trackFeedbackEvent("download_feedback_view", {
      action: "view",
    });
  }, []);

  function pick(reason: string) {
    trackFeedbackEvent("download_feedback_reason_click", {
      action: "select_reason",
      feedback_reason: reason,
    });
    setSent(true);
  }

  function openOther() {
    trackFeedbackEvent("download_feedback_other_open", {
      action: "open_other",
      feedback_reason: "Other",
    });
    setOtherOpen(true);
  }

  function submitOther() {
    const text = other.trim();
    trackFeedbackEvent("download_feedback_other_submit", {
      action: "submit_other",
      feedback_reason: "Other",
      has_other_text: text.length > 0,
      other_text_length: text.length,
    });
    setSent(true);
  }

  if (sent) {
    return (
      <div
        className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-5 py-4 text-center"
        role="status"
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-emerald-200">Thanks - that really helps.</p>
          <p className="mt-0.5 text-xs text-txt-muted">We read every bit of feedback to make CoolDesk better.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-6 rounded-2xl border border-white/12 bg-white/[0.025] px-4 py-4 shadow-sm shadow-black/20 sm:px-5"
      data-gtm-form={FORM_NAME}
      data-gtm-location={FORM_LOCATION}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
            <MessageCircle className="h-4 w-4 text-blue-300" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-5 text-white">Not downloading today?</p>
            <p className="mt-0.5 text-xs leading-5 text-txt-muted">
              No worries - what's holding you back? One tap, anonymous.
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap gap-2 lg:justify-end">
          {!otherOpen ? (
            <>
              {REASONS.map((reason) => (
                <button
                  key={reason}
                  type="button"
                  onClick={() => pick(reason)}
                  data-gtm-element="download-feedback-reason"
                  data-gtm-action="select_reason"
                  data-gtm-form={FORM_NAME}
                  data-gtm-reason={reason}
                  className="min-h-9 rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-2 text-xs font-medium text-white/75 transition-colors hover:border-blue-300/35 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60"
                >
                  {reason}
                </button>
              ))}
              <button
                type="button"
                onClick={openOther}
                data-gtm-element="download-feedback-other-open"
                data-gtm-action="open_other"
                data-gtm-form={FORM_NAME}
                data-gtm-reason="Other"
                className="min-h-9 rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-2 text-xs font-medium text-white/75 transition-colors hover:border-blue-300/35 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60"
              >
                Other
              </button>
            </>
          ) : (
            <form
              data-gtm-element="download-feedback-other-form"
              data-gtm-form={FORM_NAME}
              onSubmit={(e) => {
                e.preventDefault();
                submitOther();
              }}
              className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl"
            >
              <input
                autoFocus
                value={other}
                onChange={(e) => setOther(e.target.value)}
                maxLength={140}
                aria-label="Other download feedback"
                placeholder="Tell us what's on your mind..."
                data-gtm-element="download-feedback-other-input"
                data-gtm-form={FORM_NAME}
                className="min-h-10 flex-1 rounded-xl border border-white/12 bg-white/[0.045] px-3.5 py-2 text-sm text-white placeholder:text-white/35 transition-colors focus:border-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
              />
              <button
                type="submit"
                data-gtm-element="download-feedback-other-submit"
                data-gtm-action="submit_other"
                data-gtm-form={FORM_NAME}
                data-gtm-reason="Other"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-blue-300/30 bg-blue-400/15 px-4 py-2 text-sm font-semibold text-blue-200 transition-colors hover:bg-blue-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/60"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
