import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CandidateAgenda } from './pages/CandidateAgenda';
import { NotFound } from './pages/NotFound';
import { ProblemGuide } from './pages/ProblemGuide';
import { ProblemDisplay } from './pages/ProblemDisplay';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate/:id" element={<CandidateAgenda />} />
        <Route path="/problem/:problemId" element={<ProblemGuide />} />
        <Route
          path="/problem/:problemId/display/:variant"
          element={<ProblemDisplay />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
