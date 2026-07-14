function Navbar({ onStartTask }) {
  return (
    <nav className="sticky top-4 z-50 mx-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md border border-ink/10 rounded-full px-6 py-3 shadow-sm">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer flex items-center gap-2 font-display text-lg font-semibold text-ink tracking-tight"
        >
          <span className="w-2 h-2 rounded-full bg-coral" />
          Flowcard
        </button>

        <button
          onClick={onStartTask}
          className="cursor-pointer font-mono text-xs uppercase tracking-wider bg-ink text-paper px-5 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition"
        >
          Open Board
        </button>
      </div>
    </nav>
  );
}

export default Navbar;