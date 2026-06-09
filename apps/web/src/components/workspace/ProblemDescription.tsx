import { Problem } from '../../data/problems';

interface ProblemDescriptionProps {
  problem: Problem;
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#181818] border-r border-black/10 dark:border-white/10 overflow-y-auto transition-colors">
      <div className="p-6 border-b border-black/5 dark:border-white/5 transition-colors">
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-3 transition-colors">{problem.id}. {problem.title}</h2>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-md transition-colors ${
            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            problem.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {problem.difficulty}
          </span>
          <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest transition-colors">
            Acceptance: {problem.acceptance}
          </span>
        </div>
      </div>

      <div className="p-6 text-zinc-800 dark:text-zinc-300 transition-colors">
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-sm leading-relaxed mb-8">
            {problem.description}
          </p>

          <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4 transition-colors">Requirements</h3>
          <ul className="list-disc pl-5 space-y-2 mb-8 text-sm">
            {problem.requirements.map((req, i) => (
              <li key={i} className="pl-1 marker:text-brand-500">{req}</li>
            ))}
          </ul>

          <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest mb-4 transition-colors">Constraints</h3>
          <ul className="list-disc pl-5 space-y-2 mb-8 text-sm font-mono bg-zinc-50 dark:bg-[#222] p-4 rounded-xl border border-black/5 dark:border-white/5 transition-colors">
            {problem.constraints.map((constraint, i) => (
              <li key={i} className="pl-1 marker:text-zinc-400">{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
