import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import api from './api';
import PageLayout from './layout/Page';
import ProjectsPage from './pages/projects';
import ProjectSinglePage from './pages/projects/[id]';
import { type WordpressPage } from './types';

function App() {
  const [pages, setPages] = useState<WordpressPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await api.fetchPages();
        setPages(data);
      } catch (err: any) {
        setError(
          'Failed to load posts. Check the console for details' + err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <Routes>
        {pages.map((page) => (
          <Route
            key={page.id}
            path={page.slug === 'home' ? '/' : `/${page.slug}`}
            element={<PageLayout page={page} />}
          />
        ))}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectSinglePage />} />
      </Routes>
    </div>
  );
}

export default App;
