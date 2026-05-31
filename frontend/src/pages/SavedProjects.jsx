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
                <Link to={`/projects/${project.id}`} className="project-card-link">
                  Bekijk project
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
