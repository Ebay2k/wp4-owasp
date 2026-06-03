import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import "./DashboardPage.css";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("cachedProjects");
    if (cachedProjects) {
      setProjects(JSON.parse(cachedProjects));
      setLoading(false);
    }

    fetch("http://localhost:8000/listings")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        localStorage.setItem("cachedProjects", JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        if (!cachedProjects) {
          setLoading(false);
        }
      });
  }, []);

  if (loading) return <p>Laden...</p>;

  return (
    <div>
      <Navbar />
      <main className="dashboard">
        <h2>Afstudeerprojecten</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
