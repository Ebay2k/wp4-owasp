import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './DetailPage.css';
import { useParams, Link } from 'react-router-dom';

export default function DetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveProject = () => {
    if (!detail) return;
    const project = {
      id: detail.id,
      title: detail.title,
      company: detail.company?.name,
      description: detail.description
    };

    const existingProjects =
      JSON.parse(localStorage.getItem("savedProjects")) || [];

    existingProjects.push(project);

    localStorage.setItem("savedProjects", JSON.stringify(existingProjects));
  };

  useEffect(() => {
    const cachedDetail = localStorage.getItem(`cachedDetail_${id}`);
    if (cachedDetail) {
      setDetail(JSON.parse(cachedDetail));
      setLoading(false);
    }

    fetch(`http://localhost:8000/listings/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setDetail(data);
        localStorage.setItem(`cachedDetail_${id}`, JSON.stringify(data));
        setLoading(false);
      })
      .catch(err => {
        if (!cachedDetail) {
          setError('Offline - geen gegevens beschikbaar.');
          setLoading(false);
        }
      });
  }, [id]);

  if (loading) return <div><Navbar /><p>Laden...</p></div>;
  if (error) return <div><Navbar /><p>{error}</p></div>;
  if (!detail) return <div><Navbar /><p>Geen data gevonden.</p></div>;

  return (
    <div>
      <Navbar />
      <main className="dashboard">
        <Link to="/" className="back-link">← Terug naar dashboard</Link>
        <div className="detail-container">
          <div className="detail-header">
            <h1>{detail.title}</h1>
            <span className="company">{detail.company?.name}</span>
          </div>
          <div className="detail-meta">
            <span className="date">Geplaatst: {detail.created_at?.slice(0, 10)}</span>
            <span className="date">Start: {detail.start_date}</span>
          </div>
          <p className="detail-description">{detail.description}</p>
          <div className="detail-actions">
            <button
              className="btn email"
              onClick={() => {
                window.location.href = `mailto:${detail.contact?.email}?subject=Interesse in afstudeerproject: ${encodeURIComponent(detail.title)}`;
              }}
            >
              Contact: {detail.contact?.name}
            </button>
            <button className="btn save" onClick={saveProject}>Opslaan</button>
            <button
                className="btn share"
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: detail.title,
                            text: `Bekijk dit afstudeerproject: ${detail.title} bij ${detail.company?.name}`,
                            url: window.location.href,
                        });
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link gekopieerd!');
                    }
                }}
            >
                Delen
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
