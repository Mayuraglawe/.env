import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useStore();
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/problem/');
  
  return (
    <div className="h-14 bg-white dark:bg-[#1a1a1a] border-b border-black/5 dark:border-white/10 flex items-center justify-between px-6 z-50 relative shrink-0 transition-colors">
      <div className="flex items-baseline gap-1">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white transition-colors">paperdraw</span>
          <span className="font-black text-xl tracking-tight text-brand-500">.dev</span>
        </Link>
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 ml-2 tracking-widest uppercase transition-colors">
          {isWorkspace ? 'Workspace' : 'Dashboard'}
        </span>
      </div>
    
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-zinc-500 dark:text-zinc-400">
          <Link to="/" className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${location.pathname === '/' ? 'text-zinc-900 dark:text-zinc-100 border-b-2 border-brand-500 py-4 -mb-[2px]' : 'py-4'}`}>Dashboard</Link>
          <Link to="/" className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${location.pathname === '/' ? 'text-zinc-900 dark:text-zinc-100 border-b-2 border-brand-500 py-4 -mb-[2px]' : 'py-4'}`}>Questions</Link>
          <Link to="/settings" className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${location.pathname === '/settings' ? 'text-zinc-900 dark:text-zinc-100 border-b-2 border-brand-500 py-4 -mb-[2px]' : 'py-4'}`}>Settings</Link>
        </nav>

        <div className="flex items-center gap-3">
          {isWorkspace && (
            <button className="px-4 py-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-white dark:bg-[#222] border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-[#333] transition-colors shadow-sm">
              SHARE TO CONTACT
            </button>
          )}
          
          <button 
            onClick={toggleDarkMode}
            className="w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-transparent dark:border-zinc-700"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          <button className="px-5 py-2 text-xs font-bold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors shadow-sm">
            PUBLISH
          </button>
        </div>
      </div>
    </div>
  );
};
