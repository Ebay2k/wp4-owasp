import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SavedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("savedProjects")) || [];
    setProjects(savedProjects);
  }, []);

  const handleDelete = (indexToRemove) => {
    const updated = projects.filter((_, index) => index !== indexToRemove);
    setProjects(updated);
    localStorage.setItem("savedProjects", JSON.stringify(updated));
  };

  return (
    <div>
      <Navbar />
      <main className="dashboard">
        <h2>Opgeslagen projecten</h2>

        {projects.length === 0 ? (
          <p>Geen opgeslagen projecten.</p>
        ) : (
          <div className="project-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h2>{project.title}</h2>
                <p>Bedrijf: {project.company}</p>
                <p>{project.description}</p>
                <div className="project-card-actions">
                  <Link to={`/projects/${project.id}`} className="project-card-link">
                    Bekijk project
                  </Link>

                  <button
                    className="project-card-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Verwijder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
