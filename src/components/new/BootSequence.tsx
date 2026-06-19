import { useState, useEffect, useCallback } from 'react';

interface BootLine {
  service: string;
}

const BOOT_LINES: BootLine[] = [
  { service: 'Starting CoolDesk Kernel' },
  { service: 'Loading Display Manager' },
  { service: 'Initializing Browser Bridge' },
  { service: 'Mounting Desktop Bridge' },
  { service: 'Starting AI SmartWorkspace Engine' },
  { service: 'Deploying Spotlight Search' },
  { service: 'Starting Download Service' },
  { service: 'Loading Help System' },
];

const LINE_DELAY = 1000;
const STARTUP_DELAY = 400;

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [readyLineVisible, setReadyLineVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [bootSkipped, setBootSkipped] = useState(false);

  const skipBoot = useCallback(() => {
    sessionStorage.setItem('cooldesk-boot-skipped', '1');
    setBootSkipped(true);
    setVisibleLines(BOOT_LINES.length);
    setReadyLineVisible(true);
    setFadingOut(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  const finishBoot = useCallback(() => {
    sessionStorage.setItem('cooldesk-boot-skipped', '1');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timers: number[] = [];
    for (let i = 0; i < BOOT_LINES.length; i++) {
      const delay = STARTUP_DELAY + i * LINE_DELAY;
      const timer = window.setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, delay);
      timers.push(timer);
    }

    const readyTimer = window.setTimeout(() => {
      setReadyLineVisible(true);
    }, STARTUP_DELAY + BOOT_LINES.length * LINE_DELAY + 600);

    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, STARTUP_DELAY + BOOT_LINES.length * LINE_DELAY + 1800);

    const completeTimer = window.setTimeout(() => {
      finishBoot();
    }, STARTUP_DELAY + BOOT_LINES.length * LINE_DELAY + 2600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(readyTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete, skipBoot, finishBoot]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col justify-center px-6 md:px-16 transition-all duration-700 ${
        fadingOut ? 'opacity-0 scale-[1.02] blur-[2px]' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[101]"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />
      <div className="relative z-10 max-w-2xl mx-auto w-full font-mono">
        <div className="space-y-0.5 md:space-y-1.5">
          {BOOT_LINES.map((line, index) => {
            const isDone = index < visibleLines;
            const isCurrent = index === visibleLines;
            const isFuture = index > visibleLines;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 md:gap-4 transition-all duration-300 ${
                  bootSkipped
                    ? 'opacity-100'
                    : isFuture
                      ? 'opacity-20'
                      : isCurrent
                        ? 'opacity-100'
                        : 'opacity-100'
                }`}
              >
                <span className="text-xs md:text-sm leading-relaxed">
                  {isDone ? (
                    <span className="flex items-center gap-2 md:gap-3">
                      <span className="text-green-400 font-bold shrink-0 text-xs md:text-sm">
                        [  OK  ]
                      </span>
                      <span className="text-gray-300">{line.service}...</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-2 md:gap-3">
                      <span className="text-yellow-400 font-bold shrink-0 text-xs md:text-sm">
                        [  ..  ]
                      </span>
                      <span className="text-gray-400 animate-pulse">
                        {line.service}...
                      </span>
                      <span className="inline-block w-2 h-4 bg-gray-400 animate-blink ml-1" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 md:gap-3">
                      <span className="text-gray-700 font-bold shrink-0 text-xs md:text-sm">
                        [  --  ]
                      </span>
                      <span className="text-gray-700">{line.service}...</span>
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {readyLineVisible && (
          <div className="mt-4 md:mt-6 space-y-3">
            <div className="text-gray-600 text-xs md:text-sm select-none">
              {'\u2500'.repeat(50)}
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-bold text-base md:text-lg">
                System ready. Welcome to CoolDesk.
              </span>
              <span className="text-[10px] md:text-xs text-green-400 border border-green-400/30 px-2 py-0.5 rounded font-semibold">
                READY
              </span>
              {!fadingOut && (
                <span className="inline-block w-2 h-5 bg-gray-300 animate-blink" />
              )}
            </div>
          </div>
        )}

        {/* Skip hint */}
        {!bootSkipped && !fadingOut && (
          <div className="mt-8 md:mt-12 text-center">
            <button
              onClick={skipBoot}
              className="text-[10px] md:text-xs text-gray-600 hover:text-gray-400 transition-colors focus:outline-none"
            >
              Press Enter or click to skip
            </button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-900">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 transition-all duration-500 ease-out"
          style={{
            width: `${Math.min((visibleLines / BOOT_LINES.length) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

export default BootSequence;
