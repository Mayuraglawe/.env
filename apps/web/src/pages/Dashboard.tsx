import { Link } from 'react-router-dom';
import { PROBLEMS } from '../data/problems';

export default function Dashboard() {
  const solvedCount = PROBLEMS.filter(q => q.status === 'Solved').length;

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-8 overflow-y-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 transition-colors">System Design Practice</h1>
          <p className="text-zinc-500 dark:text-zinc-400 transition-colors">Solve real-world architecture problems.</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-xl p-4 shadow-sm text-center min-w-[120px] transition-colors">
          <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mb-1 transition-colors">Solved</div>
          <div className="text-2xl font-black text-brand-500">{solvedCount} <span className="text-sm text-zinc-400">/ {PROBLEMS.length}</span></div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-sm transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-black/10 dark:border-white/10 transition-colors">
              <th className="p-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Status</th>
              <th className="p-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Title</th>
              <th className="p-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Acceptance</th>
              <th className="p-4 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider transition-colors">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {PROBLEMS.map((q, idx) => (
              <tr key={q.id} className={`group border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-zinc-50/50 dark:bg-zinc-800/20'}`}>
                <td className="p-4 w-16 text-center">
                  {q.status === 'Solved' ? (
                    <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 transition-colors">✓</span>
                  ) : (
                    <span className="inline-block w-6 h-6 rounded-full border-2 border-zinc-200 dark:border-zinc-700 transition-colors"></span>
                  )}
                </td>
                <td className="p-4 font-bold">
                  <Link to={`/problem/${q.id}`} className="text-zinc-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
                    {q.id}. {q.title}
                  </Link>
                </td>
                <td className="p-4 text-sm text-zinc-500 dark:text-zinc-400 transition-colors">{q.acceptance}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${
                    q.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    q.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {q.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
