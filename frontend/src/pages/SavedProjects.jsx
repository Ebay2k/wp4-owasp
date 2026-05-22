import { useEffect, useState } from "react";

export default function SavedProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const savedProjects =
      JSON.parse(localStorage.getItem("savedProjects")) || [];

    setProjects(savedProjects);

  }, []);

  return (
    <div>
      <h1>Opgeslagen projecten</h1>

      {projects.map((project, index) => (
        <div key={index}>
          <p>{project.title}</p>
          <p>{project.company}</p>
          <p>{project.description}</p>
        </div>
        ))}
    </div>
  );
}
