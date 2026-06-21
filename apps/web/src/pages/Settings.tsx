import useStore from '../store/useStore';

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto p-8 overflow-y-auto">
      <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 transition-colors">Settings</h1>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm transition-colors mb-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 transition-colors">Appearance</h2>
        
        <div className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0 transition-colors">
          <div>
            <div className="font-bold text-zinc-800 dark:text-zinc-200 transition-colors">Dark Mode</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors">Switch between light and dark themes.</div>
          </div>
          <button 
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-brand-500' : 'bg-zinc-200'}`}
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm transition-colors">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 transition-colors">Account</h2>
        
        <div className="py-4 border-b border-black/5 dark:border-white/5 last:border-0 transition-colors">
          <div className="font-bold text-zinc-800 dark:text-zinc-200 transition-colors">Data Persistence</div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 transition-colors">Your designs are currently stored locally in your browser.</div>
          <button className="px-4 py-2 text-sm font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            Clear Local Data
          </button>
        </div>
      </div>
    </div>
  );
}
