import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="flex flex-col w-screen h-screen overflow-hidden text-zinc-900 dark:text-zinc-100 bg-[var(--color-canvas-bg)] dark:bg-[#121212] transition-colors">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/problem/:id" element={<Workspace />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;