import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CandidateAgenda } from './pages/CandidateAgenda';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidate/:id" element={<CandidateAgenda />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
