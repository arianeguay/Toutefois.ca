import { useEffect, useState } from 'react';
import './App.css';
import Header from './layout/Header';
import api from './api';

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.fetchPosts();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts. Check the console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <h2>Latest Posts</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
              <div
                className="post-excerpt"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered.substring(0, 150) + '...',
                }}
              />
              <a
                href={post.link}
                className="read-more"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </article>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>Powered by WordPress & React</p>
      </footer>
    </div>
  );
}

export default App;
