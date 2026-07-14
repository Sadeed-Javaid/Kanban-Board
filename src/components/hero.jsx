function Hero({ onStartTask }) {
  return (
    <section className="bg-ink mt-15 relative overflow-hidden">
      {/* ambient color glow, purely decorative */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-azure/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-coral/20 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center relative">
        <div>
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-amber bg-amber/10 border border-amber/30 rounded-full px-3 py-1">
            Task board, no login required
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-semibold text-paper mt-6 leading-[1.05]">
            Move work
            <br />
            <span className="text-coral">forward.</span>
          </h1>

          <p className="font-body text-paper/60 text-lg mt-6 max-w-md">
            Write down what needs doing. Drag it to In Progress when you start.
            Drag it to Done when you finish. That's the whole app.
          </p>

          <button
            onClick={onStartTask}
            className="cursor-pointer mt-10 font-mono text-sm uppercase tracking-wider bg-coral text-white px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition shadow-lg shadow-coral/30"
          >
            Start a task ↓
          </button>
        </div>

        <div className="relative h-72 flex items-center justify-center">
          <svg viewBox="0 0 320 260" className="w-full max-w-sm">
            <path
              d="M40 200 C 100 40, 220 40, 280 90"
              fill="none"
              stroke="#F3F5F8"
              strokeOpacity="0.25"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <rect x="20" y="180" width="90" height="56" rx="8" fill="#F3F5F8" fillOpacity="0.08" />
            <g transform="translate(230,60) rotate(8)">
              <rect width="100" height="62" rx="10" fill="#F3F5F8" />
              <rect x="14" y="16" width="60" height="8" rx="4" fill="#3E7CB1" />
              <rect x="14" y="32" width="40" height="8" rx="4" fill="#17203A" fillOpacity="0.2" />
            </g>
            <circle cx="280" cy="90" r="6" fill="#E4572E" />
            <circle cx="280" cy="90" r="12" fill="#E4572E" fillOpacity="0.25" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;