import { useEffect, useState } from 'react';
import './DetailPage.css';

export default function DetailPage() {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveProject = () => {
    const project = {
      title: "Backend Developer",
      company: "ACME",
      description: "Short description"
    };

    const existingProjects =
      JSON.parse(local.getItem("savedProjects")) || [];

    existingProjects.push(project);

    localstorage.setItem("savedProjects",JSON.stringify(existingProjects));
    };

  useEffect(() => {
    // Listings Fetchen
    fetch('http://localhost:8000/listings?limit=1')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setDetail(data[0]);
        } else {
          setError('Geen projecten gevonden.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Fout bij ophalen van data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="detail-container">Laden...</div>;
  if (error) return <div className="detail-container error">{error}</div>;
  if (!detail) return null;

  return (
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
        <button className="btn save">Opslaan</button>
        <button className="btn share">Delen</button>
      </div>
    </div>
  );
}
