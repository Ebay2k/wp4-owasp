import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import "./DashboardPage.css";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("")

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

  const filteredProjects = projects.filter((project) =>
    (project?.title ?? '').toLowerCase().includes(query.toLowerCase()) ||
    (project.company?.name ?? '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <main className="dashboard">
        <input className="searchbar" placeholder="Zoeken..." type="text" onChange={e => setQuery(e.target.value)} />
        <h2>Afstudeerprojecten</h2>
        <div className="project-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p>Geen resultaten gevonden</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
